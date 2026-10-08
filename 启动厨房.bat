@echo off
setlocal EnableExtensions DisableDelayedExpansion
title Shiwei Kitchen
cd /d "%~dp0"
set "KITCHEN_PYTHON="
rem Prefer the verified Python on this computer.
if exist "E:\railway\python.exe" call :check_python "E:\railway\python.exe"
if defined KITCHEN_PYTHON goto run
for /f "delims=" %%P in ('where python.exe 2^>nul') do if not defined KITCHEN_PYTHON call :check_python "%%P"
if defined KITCHEN_PYTHON goto run
py -3 -c "import sys,sqlite3,ssl;sys.exit(0 if sys.version_info >= (3,10) else 1)" >nul 2>nul
if not errorlevel 1 goto run_py
echo Python 3.10 or newer was not found.
echo Install Python, then try this launcher again.
goto failed
:check_python
"%~1" -c "import sys,sqlite3,ssl;sys.exit(0 if sys.version_info >= (3,10) else 1)" >nul 2>nul
if not errorlevel 1 set "KITCHEN_PYTHON=%~1"
exit /b 0
:run
echo Starting Shiwei Kitchen...
echo Keep this window open. Press Ctrl+C to stop.
"%KITCHEN_PYTHON%" -u "%~dp0app.py" --open
goto finished
:run_py
py -3 -u "%~dp0app.py" --open
:finished
if not errorlevel 1 exit /b 0
:failed
echo.
echo Kitchen startup failed. The error is shown above.
echo If port 8765 is busy, close the previous Kitchen window first.
echo Press any key to close this window.
pause >nul
exit /b 1
