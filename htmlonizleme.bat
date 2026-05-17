@echo off
title HTML Onizleme
echo =======================================
echo Klasor tarayicida aciliyor, lutfen bekleyin...
echo (Kapatmak icin bu siyah pencereyi kapatin)
echo =======================================

:: -p 0 : Sistemi otomatik olarak tamamen BOŞ bir port bulmaya zorlar
:: -c-1 : Tarayıcı önbelleğini (cache) kapatır
:: -o   : Sunucu açılır açılmaz tarayıcıyı otomatik başlatır
npx http-server -p 0 -c-1 -o