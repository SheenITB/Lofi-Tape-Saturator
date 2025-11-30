# CMakeLists.txt for IntheBox VST3 Plugin
# Version 1.0.9 - Lo-Fi Tape Saturator
# iPlug2 + React WebView Integration

cmake_minimum_required(VERSION 3.15)
project(IntheBox VERSION 1.0.9 LANGUAGES CXX)

# C++ Standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Build type
if(NOT CMAKE_BUILD_TYPE)
  set(CMAKE_BUILD_TYPE Release CACHE STRING "Build type" FORCE)
endif()

message(STATUS "Build type: ${CMAKE_BUILD_TYPE}")

# ===== iPlug2 Configuration =====
# IMPORTANT: Adjust this path to where you cloned iPlug2
# Common locations:
#   - ~/Documents/iPlug2
#   - /usr/local/iPlug2
#   - ${CMAKE_CURRENT_SOURCE_DIR}/../iPlug2

set(IPLUG2_ROOT_PATH "$ENV{HOME}/Documents/iPlug2" CACHE PATH "Path to iPlug2 root directory")

# Verify iPlug2 exists
if(NOT EXISTS "${IPLUG2_ROOT_PATH}")
  message(FATAL_ERROR 
    "iPlug2 not found at ${IPLUG2_ROOT_PATH}\n"
    "Please:\n"
    "  1. Clone iPlug2: git clone https://github.com/iPlug2/iPlug2.git --recursive\n"
    "  2. Set IPLUG2_ROOT_PATH to the correct path\n"
    "  3. Example: cmake -DIPLUG2_ROOT_PATH=/path/to/iPlug2 .."
  )
endif()

message(STATUS "iPlug2 path: ${IPLUG2_ROOT_PATH}")

# Include iPlug2
add_subdirectory(${IPLUG2_ROOT_PATH} ${CMAKE_BINARY_DIR}/iPlug2)

# ===== Plugin Source Files =====
set(PLUG_SOURCES
  IntheBox.cpp
  IntheBox.h
  config.h
)

# ===== Create VST3 Plugin =====
iplug_target_add(IntheBox VST3 "${PLUG_SOURCES}")

# Additional includes
target_include_directories(IntheBox PRIVATE
  ${CMAKE_CURRENT_SOURCE_DIR}
  ${IPLUG2_ROOT_PATH}/IPlug
  ${IPLUG2_ROOT_PATH}/IGraphics
)

# Compiler options
if(MSVC)
  # Windows / Visual Studio
  target_compile_options(IntheBox PRIVATE 
    /W4           # Warning level 4
    /WX-          # Don't treat warnings as errors
    /MP           # Multi-processor compilation
  )
else()
  # macOS / Linux / GCC / Clang
  target_compile_options(IntheBox PRIVATE 
    -Wall         # Enable all warnings
    -Wextra       # Extra warnings
    -Wpedantic    # Pedantic warnings
    -Wno-unused-parameter  # Silence unused param warnings (common in plugin code)
  )
endif()

# ===== Copy Resources to Bundle =====
# This copies the React build (web/) to the plugin bundle

add_custom_command(TARGET IntheBox POST_BUILD
  COMMAND ${CMAKE_COMMAND} -E echo "📦 Copying resources to plugin bundle..."
  COMMAND ${CMAKE_COMMAND} -E copy_directory
    ${CMAKE_SOURCE_DIR}/resources
    $<TARGET_FILE_DIR:IntheBox>/../Resources
  COMMENT "Copying resources (React GUI)"
)

# Verify web resources exist before building
if(NOT EXISTS "${CMAKE_SOURCE_DIR}/resources/web/index.html")
  message(WARNING 
    "⚠️  Web resources not found!\n"
    "React GUI build is missing at: ${CMAKE_SOURCE_DIR}/resources/web/\n"
    "\n"
    "Please run in your React project:\n"
    "  1. npm run build\n"
    "  2. cp -r build/* /path/to/IntheBox/resources/web/\n"
    "\n"
    "The plugin will compile but the GUI won't load!"
  )
else()
  message(STATUS "✅ React GUI found at: ${CMAKE_SOURCE_DIR}/resources/web/")
endif()

# ===== Optional: Build Audio Unit (macOS only) =====
if(APPLE)
  # Uncomment to also build AU version
  # iplug_target_add(IntheBox AU "${PLUG_SOURCES}")
  
  message(STATUS "macOS detected - AU build available (uncomment in CMakeLists.txt)")
endif()

# ===== Optional: Build AAX (requires AAX SDK) =====
# You need to download the AAX SDK from Avid
# iplug_target_add(IntheBox AAX "${PLUG_SOURCES}")

# ===== Optional: Build Standalone App =====
# iplug_target_add(IntheBox APP "${PLUG_SOURCES}")

# ===== Installation =====
# This installs the VST3 to the system plugin directory

if(APPLE)
  set(VST3_INSTALL_DIR "$ENV{HOME}/Library/Audio/Plug-Ins/VST3")
elseif(WIN32)
  set(VST3_INSTALL_DIR "$ENV{PROGRAMFILES}/Common Files/VST3")
else()
  set(VST3_INSTALL_DIR "$ENV{HOME}/.vst3")
endif()

# Add install target
install(
  DIRECTORY ${CMAKE_BINARY_DIR}/VST3/IntheBox.vst3
  DESTINATION ${VST3_INSTALL_DIR}
)

message(STATUS "VST3 install directory: ${VST3_INSTALL_DIR}")

# ===== Print Build Summary =====
message(STATUS "===========================================")
message(STATUS "IntheBox VST3 Plugin - Build Configuration")
message(STATUS "===========================================")
message(STATUS "Version:        ${PROJECT_VERSION}")
message(STATUS "Build type:     ${CMAKE_BUILD_TYPE}")
message(STATUS "C++ standard:   ${CMAKE_CXX_STANDARD}")
message(STATUS "iPlug2 path:    ${IPLUG2_ROOT_PATH}")
message(STATUS "Source dir:     ${CMAKE_SOURCE_DIR}")
message(STATUS "Build dir:      ${CMAKE_BINARY_DIR}")
message(STATUS "Install dir:    ${VST3_INSTALL_DIR}")
message(STATUS "===========================================")
message(STATUS "")
message(STATUS "📋 Build commands:")
message(STATUS "  mkdir build && cd build")
message(STATUS "  cmake ..")
message(STATUS "  make")
message(STATUS "")
message(STATUS "📦 Install command:")
message(STATUS "  make install")
message(STATUS "  OR manually:")
message(STATUS "  cp -r build/VST3/IntheBox.vst3 ${VST3_INSTALL_DIR}/")
message(STATUS "===========================================")
