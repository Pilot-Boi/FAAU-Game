$ErrorActionPreference = 'Stop'

$filePath = Join-Path $PSScriptRoot '..\scripts\directory.js'
$filePath = [System.IO.Path]::GetFullPath($filePath)
$contentDir = Join-Path $PSScriptRoot '..\content'
$contentDir = [System.IO.Path]::GetFullPath($contentDir)

if (-not (Test-Path $contentDir)) {
    New-Item -ItemType Directory -Path $contentDir | Out-Null
}

$raw = Get-Content -Path $filePath -Raw

function Find-MatchingBracket {
    param(
        [string]$Text,
        [int]$StartIndex
    )

    $depth = 0
    $inString = $false
    $quoteChar = ''
    $escape = $false

    for ($i = $StartIndex; $i -lt $Text.Length; $i++) {
        $ch = $Text[$i]

        if ($inString) {
            if ($escape) {
                $escape = $false
                continue
            }

            if ($ch -eq '\\') {
                $escape = $true
                continue
            }

            if ($ch -eq $quoteChar) {
                $inString = $false
                $quoteChar = ''
                continue
            }

            continue
        }

        if ($ch -eq '"' -or $ch -eq "'") {
            $inString = $true
            $quoteChar = $ch
            continue
        }

        if ($ch -eq '[') {
            $depth++
            continue
        }

        if ($ch -eq ']') {
            $depth--
            if ($depth -eq 0) {
                return $i
            }
            continue
        }
    }

    throw "No matching bracket found from index $StartIndex"
}

function Parse-ContentArrayLines {
    param([string]$ArrayBody)

    $result = New-Object System.Collections.Generic.List[string]

    foreach ($line in ($ArrayBody -split "`r?`n")) {
        $trimmed = $line.Trim()
        if (-not $trimmed) {
            continue
        }

        if ($trimmed -match "^'((?:\\'|[^'])*)'\s*,?$") {
            $value = $matches[1]
            $value = $value -replace "\\'", "'"
            $value = $value -replace "\\\\", "\\"
            $result.Add($value)
        }
    }

    return ,$result.ToArray()
}

function Resolve-TargetRelativePath {
    param([string]$EntryName)

    $safeEntryName = if ($null -eq $EntryName) { '' } else { $EntryName }
    $name = $safeEntryName.ToLower()

    if ($name -match '^subject_\d+\.txt$') {
        return "secure/subjects/$EntryName"
    }

    if ($name -match '_profile\.txt$') {
        return "staff/profiles/$EntryName"
    }

    if ($name -match '^(bio_\d+|gen_\d+)\.txt$') {
        return "research/projects/$EntryName"
    }

    switch ($name) {
        'system_boot.txt' { return "logs/$EntryName" }
        'network_status.txt' { return "logs/$EntryName" }
        'security_log.txt' { return "logs/$EntryName" }
        'anomaly_report.txt' { return "logs/$EntryName" }
        'anomaly_correlation.txt' { return "logs/$EntryName" }
        'sublevel_monitor.txt' { return "logs/$EntryName" }
        'sublevel_security.txt' { return "logs/$EntryName" }

        'overview.txt' { return "research/$EntryName" }
        'project_index.txt' { return "research/$EntryName" }

        'directory.txt' { return "staff/$EntryName" }
        'notice_01.txt' { return "staff/$EntryName" }
        'notice_02.txt' { return "staff/$EntryName" }
        'archive_notice.txt' { return "staff/$EntryName" }
        'security_clearance.txt' { return "staff/$EntryName" }
        'security_protocols.txt' { return "staff/$EntryName" }

        default { return $EntryName }
    }
}

$usedNames = @{}
$converted = 0

while ($true) {
    $match = [regex]::Match($raw, 'content\s*:\s*\[', [System.Text.RegularExpressions.RegexOptions]::IgnoreCase, [TimeSpan]::FromSeconds(5))
    if (-not $match.Success) {
        break
    }

    $matchIndex = $match.Index
    $bracketIndex = $raw.IndexOf('[', $matchIndex)
    if ($bracketIndex -lt 0) {
        break
    }

    $before = $raw.Substring(0, $matchIndex)
        $fileMatches = [regex]::Matches($before, "'([^']+\.txt)'\s*:\s*\{")
    if ($fileMatches.Count -eq 0) {
        throw "Failed to determine file entry for content block near index $matchIndex"
    }

    $entryName = $fileMatches[$fileMatches.Count - 1].Groups[1].Value
    $targetRelativePath = Resolve-TargetRelativePath -EntryName $entryName
    $targetRelativePath = $targetRelativePath -replace '\\', '/'

    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($targetRelativePath) -replace '[^A-Za-z0-9_/-]', '_'
    $targetDir = [System.IO.Path]::GetDirectoryName($targetRelativePath) -replace '\\', '/'
    $leafName = [System.IO.Path]::GetFileNameWithoutExtension($targetRelativePath) -replace '[^A-Za-z0-9_-]', '_'

    if (-not $usedNames.ContainsKey($baseName)) {
        $usedNames[$baseName] = 0
    }

    $usedNames[$baseName]++
    $suffix = if ($usedNames[$baseName] -gt 1) { "_$($usedNames[$baseName])" } else { '' }
    $targetName = "$leafName$suffix.txt"
    $targetRelativePathWithName = if ([string]::IsNullOrWhiteSpace($targetDir)) { $targetName } else { "$targetDir/$targetName" }

    $endBracket = Find-MatchingBracket -Text $raw -StartIndex $bracketIndex
    $innerBody = $raw.Substring($bracketIndex + 1, $endBracket - $bracketIndex - 1)
    $lines = Parse-ContentArrayLines -ArrayBody $innerBody

    $targetPath = Join-Path $contentDir ($targetRelativePathWithName -replace '/', '\\')
    $targetParent = Split-Path -Path $targetPath -Parent
    if (-not (Test-Path $targetParent)) {
        New-Item -ItemType Directory -Path $targetParent -Force | Out-Null
    }
    [System.IO.File]::WriteAllLines($targetPath, $lines)

    $replacement = "contentFile: 'content/$targetRelativePathWithName'"
    $length = $endBracket - $matchIndex + 1
    $raw = $raw.Remove($matchIndex, $length).Insert($matchIndex, $replacement)

    $converted++
}

if ($converted -eq 0) {
    Write-Output 'No content arrays found. Nothing to convert.'
    return
}

Set-Content -Path $filePath -Value $raw
Write-Output "Converted $converted content arrays into text files under $contentDir"
