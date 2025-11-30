#pragma once

#include "IPlug_include_in_plug_hdr.h"
#include "Oscillator.h"
#include "Smoothers.h"
#include <atomic>
#include <array>
#include <cstdint>

using namespace iplug;

const int kNumPresets = 3;

struct BiquadFilter
{
  double b0 = 1.0;
  double b1 = 0.0;
  double b2 = 0.0;
  double a1 = 0.0;
  double a2 = 0.0;
  std::array<double, 2> z1 {{0.0, 0.0}};
  std::array<double, 2> z2 {{0.0, 0.0}};

  double Process(double input, int channel);
  void Reset();
  void SetLowShelf(double sampleRate, double freq, double gainDB, double q);
  void SetHighShelf(double sampleRate, double freq, double gainDB, double q);
  void SetPeaking(double sampleRate, double freq, double gainDB, double q);
  void SetLowPass(double sampleRate, double freq, double resonance);
};

enum EParams
{
  kParamDriveGain = 0,
  kParamDriveVU,
  kParamToneLowGain,
  kParamToneHighGain,
  kParamToneMidQ,
  kParamMpcBits,
  kParamResampleRatio,
  kParamWowAmount,
  kParamWowRate,
  kParamFlutterAmount,
  kParamFlutterRate,
  kParamNoiseLevel,
  kParamLowPassCutoff,
  kParamLowPassResonance,
  kParamOutputGain,
  kParamClipThreshold,
  kParamClipMode,
  kParamClipSlope,
  kParamPower,
  kNumParams
};

enum EClipMode
{
  kClipModeHard = 0,
  kClipModeSoft,
  kClipModeTanh,
  kNumClipModes
};

enum EMsgTags
{
  kMsgTagButton1 = 0,
  kMsgTagButton2 = 1,
  kMsgTagButton3 = 2,
  kMsgTagBinaryTest = 3
};

class IPlugWebUI final : public Plugin
{
public:
  IPlugWebUI(const InstanceInfo& info);
  
  void ProcessBlock(sample** inputs, sample** outputs, int nFrames) override;
  void ProcessMidiMsg(const IMidiMsg& msg) override;
  void OnReset() override;
  void OnIdle() override;
  bool OnMessage(int msgTag, int ctrlTag, int dataSize, const void* pData) override;
  void OnParamChange(int paramIdx) override;
  bool CanNavigateToURL(const char* url);
  bool OnCanDownloadMIMEType(const char* mimeType) override;
  void OnFailedToDownloadFile(const char* path) override;
  void OnDownloadedFile(const char* path) override;
  void OnGetLocalDownloadPathForFile(const char* fileName, WDL_String& localPath) override;

private:
  float mLastPeak = 0.f;
  FastSinOscillator<sample> mOscillator {0., 440.};
  LogParamSmooth<sample, 1> mDriveSmoother;
#if IPLUG_EDITOR
  void OnUIOpen() override;
  void OnUIClose() override;
  std::atomic<bool> mUIOpen {false};
#endif
  std::atomic<bool> mDriveVUQueued {false};
  std::atomic<float> mPendingDriveVU {0.0f};

  std::array<double, 2> mTransformerSaturation {{0.0, 0.0}};
  std::array<double, 2> mTransformerBias {{0.0, 0.0}};
  std::array<double, 2> mTransformerLowpass {{0.0, 0.0}};
  std::array<double, 2> mToneEnvelope {{0.0, 0.0}};
  std::array<double, 2> mResamplePhase {{0.0, 0.0}};
  std::array<double, 2> mResampleHold {{0.0, 0.0}};
  std::array<double, 2> mMpcPrevSample {{0.0, 0.0}};
  std::array<uint32_t, 2> mNoiseSeeds {{0x243F6A88u, 0x13198A2Eu}};
  std::array<double, 2> mNoiseFilter {{0.0, 0.0}};
  std::array<double, 2> mCrackleEnvelope {{0.0, 0.0}};
  std::array<int, 2> mCrackleCooldown {{0, 0}};

  BiquadFilter mToneLowShelf;
  BiquadFilter mToneHighShelf;
  BiquadFilter mToneMidBell;
  BiquadFilter mLowPassFilter;
  BiquadFilter mNoiseLowPassFilter;  // Dedicated LPF for vinyl noise

  static constexpr int kWowBufferSize = 8192;
  std::array<std::array<double, kWowBufferSize>, 2> mWowBuffer {};
  std::array<int, 2> mWowWriteIndex {{0, 0}};
  double mWowPhase = 0.0;
  double mFlutterPhase = 0.0;
  double mWowPhaseInc = 0.0;
  double mFlutterPhaseInc = 0.0;

  // Cached parameter state (synchronised in OnParamChange)
  double mDriveGain = 0.2;
  double mToneLowGain = 0.0;
  double mToneHighGain = 0.0;
  double mToneMidQ = 1.0;
  int mMpcBits = 16;
  double mResampleRatio = 1.0;
  double mWowAmount = 0.02;
  double mWowRate = 0.2;
  double mFlutterAmount = 0.01;
  double mFlutterRate = 8.0;
  double mNoiseLevel = 0.0;
  double mLowPassCutoff = 18000.0;
  double mLowPassResonance = 0.7;
  double mOutputGainDB = 0.0;      // -12 to +12 dB
  double mOutputGainLinear = 1.0;  // Linear conversion
  double mClipThreshold = 1.0;
  int mClipMode = kClipModeTanh;
  double mClipSlope = 0.5;
  bool mPowerOn = true;
  double mBypassRamp = 1.0;  // Smooth bypass ramp (0.0 = bypassed, 1.0 = active)
  double mToneAttackCoeff = 0.0;
  double mToneReleaseCoeff = 0.0;
  double mToneSaturationMix = 0.3;

  void SendDriveVUMeter(float linearValue);
  void UpdateToneFilters();
  void UpdateLowPassFilter();
  void RefreshWowFlutterIncrements();
};
