$ErrorActionPreference = 'Stop'

$rootDir = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$directoryJsPath = Join-Path $rootDir 'scripts\directory.js'
$diagramPath = Join-Path $rootDir 'file_system_diagram.txt'

if (-not (Test-Path $directoryJsPath)) {
    throw "Could not find scripts/directory.js at $directoryJsPath"
}

$source = Get-Content -Path $directoryJsPath -Raw

function Find-MatchingBrace {
    param(
        [string]$Text,
        [int]$OpenBraceIndex
    )

    $depth = 0
    $inString = $false
    $quote = ''
    $escape = $false

    for ($i = $OpenBraceIndex; $i -lt $Text.Length; $i++) {
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

            if ($ch -eq $quote) {
                $inString = $false
                $quote = ''
                continue
            }

            continue
        }

        if ($ch -eq "'" -or $ch -eq '"') {
            $inString = $true
            $quote = $ch
            continue
        }

        if ($ch -eq '{') {
            $depth++
            continue
        }

        if ($ch -eq '}') {
            $depth--
            if ($depth -eq 0) {
                return $i
            }
            continue
        }
    }

    throw 'Unable to find matching closing brace for FILE_SYSTEM object.'
}

function Tokenize-JsLiteral {
    param([string]$Text)

    $tokens = New-Object System.Collections.Generic.List[object]
    $i = 0

    while ($i -lt $Text.Length) {
        $ch = $Text[$i]

        if ([char]::IsWhiteSpace($ch)) {
            $i++
            continue
        }

        if ($ch -eq '/' -and $i + 1 -lt $Text.Length) {
            $next = $Text[$i + 1]
            if ($next -eq '/') {
                $i += 2
                while ($i -lt $Text.Length -and $Text[$i] -ne "`n") {
                    $i++
                }
                continue
            }
            if ($next -eq '*') {
                $i += 2
                while ($i + 1 -lt $Text.Length) {
                    if ($Text[$i] -eq '*' -and $Text[$i + 1] -eq '/') {
                        $i += 2
                        break
                    }
                    $i++
                }
                continue
            }
        }

        if ($ch -eq '{' -or $ch -eq '}' -or $ch -eq '[' -or $ch -eq ']' -or $ch -eq ':' -or $ch -eq ',') {
            $tokens.Add([pscustomobject]@{ type = 'symbol'; value = [string]$ch }) | Out-Null
            $i++
            continue
        }

        if ($ch -eq "'" -or $ch -eq '"') {
            $quote = $ch
            $i++
            $sb = New-Object System.Text.StringBuilder
            $escape = $false

            while ($i -lt $Text.Length) {
                $c = $Text[$i]
                if ($escape) {
                    switch ($c) {
                        'n' { [void]$sb.Append("`n") }
                        'r' { [void]$sb.Append("`r") }
                        't' { [void]$sb.Append("`t") }
                        '\\' { [void]$sb.Append('\\') }
                        "'" { [void]$sb.Append("'") }
                        '"' { [void]$sb.Append('"') }
                        default { [void]$sb.Append($c) }
                    }
                    $escape = $false
                    $i++
                    continue
                }

                if ($c -eq '\\') {
                    $escape = $true
                    $i++
                    continue
                }

                if ($c -eq $quote) {
                    $i++
                    break
                }

                [void]$sb.Append($c)
                $i++
            }

            $tokens.Add([pscustomobject]@{ type = 'string'; value = $sb.ToString() }) | Out-Null
            continue
        }

        if ($ch -match '[A-Za-z_$]') {
            $start = $i
            $i++
            while ($i -lt $Text.Length -and $Text[$i] -match '[A-Za-z0-9_$]') {
                $i++
            }

            $ident = $Text.Substring($start, $i - $start)
            $tokens.Add([pscustomobject]@{ type = 'identifier'; value = $ident }) | Out-Null
            continue
        }

        if ($ch -match '[0-9\-]') {
            $start = $i
            $i++
            while ($i -lt $Text.Length -and $Text[$i] -match '[0-9\.eE\+\-]') {
                $i++
            }

            $num = $Text.Substring($start, $i - $start)
            $tokens.Add([pscustomobject]@{ type = 'number'; value = $num }) | Out-Null
            continue
        }

        throw "Unexpected character '$ch' at index $i while tokenizing JS literal."
    }

    return ,$tokens.ToArray()
}

function Parse-Value {
    param(
        [object[]]$Tokens,
        [ref]$Index
    )

    if ($Index.Value -ge $Tokens.Length) {
        throw 'Unexpected end of tokens while parsing value.'
    }

    $token = $Tokens[$Index.Value]

    if ($token.type -eq 'symbol' -and $token.value -eq '{') {
        return Parse-Object -Tokens $Tokens -Index $Index
    }

    if ($token.type -eq 'symbol' -and $token.value -eq '[') {
        return Parse-Array -Tokens $Tokens -Index $Index
    }

    if ($token.type -eq 'string') {
        $Index.Value++
        return $token.value
    }

    if ($token.type -eq 'number') {
        $Index.Value++
        return $token.value
    }

    if ($token.type -eq 'identifier') {
        $Index.Value++
        switch ($token.value) {
            'true' { return $true }
            'false' { return $false }
            'null' { return $null }
            default { return $token.value }
        }
    }

    throw "Unexpected token '$($token.value)' while parsing value."
}

function Parse-Object {
    param(
        [object[]]$Tokens,
        [ref]$Index
    )

    $obj = [ordered]@{}

    if ($Tokens[$Index.Value].value -ne '{') {
        throw "Expected '{' at object start."
    }
    $Index.Value++

    while ($Index.Value -lt $Tokens.Length) {
        $token = $Tokens[$Index.Value]

        if ($token.type -eq 'symbol' -and $token.value -eq '}') {
            $Index.Value++
            break
        }

        if ($token.type -ne 'string' -and $token.type -ne 'identifier') {
            throw "Expected object key, got '$($token.value)'."
        }

        $key = $token.value
        $Index.Value++

        if ($Tokens[$Index.Value].value -ne ':') {
            throw "Expected ':' after key '$key'."
        }
        $Index.Value++

        $value = Parse-Value -Tokens $Tokens -Index $Index
        $obj[$key] = $value

        if ($Index.Value -lt $Tokens.Length -and $Tokens[$Index.Value].type -eq 'symbol' -and $Tokens[$Index.Value].value -eq ',') {
            $Index.Value++
            continue
        }
    }

    return $obj
}

function Parse-Array {
    param(
        [object[]]$Tokens,
        [ref]$Index
    )

    $arr = New-Object System.Collections.Generic.List[object]

    if ($Tokens[$Index.Value].value -ne '[') {
        throw "Expected '[' at array start."
    }
    $Index.Value++

    while ($Index.Value -lt $Tokens.Length) {
        $token = $Tokens[$Index.Value]

        if ($token.type -eq 'symbol' -and $token.value -eq ']') {
            $Index.Value++
            break
        }

        $value = Parse-Value -Tokens $Tokens -Index $Index
        $arr.Add($value) | Out-Null

        if ($Index.Value -lt $Tokens.Length -and $Tokens[$Index.Value].type -eq 'symbol' -and $Tokens[$Index.Value].value -eq ',') {
            $Index.Value++
            continue
        }
    }

    return ,$arr.ToArray()
}

function Get-NodeAnnotation {
    param([System.Collections.IDictionary]$Node)

    $parts = New-Object System.Collections.Generic.List[string]

    if ($Node.Contains('requiredFlag') -and -not [string]::IsNullOrWhiteSpace([string]$Node.requiredFlag)) {
        $parts.Add("requires flag: $($Node.requiredFlag)") | Out-Null
    }

    if ($parts.Count -eq 0) {
        return ''
    }

    return ' [' + ($parts -join '; ') + ']'
}

function Render-TreeLines {
    param(
        [string]$Name,
        [System.Collections.IDictionary]$Node,
        [string]$Prefix,
        [bool]$IsLast,
        [System.Collections.Generic.List[string]]$Lines
    )

    $branch = if ($IsLast) { '`-- ' } else { '|-- ' }
    $childPrefix = if ($IsLast) { '    ' } else { '|   ' }

    $isDir = ($Node.Contains('type') -and $Node.type -eq 'dir')
    $displayName = if ($isDir) { "$Name/" } else { $Name }
    $annotation = Get-NodeAnnotation -Node $Node

    $Lines.Add("$Prefix$branch$displayName$annotation") | Out-Null

    if (-not $isDir -or -not $Node.Contains('children')) {
        return
    }

    $children = $Node.children
    if (-not $children) {
        return
    }

    $keys = @($children.Keys)
    for ($i = 0; $i -lt $keys.Count; $i++) {
        $key = $keys[$i]
        $child = $children[$key]
        $last = ($i -eq $keys.Count - 1)
        Render-TreeLines -Name $key -Node $child -Prefix ($Prefix + $childPrefix) -IsLast:$last -Lines $Lines
    }
}

$match = [regex]::Match($source, 'const\s+FILE_SYSTEM\s*=\s*\{', [System.Text.RegularExpressions.RegexOptions]::None, [TimeSpan]::FromSeconds(5))
if (-not $match.Success) {
    throw 'Could not find FILE_SYSTEM definition in scripts/directory.js.'
}

$openBraceIndex = $source.IndexOf('{', $match.Index)
$closeBraceIndex = Find-MatchingBrace -Text $source -OpenBraceIndex $openBraceIndex
$fileSystemLiteral = $source.Substring($openBraceIndex, $closeBraceIndex - $openBraceIndex + 1)

$tokens = Tokenize-JsLiteral -Text $fileSystemLiteral
$tokenIndex = 0
$fileSystem = Parse-Object -Tokens $tokens -Index ([ref]$tokenIndex)

if (-not $fileSystem.Contains('children')) {
    throw 'FILE_SYSTEM object does not contain children.'
}

$lines = New-Object System.Collections.Generic.List[string]
$lines.Add('FAAU GAME FILE SYSTEM REFERENCE') | Out-Null
$lines.Add('Source: scripts/directory.js') | Out-Null
$lines.Add('') | Out-Null
$lines.Add('/') | Out-Null

$rootChildren = $fileSystem.children
$rootKeys = @($rootChildren.Keys)
for ($i = 0; $i -lt $rootKeys.Count; $i++) {
    $key = $rootKeys[$i]
    $node = $rootChildren[$key]
    $isLast = ($i -eq $rootKeys.Count - 1)
    Render-TreeLines -Name $key -Node $node -Prefix '' -IsLast:$isLast -Lines $lines
}

$lines.Add('') | Out-Null
$lines.Add('Notes:') | Out-Null
$lines.Add('- This diagram is auto-generated from FILE_SYSTEM in scripts/directory.js.') | Out-Null
$lines.Add('- Entries marked [requires flag: ...] are present but locked until the flag is set.') | Out-Null
$lines.Add('- Run tools/update_file_system_diagram.ps1 after editing FILE_SYSTEM to refresh this file.') | Out-Null

Set-Content -Path $diagramPath -Value $lines
Write-Output "Updated $diagramPath from FILE_SYSTEM in scripts/directory.js"
