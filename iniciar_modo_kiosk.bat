@echo off
chcp 65001 > nul
title Jogo da Memoria Krenak - Modo Totem / Kiosk

echo ============================================================
echo      INICIANDO EM MODO TOTEM / EXPOSICAO (TELA CHEIA)
echo ============================================================
echo.
echo Para sair do modo quiosque a qualquer momento, pressione:
echo   - ALT + F4  ou  F11
echo.

set "HTML_PATH=%~dp0index.html"

:: Tenta iniciar com Microsoft Edge em modo Kiosk (padrao do Windows)
start msedge --kiosk "%HTML_PATH%" --edge-kiosk-type=fullscreen

if errorlevel 1 (
    :: Se o Edge falhar, abre no navegador padrao
    start "" "%HTML_PATH%"
)

exit
