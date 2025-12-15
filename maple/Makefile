# 폴더 설정
OUT_DIR := public/downloads

# 버전 정보 읽기
VERSION := $(shell findstr . MapleStoryClient_version.txt)
MAJOR := $(word 1,$(subst ., ,$(VERSION)))
MINOR := $(word 2,$(subst ., ,$(VERSION)))
PATCH := $(word 3,$(subst ., ,$(VERSION)))

# 컴파일러 설정
CXX := g++
WINDRES := windres
CXXFLAGS_BASE := -Wall -I$(OUT_DIR)
CXXFLAGS_RELEASE := $(CXXFLAGS_BASE) -O2
CXXFLAGS_DEBUG := $(CXXFLAGS_BASE) -g -DDEBUG
LIBS := -lwininet

# 파일명
TARGET := $(OUT_DIR)/MapleStoryClient.exe
SOURCES := MapleStoryClient.cpp
VERSION_H := $(OUT_DIR)/MapleStoryClient_version.h
VERSION_RC := $(OUT_DIR)/MapleStoryClient_version.rc
VERSION_O := $(OUT_DIR)/MapleStoryClient_version.o
VERSION_TXT := $(OUT_DIR)/MapleStoryClient_version.txt

# 기본 타겟 (Release)
all: $(OUT_DIR) $(VERSION_H) $(VERSION_RC) $(VERSION_O)
	$(CXX) $(CXXFLAGS_RELEASE) -o $(TARGET) $(SOURCES) $(VERSION_O) $(LIBS)
	@copy MapleStoryClient_version.txt "public\downloads\MapleStoryClient_version.txt"
	@echo ========================================
	@echo Build complete! [RELEASE] Version: $(VERSION)
	@echo Output: $(TARGET)
	@echo ========================================

# Debug 빌드
debug: $(OUT_DIR) $(VERSION_H) $(VERSION_RC) $(VERSION_O)
	$(CXX) $(CXXFLAGS_DEBUG) -o $(TARGET) $(SOURCES) $(VERSION_O) $(LIBS)
	@copy MapleStoryClient_version.txt "public\downloads\MapleStoryClient_version.txt"
	@echo ========================================
	@echo Build complete! [DEBUG] Version: $(VERSION)
	@echo Output: $(TARGET)
	@echo ========================================

# 출력 폴더 생성
$(OUT_DIR):
	@if not exist "public\downloads" mkdir "public\downloads"

# 리소스 컴파일
$(VERSION_O): $(VERSION_RC) $(VERSION_H)
	$(WINDRES) $(VERSION_RC) -o $(VERSION_O)

# version.h 자동 생성
$(VERSION_H): MapleStoryClient_version.txt $(OUT_DIR)
	@echo Generating $(VERSION_H)...
	@echo #ifndef VERSION_H > $@
	@echo #define VERSION_H >> $@
	@echo #define VERSION_MAJOR $(MAJOR) >> $@
	@echo #define VERSION_MINOR $(MINOR) >> $@
	@echo #define VERSION_PATCH $(PATCH) >> $@
	@echo #define VERSION_STRING "$(VERSION)" >> $@
	@echo #endif >> $@

# version.rc 자동 생성
$(VERSION_RC): MapleStoryClient_version.txt $(OUT_DIR)
	@echo Generating $(VERSION_RC)...
	@echo #include "MapleStoryClient_version.h" > $@
	@echo #include ^<winver.h^> >> $@
	@echo VS_VERSION_INFO VERSIONINFO >> $@
	@echo FILEVERSION $(MAJOR),$(MINOR),$(PATCH),0 >> $@
	@echo PRODUCTVERSION $(MAJOR),$(MINOR),$(PATCH),0 >> $@
	@echo FILEFLAGSMASK 0x3fL >> $@
	@echo FILEFLAGS 0x0L >> $@
	@echo FILEOS VOS__WINDOWS32 >> $@
	@echo FILETYPE VFT_APP >> $@
	@echo FILESUBTYPE VFT2_UNKNOWN >> $@
	@echo BEGIN >> $@
	@echo     BLOCK "StringFileInfo" >> $@
	@echo     BEGIN >> $@
	@echo         BLOCK "040904B0" >> $@
	@echo         BEGIN >> $@
	@echo             VALUE "CompanyName", "Not Nexon\0" >> $@
	@echo             VALUE "FileDescription", "MapleStoryClient\0" >> $@
	@echo             VALUE "FileVersion", "$(VERSION)\0" >> $@
	@echo             VALUE "InternalName", "Mushroom\0" >> $@
	@echo             VALUE "LegalCopyright", "Copyleft\0" >> $@
	@echo             VALUE "OriginalFilename", "MapleStoryClient.exe\0" >> $@
	@echo             VALUE "ProductName", "Mushroom\0" >> $@
	@echo             VALUE "ProductVersion", "$(VERSION)\0" >> $@
	@echo         END >> $@
	@echo     END >> $@
	@echo     BLOCK "VarFileInfo" >> $@
	@echo     BEGIN >> $@
	@echo         VALUE "Translation", 0x0409, 1200 >> $@
	@echo     END >> $@
	@echo END >> $@

# 실행 (Release)
run:
	@echo Running [RELEASE]...
	@$(TARGET)

# 실행 (Debug)
run-debug:
	@echo Running [DEBUG]...
	@$(TARGET)

# 정리
clean:
	-@del "public\downloads\MapleStoryClient_version.h" 2>nul
	-@del "public\downloads\MapleStoryClient_version.rc" 2>nul
	-@del "public\downloads\MapleStoryClient_version.o" 2>nul
	-@del "public\downloads\MapleStoryClient_version.txt" 2>nul
	-@del "public\downloads\MapleStoryClient.exe" 2>nul
	@echo Clean complete!

# 재빌드
rebuild: clean all

rebuild-debug: clean debug

# 버전 확인
version:
	@echo VERSION: $(VERSION)
	@echo OUTPUT: $(TARGET)

.PHONY: all debug clean rebuild rebuild-debug version run run-debug