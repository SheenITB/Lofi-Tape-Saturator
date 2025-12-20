# Packages Web UI resources into the built VST3 bundle on Windows
# Usage: run in PowerShell from repo root after building the plugin
#   .\IPlugWebUI\scripts\package-win.ps1
# Optional: pass a custom build directory
#   .\IPlugWebUI\scripts\package-win.ps1 -BuildDir "iPlug2\Examples\IPlugWebUI\build-win\x64\Release\VST3\Lofi Tape Saturator.vst3"

param(
  [string]$BuildDir
)

function Find-VST3 {
  param([string]$Root)
  $candidate = Get-ChildItem -Path $Root -Recurse -Filter "*.vst3" -Directory | Where-Object { $_.Name -eq "Lofi Tape Saturator.vst3" } | Select-Object -First 1
  return $candidate
}

$repoRoot = Split-Path -Parent (Split-Path -Parent $PSCommandPath)
$webSrc = Join-Path $repoRoot "resources\web"

if (!(Test-Path $webSrc)) {
  Write-Host "✗ Web resources not found at: $webSrc" -ForegroundColor Red
  exit 1
}

if ([string]::IsNullOrEmpty($BuildDir)) {
  $buildRoot = Join-Path $repoRoot "..\iPlug2\Examples\IPlugWebUI\build-win"
  if (!(Test-Path $buildRoot)) {
    $buildRoot = Join-Path $repoRoot "build-win"
  }
  Write-Host "Searching for VST3 under: $buildRoot"
  $vst3 = Find-VST3 -Root $buildRoot
} else {
  $vst3 = Get-Item $BuildDir -ErrorAction SilentlyContinue
}

if (-not $vst3) {
  Write-Host "✗ Could not find 'Lofi Tape Saturator.vst3'. Build first in Release x64." -ForegroundColor Red
  exit 1
}

Write-Host "✓ Found VST3: $($vst3.FullName)" -ForegroundColor Green

$dest = Join-Path $vst3.FullName "Contents\Resources\web"
New-Item -ItemType Directory -Path $dest -Force | Out-Null

Write-Host "Copying web resources to: $dest"
robocopy $webSrc $dest /E /NFL /NDL /NJH /NJS | Out-Null

# Verify index.html exists
if (Test-Path (Join-Path $dest "index.html")) {
  Write-Host "✓ Packaged index.html and assets successfully" -ForegroundColor Green
  exit 0
} else {
  Write-Host "✗ index.html not found in destination. Packaging failed." -ForegroundColor Red
  exit 1
}
