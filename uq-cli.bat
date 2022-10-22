@echo off
@REM This batch job utility will help the automation of
@REM Cleaning, compiling & running

@REM Setting up backend and frontend directories
set BACKEND_DIR=.\urquery-backend
set FRONTEND_DIR=.\urquery_frontend

set command=%1


if '%command%' == '"clean"' goto opt_clean
@echo on
@echo "%choice%" Incorrect Option. Try again.
exit /B

@REM User decided to clean. 
:opt_clean
@echo on 
@echo Cleaning npm packages and build folder...
pushd %FRONTEND_DIR%
rmdir /S build\
@echo off
npm prune

@echo on
@echo Now, cleaning Java Spring Boot project...
@popd
@pushd %BACKEND_DIR%
@echo off
mvn clean
@popd
goto final


@REM final of the tool
:final
exit \B