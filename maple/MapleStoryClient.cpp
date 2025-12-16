#include <iostream>
#include <fstream>
#include <string>
#include <windows.h>
#include <wininet.h>
#include "MapleStoryClient_version.h"

/* 
 * Compile (Release) >> make
 * Compile (Debug)   >> make debug
 * Clean             >> make clean
 * Version check     >> make version
 * Run (Release)     >> make run
 * Run (Debug)       >> make run-debug
 */

// 로컬 파일에서 버전 읽기
std::string getLatestVersionLocal(const std::string& filepath) {
    std::ifstream file(filepath);
    if (!file.is_open()) return "";
    
    std::string version;
    std::getline(file, version);
    file.close();
    
    while (!version.empty() && (version.back() == '\n' || version.back() == '\r')) {
        version.pop_back();
    }
    
    return version;
}

// 서버에서 버전 읽기
std::string getLatestVersionRemote(const std::string& url) {
    std::string result;
    
    HINTERNET hInternet = InternetOpenA("VersionChecker", INTERNET_OPEN_TYPE_DIRECT, NULL, NULL, 0);
    if (!hInternet) return "";
    
    DWORD timeout = 5000;
    InternetSetOptionA(hInternet, INTERNET_OPTION_CONNECT_TIMEOUT, &timeout, sizeof(timeout));  // 연결 타임아웃
    InternetSetOptionA(hInternet, INTERNET_OPTION_RECEIVE_TIMEOUT, &timeout, sizeof(timeout));  // 수신 타임아웃
    InternetSetOptionA(hInternet, INTERNET_OPTION_SEND_TIMEOUT, &timeout, sizeof(timeout));     // 송신 타임아웃

    HINTERNET hConnect = InternetOpenUrlA(hInternet, url.c_str(), NULL, 0, INTERNET_FLAG_RELOAD, 0);
    if (!hConnect) {
        InternetCloseHandle(hInternet);
        return "";
    }
    
    char buffer[256];
    DWORD bytesRead;
    while (InternetReadFile(hConnect, buffer, sizeof(buffer) - 1, &bytesRead) && bytesRead > 0) {
        buffer[bytesRead] = '\0';
        result += buffer;
    }
    
    InternetCloseHandle(hConnect);
    InternetCloseHandle(hInternet);
    
    while (!result.empty() && (result.back() == '\n' || result.back() == '\r')) {
        result.pop_back();
    }
    
    return result;
}

std::string getLatestVersion() {
#ifdef DEBUG
    std::cout << "[DEBUG] Using localhost server" << std::endl;
    return getLatestVersionRemote("http://localhost:3000/downloads/MapleStoryClient_version.txt");
#else
    return getLatestVersionRemote("https://your-server.com/version.txt");
#endif
}

int compareVersion(const std::string& a, const std::string& b) {
    int aMajor = 0, aMinor = 0, aPatch = 0;
    int bMajor = 0, bMinor = 0, bPatch = 0;
    
    sscanf(a.c_str(), "%d.%d.%d", &aMajor, &aMinor, &aPatch);
    sscanf(b.c_str(), "%d.%d.%d", &bMajor, &bMinor, &bPatch);
    
    if (aMajor != bMajor) return aMajor - bMajor;
    if (aMinor != bMinor) return aMinor - bMinor;
    return aPatch - bPatch;
}

void openDownloadPage() {
#ifdef DEBUG
    ShellExecuteA(NULL, "open", "http://localhost:3000", NULL, NULL, SW_SHOWNORMAL);
#else
    ShellExecuteA(NULL, "open", "https://your-server.com/download", NULL, NULL, SW_SHOWNORMAL);
#endif
}

const std::string mushroomAsciiArt = R"(
                                .....                                                 
                        .,:*$$######$=:,.                                            
                        -;=#@@#$=**!!!;!=$*:,                                          
                    .~=#@@$!-,,..      .-;$$!,                                        
                    ~$@@#=;                .=@#;.                                      
                ,!#@#!:-.                  ;$@$!-.                                   
                :$@#!~---                    -!#@#*~                                  
                ;@@=:---,                       ,;#@#*.                                
            :@#!----,                          .!#@@;,.                             
            ~@@!----,                             ,!#@#*;-..                         
            -$@*~----,                               -!$@@#$*;-                       
            .$@=~----,                                  .-;$@@@@=~                     
        .=@=~----,                                      .,~*$@@*,                   
        .*@$:-----,.            ............                 ,:#@$,                  
        ~@@;-------,     ..,,,----------------,,,.             .*@$                  
        .=@=--------. ..,----------------------------,,...       .=@;                 
        ;@#~--------,,------------------------------------,,,.    ~@#.                
        -##:------------------------~~;!***!!;:~---------------,.  .$@:                
    ,#@*---------------------~:*#@@@@@@@@@@@@#=;~-------------,  !@*                
    -=@=~-----------------~:;=#@@#$==**=**===$#@@@$*:~----------,.,@$,               
    ~$@$:---------------~:!=###$==******$=*!!!!=*=$#@@$*;~--------- $#-               
    ;#@*~--------------~!$#@$=***=#$##@@@@@#$$==$!!!**=#@@=;--------.!@:               
;@@*---------------;#@@=$$$#@@@@@#$====$#@@@@@=*!!=*!*$@@*~------,:@;               
~#@!--------------;#@#$=$@@#$$=!::~~~~~~~~:;!=$@@$$#*!!!*#@#;------:@;               
.=@!-------------:=@#$##@#=!;:~~~~~~~~~~~~~~~~~:!=@@#=*****=@#:-----;@:               
-@=~-----------~*@#=$@@$;~~~~~~~~~~~~~~~~~~~~~~~~~:!#@##@#!!=@*-----=@~               
!@!-----------,*@$**##!~~~~~~~~~~~~~~~~~~~~~~~~~~~~~;@#==!!!!#$~---~@#-               
##;----------,!@$**$#;~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*@=*!!!!$#:---;@=.               
@#:----------!@=$#$@*~~~~~~~~~~~~~~~~~~~~~~~~~~~;*;~~~$@$$$*!$#:---=@;                
.@$:--------~*@=!*$@#:~~~~~~!$*~~~~~~~~~~~~~~~~~;@@@=~~;@@#***@=~--;@#,                
,@$~-----,,-*#=**=$@=~~~~~~!@@@=~---,,,.........:@@@$:-~$@**=#@;--:$@!                 
.@$~-----,-~#=*=#@@=:~~~~~~*@@@#-.   .       -  ,=##;..,!@##@@!--~=@*                  
@#:-------;@*!*=##:~~~~~-.:@@@=.   ,*.  ,~ ,*.  .--    -#@@#!--:$@=,                  
*@;-------:#*!!*#!~~~~~,   ,!;.    .#$;!#=:=!           !@$~--;#@$-                   
~@=~-------=$*!$$:~~~-.             -*$=;:*;.           .=@*:*@@*,                    
=@*-------:$$=#!~~~-.               .,.                 ,$@#@#:.                     
-#@;-------~*@#:~~~.                                     ,=@@~                       
;@#!~------:@*~~~-                                       ,=@=,                      
    ;@@=:----~=@:~~-.                                        ,*@$-                     
    ~#@#=;~-;#*~~~,                                          .*@$,                    
    ,*#@@@$##~~~-                                            .=@*.                   
        -;*$#@*~~~,                                             ,$@:                   
        .,=#;~~~.                                              ~@=.                  
        .#=~~~-                                                =@-                  
        -@!~~~,                                                :@;                  
        ;@;~~~,                                                -#=                  
        =#:~~~,                                                ,#$                  
        ##:~~~.                                                ,#$                  
        .#$~~~~.                                                -#=                  
        ,#$:~~~,                                                :@;                  
        ,#$:~~~-                                                !@~                  
        -#$:~~~-.                                               =@,                  
        ,##:~~~~,                                              ,#=.                  
        #@;~~~~~,                                             ;@!                   
        !@*~~~~~~,                                           .##-                   
        ,@#;~~~~~~-.                                         ;@=.                   
            !@$:~~~~~~-,.                                      ~#@~                    
            .=@#;~~~~~~~~-.                                  .;@@!                     
            ,=@#!:~~~~~~~~-,                              .-=@#;                      
            .*@@$*!::~~~~~~--,                         ,:=#@=~                       
                ~=@@@#$$$====**!;~~~~~~:::::~~~~~~~~~~:!*$@@$:.                        
                ,!$#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@$-                           
                    .-~:;;!!!!!!!!!!!!!!!!!!!!!!!!!!**!:,                             
)";

int main() {
#ifdef DEBUG
    std::cout << "[DEBUG MODE]" << std::endl;
#endif
    
    std::cout << "Version: " << VERSION_STRING << std::endl;
    std::cout << std::endl;
    
    std::cout << "Checking for updates..." << std::endl;
    
    std::string latestVersion = getLatestVersion();
    
    if (latestVersion.empty()) {
        std::cout << "Warning: Could not check for updates." << std::endl;
    } 
    else if (compareVersion(latestVersion, VERSION_STRING) > 0) {
        std::cout << "======================================" << std::endl;
        std::cout << "  New version available: " << latestVersion << std::endl;
        std::cout << "  Current version: " << VERSION_STRING << std::endl;
        std::cout << "======================================" << std::endl;
        std::cout << "Download update? (Y/N): ";
        
        char choice;
        std::cin >> choice;
        std::cin.ignore(10000, '\n');
        
        if (choice == 'Y' || choice == 'y') {
            openDownloadPage();
            std::cout << "Opening download page..." << std::endl;
            system("pause");
            return 0;
        }
    } 
    else {
        std::cout << "You have the latest version!" << std::endl;
    }

    std::cout << mushroomAsciiArt << std::endl;

    system("pause");
    return 0;
}