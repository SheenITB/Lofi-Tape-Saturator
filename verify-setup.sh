#!/bin/bash

# Pre-Push Checklist Script
# Run this before pushing to verify everything is ready

echo "🔍 LOFI TAPE - Pre-Push Verification"
echo "===================================="
echo ""

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

errors=0
warnings=0

# Check 1: Git repository
echo -n "✓ Checking git repository... "
if [ -d ".git" ]; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAIL${NC}"
    echo "  Not a git repository!"
    errors=$((errors + 1))
fi

# Check 2: iPlug2 submodule
echo -n "✓ Checking iPlug2 submodule... "
if [ -d "iPlug2/.git" ]; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAIL${NC}"
    echo "  iPlug2 submodule not initialized!"
    echo "  Run: git submodule update --init --recursive"
    errors=$((errors + 1))
fi

# Check 3: IPlugWebUI directory
echo -n "✓ Checking IPlugWebUI directory... "
if [ -d "IPlugWebUI" ]; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAIL${NC}"
    echo "  IPlugWebUI directory not found!"
    errors=$((errors + 1))
fi

# Check 4: config.h
echo -n "✓ Checking config.h... "
if [ -f "IPlugWebUI/config.h" ]; then
    echo -e "${GREEN}OK${NC}"
    
    # Extract version
    version=$(grep "PLUG_VERSION_STR" IPlugWebUI/config.h | sed 's/.*"\(.*\)".*/\1/')
    echo "  Plugin version: $version"
else
    echo -e "${RED}FAIL${NC}"
    echo "  config.h not found!"
    errors=$((errors + 1))
fi

# Check 5: Solution file
echo -n "✓ Checking Visual Studio solution... "
if [ -f "IPlugWebUI/Lofi Tape Saturator.sln" ]; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${YELLOW}WARNING${NC}"
    echo "  Solution file not found at expected location"
    warnings=$((warnings + 1))
fi

# Check 6: GitHub Actions workflow
echo -n "✓ Checking GitHub Actions workflow... "
if [ -f ".github/workflows/build-windows-installer.yml" ]; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${RED}FAIL${NC}"
    echo "  Workflow file not found!"
    errors=$((errors + 1))
fi

# Check 7: Installer script
echo -n "✓ Checking Inno Setup script... "
if [ -f "installer/windows/setup.iss" ]; then
    echo -e "${GREEN}OK${NC}"
    
    # Extract installer version
    inst_version=$(grep "MyAppVersion" installer/windows/setup.iss | head -1 | sed 's/.*"\(.*\)".*/\1/')
    echo "  Installer version: $inst_version"
    
    # Compare versions
    if [ "$version" != "$inst_version" ]; then
        echo -e "  ${YELLOW}WARNING${NC}: Version mismatch!"
        echo "    config.h: $version"
        echo "    setup.iss: $inst_version"
        warnings=$((warnings + 1))
    fi
else
    echo -e "${RED}FAIL${NC}"
    echo "  setup.iss not found!"
    errors=$((errors + 1))
fi

# Check 8: Resources directory
echo -n "✓ Checking resources directory... "
if [ -d "IPlugWebUI/resources/web" ]; then
    echo -e "${GREEN}OK${NC}"
    file_count=$(find IPlugWebUI/resources/web -type f | wc -l)
    echo "  Web resources: $file_count files"
else
    echo -e "${YELLOW}WARNING${NC}"
    echo "  resources/web directory not found"
    warnings=$((warnings + 1))
fi

# Check 9: Icon file (optional)
echo -n "✓ Checking icon file... "
if [ -f "IPlugWebUI/resources/icon.ico" ]; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${YELLOW}OPTIONAL${NC}"
    echo "  No custom icon - installer will use default"
fi

# Check 10: Documentation
echo -n "✓ Checking documentation... "
docs_ok=true
for doc in "README.md" "START-HERE.md" "INSTALLAZIONE-WINDOWS.md"; do
    if [ ! -f "$doc" ]; then
        docs_ok=false
    fi
done

if [ "$docs_ok" = true ]; then
    echo -e "${GREEN}OK${NC}"
else
    echo -e "${YELLOW}WARNING${NC}"
    echo "  Some documentation files missing"
    warnings=$((warnings + 1))
fi

# Summary
echo ""
echo "===================================="
echo "Summary:"
echo "--------"

if [ $errors -eq 0 ] && [ $warnings -eq 0 ]; then
    echo -e "${GREEN}✓ All checks passed!${NC}"
    echo ""
    echo "Ready to push! Run:"
    echo "  git add ."
    echo "  git commit -m \"Add Windows installer configuration\""
    echo "  git push origin main"
    echo ""
    exit 0
elif [ $errors -eq 0 ]; then
    echo -e "${YELLOW}⚠ $warnings warning(s)${NC}"
    echo ""
    echo "You can push, but consider fixing warnings."
    echo ""
    exit 0
else
    echo -e "${RED}✗ $errors error(s), $warnings warning(s)${NC}"
    echo ""
    echo "Please fix errors before pushing."
    echo ""
    exit 1
fi
