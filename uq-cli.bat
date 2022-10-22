@echo off
@REM Created by Carlos Albornoz Rondon
@REM 
@REM This batch job utility will help the automation of
@REM Cleaning, compiling & running

@REM Setting up backend and frontend directories
@REM (Assumes this batch job file is inside UrQuery base folder)
set BACKEND_DIR=urquery-backend
set FRONTEND_DIR=urquery_frontend

set command=%1


if "%command%" == "clean" goto opt_clean
if "%command%" == "build" goto opt_compile
if "%command%" == "run" goto opt_run

@echo Incorrect Option: '%command%'. Available commands:
@echo   clean           Cleans React dependencies, build folder and SpringBoot Project.
@echo   build           Downloads dependencies, generates bundled React Project 
@echo                   and compiles SpringBoot App.
@echo   run             Runs the SpringBoot app (PORT 8080) and Prolog Server (8000).

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
goto final

:opt_compile
@echo on 
@echo ================= Downloading Npm dependencies... ======================
@pushd %FRONTEND_DIR%
@call npm install


@echo ================== Building react app... ====================
@call npm run build

@echo ===== Moving built frontend into Java Backend... ======
@popd

@REM Moves the generated build folder that containts the react app
@REM into a new folder under the resources directory, where
@REM the Spring-Boot app serves static content by default
@move %FRONTEND_DIR%\build %BACKEND_DIR%\src\main\resources\public

@echo ========== Building .jar of the SpringBoot app with its dependencies ==============
@pushd %BACKEND_DIR%
@call mvn install spring-boot:repackage
@popd

@cls
@echo [+] Compiling of the solution Done. 
goto final


:opt_run
@REM Start a new cmd process to run the prolog server
@echo ================= Starting Prolog Server [port 8000] ==============
@start swipl simple_service_server.pl

@REM Then start the SpringBoot Server
@echo ============= Starting the SpringBoot Server [Port 8080] =============
@echo [+] To finish it press CTRL + C and Y
@call java -jar %BACKEND_DIR%\target\urquery-backend-0.0.1-SNAPSHOT.jar


@REM final of the tool
:final
@echo [+] Goodbye! 