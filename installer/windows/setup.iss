; Inno Setup Script for Lofi Tape Saturator VST3
; This installer will automatically install the plugin in the correct locations for FL Studio and other DAWs
; Includes automatic WebView2 Runtime installation

; Include Inno Download Plugin for WebView2 download
#include "idp.iss"

#define MyAppName "Lofi Tape Saturator"
#define MyAppVersion "1.0.9"
#define MyAppPublisher "itbblog"
#define MyAppURL "https://www.itbblog.com"
#define VST3FileName "Lofi Tape Saturator.vst3"
#define WebView2InstallerURL "https://go.microsoft.com/fwlink/p/?LinkId=2124703"

[Setup]
AppId={{4C544653-6174-7572-6174-6F7200000001}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf64}\Common Files\VST3
DefaultGroupName={#MyAppName}
DisableProgramGroupPage=yes
OutputDir=..\..\artifacts\installer
OutputBaseFilename=LofiTapeSaturator-{#MyAppVersion}-Windows-x64-Setup
Compression=lzma2/max
SolidCompression=yes
WizardStyle=modern
ArchitecturesAllowed=x64compatible
ArchitecturesInstallIn64BitMode=x64compatible
PrivilegesRequired=admin
UninstallDisplayIcon={app}\{#VST3FileName}\Contents\x86_64-win\LofiTapeSaturator.vst3
; SetupIconFile=..\..\IPlugWebUI\resources\icon.ico  ; Uncomment when you add an icon file

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"
Name: "italian"; MessagesFile: "compiler:Languages\Italian.isl"

[Files]
; Install VST3 to Common Files
Source: "..\..\artifacts\{#VST3FileName}\*"; DestDir: "{autopf64}\Common Files\VST3\{#VST3FileName}"; Flags: ignoreversion recursesubdirs createallsubdirs

; Also install to FL Studio's default VST3 directory if it exists
Source: "..\..\artifacts\{#VST3FileName}\*"; DestDir: "{userappdata}\Image-Line\FL Studio\Plugins\VST3\{#VST3FileName}"; Flags: ignoreversion recursesubdirs createallsubdirs; Check: FLStudioExists

; Install to user's Documents VST3 folder (alternative location)
Source: "..\..\artifacts\{#VST3FileName}\*"; DestDir: "{userdocs}\VST3\{#VST3FileName}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#VST3FileName}"
Name: "{group}\{cm:UninstallProgram,{#MyAppName}}"; Filename: "{uninstallexe}"

[Code]
var
  WebView2Installed: Boolean;
  NeedsRestart: Boolean;

function IsWebView2Installed: Boolean;
var
  RegKey: String;
  Version: String;
begin
  // Check if WebView2 Runtime is installed
  RegKey := 'SOFTWARE\WOW6432Node\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}';
  Result := RegQueryStringValue(HKLM, RegKey, 'pv', Version);
  
  if not Result then
  begin
    // Try 32-bit key on 64-bit system
    RegKey := 'SOFTWARE\Microsoft\EdgeUpdate\Clients\{F3017226-FE2A-4295-8BDF-00C3A9A7E4C5}';
    Result := RegQueryStringValue(HKLM, RegKey, 'pv', Version);
  end;
end;

function DownloadAndInstallWebView2: Boolean;
var
  WebView2Installer: String;
  ResultCode: Integer;
begin
  Result := True;
  WebView2Installer := ExpandConstant('{tmp}\MicrosoftEdgeWebview2Setup.exe');
  
  if not IsWebView2Installed then
  begin
    if MsgBox('This plugin requires Microsoft Edge WebView2 Runtime.' + #13#10#13#10 +
              'Would you like to download and install it now?' + #13#10 +
              '(Required for the plugin to work)', mbConfirmation, MB_YESNO) = IDYES then
    begin
      // Download WebView2 bootstrapper
      if idpDownloadFile('{#WebView2InstallerURL}', WebView2Installer) then
      begin
        // Install WebView2
        if Exec(WebView2Installer, '/silent /install', '', SW_HIDE, ewWaitUntilTerminated, ResultCode) then
        begin
          if ResultCode = 0 then
          begin
            WebView2Installed := True;
            Result := True;
          end
          else
          begin
            MsgBox('WebView2 installation failed. The plugin may not work correctly.' + #13#10 +
                   'You can manually install it from: https://go.microsoft.com/fwlink/p/?LinkId=2124703',
                   mbError, MB_OK);
            Result := False;
          end;
        end;
      end
      else
      begin
        MsgBox('Failed to download WebView2. Please check your internet connection.' + #13#10 +
               'You can manually install it from: https://go.microsoft.com/fwlink/p/?LinkId=2124703',
               mbError, MB_OK);
        Result := False;
      end;
    end
    else
    begin
      MsgBox('WebView2 Runtime is required for this plugin to work.' + #13#10 +
             'Please install it manually from: https://go.microsoft.com/fwlink/p/?LinkId=2124703',
             mbInformation, MB_OK);
      Result := False;
    end;
  end
  else
  begin
    WebView2Installed := True;
  end;
end;

function FLStudioExists: Boolean;
var
  FLDir: String;
begin
  FLDir := ExpandConstant('{userappdata}\Image-Line\FL Studio');
  Result := DirExists(FLDir);
end;

function InitializeSetup(): Boolean;
begin
  Result := True;
  WebView2Installed := False;
  NeedsRestart := False;
  
  if not IsWin64 then
  begin
    MsgBox('This plugin requires a 64-bit version of Windows.', mbError, MB_OK);
    Result := False;
    Exit;
  end;
  
  // Check and install WebView2
  if not DownloadAndInstallWebView2 then
  begin
    // User cancelled or installation failed
    // We continue anyway and warn them
    Result := True;
  end;
end;

procedure CurStepChanged(CurStep: TSetupStep);
var
  Message: String;
begin
  if CurStep = ssPostInstall then
  begin
    Message := 'Installation completed successfully!' + #13#10#13#10 + 
               'The plugin has been installed to:' + #13#10 +
               '1. Common Files\VST3' + #13#10 +
               '2. FL Studio VST3 folder (if FL Studio is installed)' + #13#10 +
               '3. Documents\VST3' + #13#10#13#10;
    
    if WebView2Installed then
    begin
      Message := Message + 'Microsoft Edge WebView2 Runtime has been installed.' + #13#10#13#10;
    end;
    
    Message := Message + 'Please restart your DAW to see the plugin.';
    
    MsgBox(Message, mbInformation, MB_OK);
  end;
end;
