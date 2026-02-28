---
hide:
  - navigation
  - toc
  - header
  - footer
title: Suffix Station
description: Master Kannada word-building in this time-attack grammar game!
image: assets/img/social/og_suffix_station.jpg
---

<style>
  html, body { 
    margin: 0 !important; 
    padding: 0 !important; 
    width: 100% !important; 
    height: 100% !important; 
    overflow: hidden !important; 
    background: #000 !important;
  }
  .md-main, .md-content, .md-content__inner, .md-main__inner, .md-container { 
    padding: 0 !important; 
    margin: 0 !important; 
    max-width: none !important; 
  }
  .md-header, .md-sidebar, .md-footer, .md-tabs, .md-announce, .md-header__title { 
    display: none !important; 
  }
  .game-frame-container {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: 100vh !important;
    z-index: 9999 !important;
    background: #000;
  }
</style>

<div class="game-frame-container">
    <iframe src="../play_suffix_station/" id="game-iframe" style="width: 100%; height: 100%; border: none;"></iframe>
</div>

<div style="position: fixed; bottom: 20px; right: 20px; z-index: 10000; display: flex; gap: 10px;">
    <button onclick="document.getElementById('game-iframe').requestFullscreen()" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-size: 0.8rem; backdrop-filter: blur(5px);">👓 Fullscreen API</button>
    <a href="../suffix_station/" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; padding: 8px 12px; border-radius: 8px; cursor: pointer; font-size: 0.8rem; backdrop-filter: blur(5px); text-decoration: none;">← Exit</a>
</div>
