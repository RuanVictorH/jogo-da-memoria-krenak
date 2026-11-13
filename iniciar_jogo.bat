@echo off
chcp 65001 > nul
title Jogo da Memoria Krenak - Inicializador

echo ============================================================
echo        JOGO DA MEMORIA DIGITALIZADO - POVO KRENAK
echo ============================================================
echo.
echo Iniciando o jogo no seu navegador padrao...
echo.

start "" "%~dp0index.html"

echo O jogo foi aberto com sucesso!
echo.
echo DICA PARA TOTEM / EXPOSICAO PUBLICA:
echo   Pressione F11 no navegador para ativar a TELA CHEIA,
echo   ou clique no botao 'Tela Cheia' dentro do proprio jogo.
echo.
timeout /t 5 > nul
exit
