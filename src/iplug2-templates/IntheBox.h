// IntheBox.h - Header file for IntheBox VST3 Plugin
// Version 1.0.9 - Lo-Fi Tape Saturator
// iPlug2 + React WebView Integration

#pragma once

#include "IPlug_include_in_plug_hdr.h"
#include "IControl.h"
#include <algorithm>
#include <array>
#include <cmath>
#include <vector>

using iplug::EParamSource;

const int kNumPrograms = 1;

// Parameter IDs - Match with React GUI (App.tsx)
enum EParams
{
  kParamDrive = 0,      // 0-100% - Tape saturation amount
  kParamTone,           // 0-100% - Tone control
  kParamMPC,            // 0-100 → 16-bit down to 4-bit
  kParamWow,            // 0-100% - Pitch variation
  kParamNoise,          // 0-100% - Tape noise level
  kParamFlutter,        // 0-100% - Speed variation
  kParamResampler,      // 0-100 → Sample rate reduction
  kParamLowPass,        // 0-100 → Low-pass filter cutoff
  kParamOutputGain,     // 0-100% - Output gain control
  kParamPower,          // Bool - Tape STOP/PLAY
  kParamClipperEnabled, // Bool - Clipper engage
  kParamClipperMode,    // 0-100% - Clipper mode
  kParamAntiAlias,      // Bool - HQ anti-alias toggle
  kNumParams
};

class IntheBox final : public iplug::Plugin
{
public:
  IntheBox(const iplug::InstanceInfo& info);

#if IPLUG_EDITOR
  void OnUIOpen() override;
  void OnUIClose() override;
  void OnParamChange(int paramIdx) override;
  void SendMeterLevel(double level);
  void SendClippingState(bool isClipping);
#endif

  void ProcessBlock(iplug::sample** inputs, iplug::sample** outputs, int nFrames) override;
  void OnReset() override;
  void OnParamChangeUI(int paramIdx, EParamSource source) override;

private:
  // DSP State Variables (match React GUI defaults)
  double mDrive = 0.0;          // Default: 0%
  double mTone = 0.0;           // Default: 0%
  double mMPC = 0.0;            // Default: 0 (16-bit)
  double mWow = 0.0;            // Default: 0%
  double mNoise = 0.0;          // Default: 0%
  double mFlutter = 0.0;        // Default: 0%
  double mResampler = 100.0;    // Default: 100%
  double mLowPass = 100.0;      // Default: 20 kHz (fully open)
  double mOutputGain = 67.0;    // Default: ~0 dB
  bool mPower = false;          // Default: STOP (false)
  bool mClipperEnabled = false; // Default: clipper bypassed
  double mClipperMode = 50.0;   // Default: 50%
  bool mAntiAliasEnabled = false;// Default: anti-aliasing off
  
  // VU Meter and clipping detection
  double mCurrentLevel = 0.0;
  bool mIsClipping = false;
  int mMeterUpdateCounter = 0;
  
  // Sample rate
  double mSampleRate = 44100.0;

  static constexpr int kMaxChannels = 2;

  // Wow & flutter delay buffer
  std::array<std::vector<double>, kMaxChannels> mWowBuffer {};
  std::array<int, kMaxChannels> mDelayWritePos {0, 0};
  double mWowPhase = 0.0;
  double mFlutterPhase = 0.0;

  // Filters and stateful processors
  std::array<double, kMaxChannels> mToneLPState {0.0, 0.0};
  std::array<double, kMaxChannels> mLowPassState {0.0, 0.0};
  std::array<double, kMaxChannels> mClipperLPState {0.0, 0.0};
  std::array<double, kMaxChannels> mClipperPrevInput {0.0, 0.0};
  std::array<double, kMaxChannels> mHeldSample {0.0, 0.0};
  std::array<int, kMaxChannels> mSampleHoldCounter {0, 0};

  // Noise generator
  uint32_t mNoiseSeed = 0x12345678u;

  struct ParamSmoother {
    double current = 0.0;
    double target = 0.0;
    double coeff = 0.0;

    void Reset(double sampleRate, double smoothingMs, double initialValue)
    {
      const double sr = std::max(1.0, sampleRate);
      const double timeSeconds = std::max(0.001, smoothingMs * 0.001);
      coeff = std::exp(-1.0 / (sr * timeSeconds));
      target = initialValue;
      current = initialValue;
    }

    void SetTarget(double value)
    {
      target = value;
    }

    double Process()
    {
      current += (target - current) * (1.0 - coeff);
      return current;
    }
  };

  ParamSmoother mDriveSmoother;
  ParamSmoother mResamplerSmoother;
  ParamSmoother mWowSmoother;
  ParamSmoother mFlutterSmoother;
  ParamSmoother mOutputGainSmoother;
};
