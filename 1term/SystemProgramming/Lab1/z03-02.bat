@echo off
set "BatchName=%~n0"
for /f %%i in ('dir "%BatchName%.bat" /tc ^| findstr /i "%BatchName%.bat"') do set "CreationDate=%%i"

echo -- имя этого bat-файла: %~n0
echo -- этот bat-файл создан: %CreationDate%
echo -- путь bat-файла: %~dp0




