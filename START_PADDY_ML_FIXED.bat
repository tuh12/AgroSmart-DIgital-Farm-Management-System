@echo off
setlocal
title AgroSmart - Paddy ML Server

set "PROJECT_DIR=%~dp0"
set "ML_DIR=%PROJECT_DIR%paddy_ml"
set "PYTHON=%PROJECT_DIR%.venv\Scripts\python.exe"

echo.
echo ==========================================
echo       AgroSmart - Paddy ML Server
echo ==========================================
echo.

if not exist "%ML_DIR%\server.py" (
    echo ERROR: server.py was not found:
    echo "%ML_DIR%\server.py"
    pause
    exit /b 1
)

if not exist "%PYTHON%" (
    echo ERROR: Python was not found:
    echo "%PYTHON%"
    echo.
    echo Check whether your virtual environment folder is named .venv.
    pause
    exit /b 1
)

cd /d "%ML_DIR%"
echo Starting Paddy ML server...
echo.
"%PYTHON%" server.py

echo.
echo Paddy ML server has stopped.
pause
