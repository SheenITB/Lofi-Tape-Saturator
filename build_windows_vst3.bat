@echo off
REM ========================================
REM Lofi Tape Saturator - Auto Build Script
REM VST3 per Windows (x64 + x86)
REM ========================================

echo.
echo ========================================
echo  Lofi Tape Saturator - Build VST3
echo ========================================
echo.

REM Verifica Visual Studio
where msbuild >nul 2>&1
if %ERRORLEVEL% neq 0 (
    echo [ERROR] MSBuild non trovato!
    echo.
    echo Apri "Developer Command Prompt for VS" e rilancia questo script
    echo Oppure aggiungi MSBuild al PATH di sistema.
    echo.
    pause
    exit /b 1
)

REM Directory progetto
set PROJECT_DIR=%~dp0IPlugWebUI
set SOLUTION=%PROJECT_DIR%\IPlugWebUI.sln

if not exist "%SOLUTION%" (
    echo [ERROR] File .sln non trovato: %SOLUTION%
    pause
    exit /b 1
)

echo [INFO] Trovato progetto: %SOLUTION%
echo.

REM ========================================
REM Build x64 (64-bit)
REM ========================================
echo ========================================
echo  Building VST3 x64 (64-bit)...
echo ========================================
echo.

msbuild "%SOLUTION%" /p:Configuration=Release /p:Platform=x64 /t:IPlugWebUI-vst3 /m /v:minimal

if %ERRORLEVEL% neq 0 (
    echo.
    echo [ERROR] Build x64 fallito!
    pause
    exit /b 1
)

echo.
echo [SUCCESS] VST3 x64 buildato con successo!
echo.

REM ========================================
REM Build x86 (32-bit) - Opzionale
REM ========================================
echo.
choice /C YN /M "Vuoi buildare anche la versione x86 (32-bit)? (Y/N)"
if %ERRORLEVEL% equ 2 goto :skip_x86

echo.
echo ========================================
echo  Building VST3 x86 (32-bit)...
echo ========================================
echo.

msbuild "%SOLUTION%" /p:Configuration=Release /p:Platform=Win32 /t:IPlugWebUI-vst3 /m /v:minimal

if %ERRORLEVEL% neq 0 (
    echo.
    echo [WARNING] Build x86 fallito (opzionale)
    goto :skip_x86
)

echo.
echo [SUCCESS] VST3 x86 buildato con successo!

:skip_x86

REM ========================================
REM Output Location
REM ========================================
echo.
echo ========================================
echo  Build completato!
echo ========================================
echo.
echo VST3 x64 location:
echo   C:\Program Files\Common Files\VST3\Lofi Tape Saturator.vst3
echo.
echo Oppure nella build folder:
echo   %PROJECT_DIR%\build-win\x64\Release\VST3\
echo.

REM Chiedi se aprire la cartella output
choice /C YN /M "Vuoi aprire la cartella VST3? (Y/N)"
if %ERRORLEVEL% equ 1 (
    if exist "C:\Program Files\Common Files\VST3\" (
        explorer "C:\Program Files\Common Files\VST3\"
    ) else (
        explorer "%PROJECT_DIR%\build-win\"
    )
)

echo.
echo [INFO] Per testare il plugin, apri il tuo DAW e rescan i VST3.
echo.
pause
