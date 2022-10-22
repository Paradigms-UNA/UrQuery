@echo off
@REM Created by Carlos Albornoz Rondon
@REM 
@REM This batch job utility will help the automation of
@REM Cleaning, compiling & running

@REM Setting up backend and frontend directories
@REM (Assumes this batch job file is inside UrQuery base folder)
set BACKEND_DIR=.\urquery-backend
set FRONTEND_DIR=.\urquery_frontend

set command=%1


if "%command%" == "clean" goto opt_clean
if "%command%" == "build" goto opt_compile
if "%command%" == "exec" goto opt_exec

@echo Incorrect Option: '%command%'. Available commands:
@echo   clean           Cleans React dependencies, build folder and SpringBoot Project.
@echo   build           Downloads dependencies, generates bundled React Project 
@echo                   and compiles SpringBoot App.
@echo   exec            Runs the SpringBoot app (PORT 8080) and Prolog Server (8000).

exit /B

@REM User decided to clean. 
:opt_clean
@echo =============== Cleaning npm packages and build folder... ===============
@pushd %FRONTEND_DIR%
@rmdir /S /Q build\
@rmdir /S /Q node_modules\

@echo ================= Cleaning Java Spring Boot project... ===================
@popd
@pushd %BACKEND_DIR%
@echo off
@call mvn clean
@popd
@echo [+] Cleaning done, Goodbye!

goto final

:opt_compile
@echo on 
@echo ================= Downloading Npm dependencies... ======================
@pushd %FRONTEND_DIR%
@timeout 2
@call npm install


@echo ================== Building react app... ====================
@timeout 2
@call npm run build

@echo ===== Copying built frontend into Java Backend... ======
@popd

@REM Moves the generated build folder that containts the react app
@REM into a new folder under the resources directory, where
@REM the Spring-Boot app serves static content by default
@xcopy /E /Y %FRONTEND_DIR%\build %BACKEND_DIR%\src\main\resources\public\

@echo ========== Building .jar of the SpringBoot app with its dependencies ==============
@timeout 2
@pushd %BACKEND_DIR%
@call mvn install spring-boot:repackage
@popd

@cls
@echo [+] Compiling of the solution Done. Goodbye!  
goto final


:opt_exec
@REM Start a new cmd process to exec the prolog server
@echo ================= Starting Prolog Server [port 8000] ==============
@timeout 2
@start swipl simple_service_server.pl

@REM Then start the SpringBoot Server
@echo ============= Starting the SpringBoot Server [Port 8080] =============
@timeout 2
@echo [+] To finish it press CTRL + C
@call mvn spring-boot:run  -f %BACKEND_DIR%

goto final

:final
@REM final of the tool, does nothing