; Inno Setup Script for Lofi Tape Saturator VST3
; This installer will automatically install the plugin in the correct locations for FL Studio and other DAWs
; Includes automatic WebView2 Runtime installation

#define MyAppName "Lofi Tape Saturator"
#define MyAppVersion "1.0.9"
#define MyAppPublisher "itbblog"
#define MyAppURL "https://www.itbblog.com"
#define VST3FileName "Lofi Tape Saturator.vst3"

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
    Result := RegQueryStringValue(HKLM, RegKey, 'pv', Version)ean;
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

  if not IsWin64 then
  begin
    MsgBox('This plugin requires a 64-bit version of Windows.', mbError, MB_OK);
    Result := False;
    Exit;
  end;
  
  // Check WebView2 and inform user
  if not IsWebView2Installed then
  begin
    MsgBox('This plugin requires Microsoft Edge WebView2 Runtime.' + #13#10#13#10 +
           'Please install it from:' + #13#10 +
           'https://go.microsoft.com/fwlink/p/?LinkId=2124703' + #13#10#13#10 +
           'The installer will continue, but the plugin will not work until WebView2 is installed.',
           mbInformation, MB_OK);
  end
  else
  begin
    WebView2Installednot WebView2Installed then
    begin
      Message := Message + 'IMPORTANT: WebView2 Runtime is required!' + #13#10 +
                 'Download from: https://go.microsoft.com/fwlink/p/?LinkId=2124703