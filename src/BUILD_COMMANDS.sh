#!/bin/bash

# ==============================================================================
# IntheBox VST3 - Script di Build Automatico
# ==============================================================================
# Versione: 1.0.9
# Data: 24 Ottobre 2025
# Descrizione: Crea progetto iPlug2, copia risorse e compila VST3
# ==============================================================================

set -e  # Esci se un comando fallisce

# Colori per output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# ==============================================================================
# CONFIGURAZIONE
# ==============================================================================

# Path di lavoro
REACT_PROJECT_DIR="$PWD"
IPLUG2_PROJECT_DIR="$HOME/Desktop/IntheBox"
IPLUG2_ROOT="$HOME/Documents/iPlug2"
VST3_INSTALL_DIR="$HOME/Library/Audio/Plug-Ins/VST3"

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║         IntheBox VST3 - Build Automatico v1.0.9          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# ==============================================================================
# VERIFICA PREREQUISITI
# ==============================================================================

echo -e "${YELLOW}[1/7]${NC} Verifica prerequisiti..."

# Verifica che il build React esista
if [ ! -d "$REACT_PROJECT_DIR/build" ]; then
    echo -e "${RED}❌ ERRORE: Build React non trovato!${NC}"
    echo -e "${YELLOW}→ Esegui prima: npm run build${NC}"
    exit 1
fi

# Verifica che iPlug2 sia installato
if [ ! -d "$IPLUG2_ROOT" ]; then
    echo -e "${RED}❌ ERRORE: iPlug2 non trovato in $IPLUG2_ROOT${NC}"
    echo -e "${YELLOW}→ Installa iPlug2:${NC}"
    echo "   cd ~/Documents"
    echo "   git clone https://github.com/iPlug2/iPlug2.git --recursive"
    exit 1
fi

# Verifica CMake
if ! command -v cmake &> /dev/null; then
    echo -e "${RED}❌ ERRORE: CMake non installato${NC}"
    echo -e "${YELLOW}→ Installa CMake:${NC}"
    echo "   brew install cmake"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisiti verificati${NC}"
echo ""

# ==============================================================================
# CREA STRUTTURA PROGETTO IPLUG2
# ==============================================================================

echo -e "${YELLOW}[2/7]${NC} Creazione progetto iPlug2..."

# Crea cartelle
mkdir -p "$IPLUG2_PROJECT_DIR/resources/web"
mkdir -p "$IPLUG2_PROJECT_DIR/resources/img"

echo -e "${GREEN}✅ Struttura creata in: $IPLUG2_PROJECT_DIR${NC}"
echo ""

# ==============================================================================
# COPIA FILE C++
# ==============================================================================

echo -e "${YELLOW}[3/7]${NC} Copia file C++ e configurazioni..."

# Copia template iPlug2
cp "$REACT_PROJECT_DIR/iplug2-templates/IntheBox.cpp" "$IPLUG2_PROJECT_DIR/"
cp "$REACT_PROJECT_DIR/iplug2-templates/IntheBox.h" "$IPLUG2_PROJECT_DIR/"
cp "$REACT_PROJECT_DIR/iplug2-templates/config.h" "$IPLUG2_PROJECT_DIR/"
cp "$REACT_PROJECT_DIR/iplug2-templates/CMakeLists.txt" "$IPLUG2_PROJECT_DIR/"

echo -e "${GREEN}✅ File C++ copiati${NC}"
echo ""

# ==============================================================================
# COPIA BUILD REACT
# ==============================================================================

echo -e "${YELLOW}[4/7]${NC} Copia GUI React nel progetto iPlug2..."

# Pulisci cartella web (se esiste)
rm -rf "$IPLUG2_PROJECT_DIR/resources/web"/*

# Copia tutto il contenuto del build React
cp -r "$REACT_PROJECT_DIR/build/"* "$IPLUG2_PROJECT_DIR/resources/web/"

# Verifica che index.html sia stato copiato
if [ ! -f "$IPLUG2_PROJECT_DIR/resources/web/index.html" ]; then
    echo -e "${RED}❌ ERRORE: index.html non copiato!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ GUI React copiata${NC}"
echo ""

# ==============================================================================
# CONFIGURA CON CMAKE
# ==============================================================================

echo -e "${YELLOW}[5/7]${NC} Configurazione build con CMake..."

# Vai nel progetto iPlug2
cd "$IPLUG2_PROJECT_DIR"

# Crea cartella build
mkdir -p build
cd build

# Configura con CMake
echo -e "${BLUE}→ Esecuzione: cmake ..${NC}"
cmake ..

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ ERRORE: Configurazione CMake fallita!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Configurazione completata${NC}"
echo ""

# ==============================================================================
# COMPILA VST3
# ==============================================================================

echo -e "${YELLOW}[6/7]${NC} Compilazione VST3 (può richiedere 1-3 minuti)..."

# Compila
make

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ ERRORE: Compilazione fallita!${NC}"
    exit 1
fi

# Verifica che il VST3 sia stato creato
if [ ! -d "VST3/IntheBox.vst3" ]; then
    echo -e "${RED}❌ ERRORE: VST3 non creato!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ VST3 compilato con successo${NC}"
echo ""

# ==============================================================================
# INSTALLA VST3
# ==============================================================================

echo -e "${YELLOW}[7/7]${NC} Installazione VST3..."

# Crea cartella VST3 se non esiste
mkdir -p "$VST3_INSTALL_DIR"

# Rimuovi versione precedente (se esiste)
if [ -d "$VST3_INSTALL_DIR/IntheBox.vst3" ]; then
    echo -e "${BLUE}→ Rimozione versione precedente...${NC}"
    rm -rf "$VST3_INSTALL_DIR/IntheBox.vst3"
fi

# Copia il nuovo VST3
cp -r "VST3/IntheBox.vst3" "$VST3_INSTALL_DIR/"

# Verifica che sia stato installato
if [ ! -d "$VST3_INSTALL_DIR/IntheBox.vst3" ]; then
    echo -e "${RED}❌ ERRORE: Installazione fallita!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ VST3 installato in: $VST3_INSTALL_DIR${NC}"
echo ""

# ==============================================================================
# RIEPILOGO FINALE
# ==============================================================================

echo -e "${GREEN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║                   ✅ BUILD COMPLETATO! ✅                  ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${BLUE}📍 Posizione VST3:${NC}"
echo "   $VST3_INSTALL_DIR/IntheBox.vst3"
echo ""
echo -e "${BLUE}📍 Progetto iPlug2:${NC}"
echo "   $IPLUG2_PROJECT_DIR"
echo ""
echo -e "${YELLOW}🎯 PROSSIMI PASSI:${NC}"
echo "   1. Chiudi il DAW se è aperto"
echo "   2. Riavvia il DAW (Logic Pro, Ableton, Reaper, etc.)"
echo "   3. Scansiona nuovi plugin (se necessario)"
echo "   4. Carica IntheBox su una traccia audio"
echo "   5. Verifica che la GUI funzioni correttamente"
echo ""
echo -e "${GREEN}🎉 Buon divertimento con IntheBox! 🎛️${NC}"
echo ""
