@echo off

rem Get the directory where the script is located
set "SCRIPT_DIR=%~dp0"

rem Navigate to the frontend directory
cd "%SCRIPT_DIR%frontend"

rem Install node modules for frontend
echo Installing frontend node modules...
npm install -f

rem Navigate back to the root directory
cd ..

rem Navigate to the backend directory
cd "%SCRIPT_DIR%backend"

rem Install node modules for backend
echo Installing backend node modules...
npm install -f

rem Navigate back to the root directory
cd ..

echo Node modules installation completed for both frontend and backend.
