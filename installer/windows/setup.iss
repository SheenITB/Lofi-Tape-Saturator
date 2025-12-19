; Inno Setup Script for Lofi Tape Saturator VST3
; This installer will automatically install the plugin in the correct locations for FL Studio and other DAWs

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
  if not IsWin64 then
  begin
    MsgBox('This plugin requires a 64-bit version of Windows.', mbError, MB_OK);
    Result := False;
  end;
end;

procedure CurStepChanged(CurStep: TSetupStep);
begin
  if CurStep = ssPostInstall then
  begin
    MsgBox('Installation completed successfully!' + #13#10#13#10 + 
           'The plugin has been installed to:' + #13#10 +
           '1. Common Files\VST3' + #13#10 +
           '2. FL Studio VST3 folder (if FL Studio is installed)' + #13#10 +
           '3. Documents\VST3' + #13#10#13#10 +
           'Please restart your DAW to see the plugin.', 
           mbInformation, MB_OK);
  end;
end;
