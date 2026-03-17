param(
    [int]$Port = 8000
)

$ErrorActionPreference = 'Stop'

$rootDir = [System.IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
Set-Location -Path $rootDir

$hostAddress = '127.0.0.1'
$url = "http://${hostAddress}:${Port}"

function Get-PythonLauncher {
    if (Get-Command py -ErrorAction SilentlyContinue) {
        return @{ command = 'py'; args = @('-m', 'http.server') }
    }

    if (Get-Command python -ErrorAction SilentlyContinue) {
        return @{ command = 'python'; args = @('-m', 'http.server') }
    }

    if (Get-Command python3 -ErrorAction SilentlyContinue) {
        return @{ command = 'python3'; args = @('-m', 'http.server') }
    }

    throw 'Python launcher not found. Install Python or make sure py/python is in PATH.'
}

$launcher = Get-PythonLauncher
$allArgs = @($launcher.args + @($Port, '--bind', $hostAddress))

Write-Host "Starting local server from: $rootDir"
Write-Host "URL: $url"
Write-Host 'Press Ctrl+C to stop.'
Write-Host ''

& $launcher.command @allArgs
