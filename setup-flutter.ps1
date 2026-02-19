# Flutter Setup Script for Windows
# Run this script as Administrator

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Flutter Setup Script for Windows" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if running as Administrator
$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] "Administrator")

if (-NOT $isAdmin) {
    Write-Host "ERROR: This script must be run as Administrator!" -ForegroundColor Red
    Write-Host "Right-click on PowerShell and select 'Run as Administrator'" -ForegroundColor Yellow
    Write-Host ""
    Read-Host "Press Enter to exit"
    exit 1
}

# Set installation directory
$flutterPath = "C:\src\flutter"
$flutterBinPath = "$flutterPath\bin"

Write-Host "Flutter will be installed to: $flutterPath" -ForegroundColor Green
Write-Host ""

# Create directory if it doesn't exist
if (-not (Test-Path "C:\src")) {
    Write-Host "Creating C:\src directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path "C:\src" -Force | Out-Null
}

# Check if Flutter is already installed
if (Test-Path $flutterPath) {
    Write-Host "Flutter directory already exists!" -ForegroundColor Yellow
    $overwrite = Read-Host "Do you want to overwrite? (y/n)"
    if ($overwrite -ne 'y') {
        Write-Host "Installation cancelled." -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 0
    }
    Write-Host "Removing existing Flutter installation..." -ForegroundColor Yellow
    Remove-Item -Path $flutterPath -Recurse -Force
}

# Download Flutter SDK
Write-Host "Downloading Flutter SDK (this may take a few minutes)..." -ForegroundColor Green
$flutterZip = "$env:TEMP\flutter_windows.zip"
$downloadUrl = "https://storage.googleapis.com/flutter_infra_release/releases/stable/windows/flutter_windows_3.16.0-stable.zip"

try {
    # Show download progress
    $ProgressPreference = 'SilentlyContinue'
    Invoke-WebRequest -Uri $downloadUrl -OutFile $flutterZip -UseBasicParsing
    $ProgressPreference = 'Continue'
    Write-Host "Download complete!" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Failed to download Flutter SDK" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Extract Flutter SDK
Write-Host "Extracting Flutter SDK..." -ForegroundColor Green
try {
    Expand-Archive -Path $flutterZip -DestinationPath "C:\src" -Force
    Write-Host "Extraction complete!" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Failed to extract Flutter SDK" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Clean up downloaded zip
Remove-Item -Path $flutterZip -Force

# Add Flutter to PATH
Write-Host "Adding Flutter to system PATH..." -ForegroundColor Green
$userPath = [Environment]::GetEnvironmentVariable("Path", "User")

if ($userPath -notlike "*$flutterBinPath*") {
    $newPath = "$userPath;$flutterBinPath"
    [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
    Write-Host "Flutter added to PATH successfully!" -ForegroundColor Green
} else {
    Write-Host "Flutter is already in PATH" -ForegroundColor Yellow
}

# Refresh environment variables
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Running Flutter Doctor..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Run Flutter Doctor
try {
    & "$flutterBinPath\flutter.bat" doctor
} catch {
    Write-Host "Note: You may need to restart your terminal/computer for PATH changes to take effect" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Flutter Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host "1. Close and reopen your terminal/PowerShell" -ForegroundColor White
Write-Host "2. Run 'flutter doctor' to verify installation" -ForegroundColor White
Write-Host "3. Install any missing dependencies shown by flutter doctor" -ForegroundColor White
Write-Host "4. Install VS Code from: https://code.visualstudio.com" -ForegroundColor White
Write-Host "5. Install Flutter extension in VS Code" -ForegroundColor White
Write-Host ""
Write-Host "Happy Flutter Development! 💙" -ForegroundColor Cyan
Write-Host ""

Read-Host "Press Enter to exit"
