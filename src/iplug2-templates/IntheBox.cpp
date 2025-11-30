// IntheBox.cpp - Implementation for IntheBox VST3 Plugin
// Version 1.0.9 - Lo-Fi Tape Saturator
// iPlug2 + React WebView Integration

#include "IntheBox.h"
#include "IPlug_include_in_plug_src.h"
#include <algorithm>
#include <cmath>
#include <limits>

using iplug::Plugin;

namespace {
template <typename T>
T ClampValue(T value, T minValue, T maxValue)
{
  if (value < minValue) {
    return minValue;
  }
  if (value > maxValue) {
    return maxValue;
  }
  return value;
}

constexpr double kOutputGainMinDb = -24.0;
constexpr double kOutputGainMaxDb = 12.0;

double OutputGainParamToDb(double parameterValue)
{
  const double normalized = ClampValue(parameterValue / 100.0, 0.0, 1.0);
  return kOutputGainMinDb + normalized * (kOutputGainMaxDb - kOutputGainMinDb);
}

double DbToLinear(double dbValue)
{
  return std::pow(10.0, dbValue / 20.0);
}
}

IntheBox::IntheBox(const iplug::InstanceInfo& info)
: Plugin(info, MakeConfig(kNumParams, kNumPrograms))
{
  // Initialize parameters with default values (v1.0.9)
  // Defaults match React GUI: Drive=0, Tone=0, MPC=16bit, Wow=0, Noise=0, Flutter=0, Tape=STOP
  
  GetParam(kParamDrive)->InitDouble("Drive", 0.0, 0.0, 100.0, 0.1, "%");
  GetParam(kParamDrive)->SetShape(2.0); // Logarithmic response for natural feel
  
  GetParam(kParamTone)->InitDouble("Tone", 0.0, 0.0, 100.0, 0.1, "%");
  
  // MPC: 0=16bit, 100=4bit (linear degradation)
  // Default set to 0 -> 16-bit by default
  GetParam(kParamMPC)->InitDouble("MPC", 0.0, 0.0, 100.0, 1.0, "");
  GetParam(kParamMPC)->SetDisplayText(0, "16-bit");
  GetParam(kParamMPC)->SetDisplayText(50, "10-bit");
  GetParam(kParamMPC)->SetDisplayText(100, "4-bit");
  
  GetParam(kParamWow)->InitDouble("Wow", 0.0, 0.0, 100.0, 0.1, "%");
  
  GetParam(kParamNoise)->InitDouble("Noise", 0.0, 0.0, 100.0, 0.1, "%");
  
  GetParam(kParamFlutter)->InitDouble("Flutter", 0.0, 0.0, 100.0, 0.1, "%");
  
  GetParam(kParamResampler)->InitDouble("Resampler", 100.0, 0.0, 100.0, 1.0, "kHz");
  
  GetParam(kParamLowPass)->InitDouble("LowPass", 100.0, 0.0, 100.0, 0.1, "%");
  GetParam(kParamLowPass)->SetDisplayText(0, "200 Hz");
  GetParam(kParamLowPass)->SetDisplayText(100, "20 kHz");
  
  // Output gain defaults to ~0 dB (67 maps to unity)
  GetParam(kParamOutputGain)->InitDouble("Output", 67.0, 0.0, 100.0, 0.1, "%");
  
  GetParam(kParamPower)->InitBool("Power", false); // Default: STOP
  GetParam(kParamClipperEnabled)->InitBool("ClipperEnabled", false);
  
  GetParam(kParamClipperMode)->InitDouble("ClipperMode", 50.0, 0.0, 100.0, 1.0, "%");
  GetParam(kParamAntiAlias)->InitBool("AntiAlias", false);

#if IPLUG_EDITOR
  mMakeGraphicsFunc = [&]() {
    return MakeGraphics(*this, PLUG_WIDTH, PLUG_HEIGHT, PLUG_FPS);
  };
  
  mLayoutFunc = [&](IGraphics* pGraphics) {
    // Set background color to match React GUI wood texture
    pGraphics->AttachPanelBackground(IColor(255, 42, 24, 16));
    
    // Load the React WebView
    // The HTML file must be located at resources/web/index.html
    pGraphics->LoadWebView("web/index.html");
    
    // Setup WebView ready callback
    pGraphics->SetWebViewReadyFunc([this](IWebView* pWebView) {
      // Log when WebView is ready
      pWebView->EvaluateJavaScript("console.log('IntheBox v1.0.9 - iPlug2 WebView Ready')");
      
      // Send all initial parameter values to React GUI
      for (int i = 0; i < kNumParams; i++) {
        OnParamChange(i);
      }
    });
  };
#endif
}

#if IPLUG_EDITOR
void IntheBox::OnUIOpen()
{
  Plugin::OnUIOpen();
  
  // Send all current parameter values to the React GUI when it opens
  for (int i = 0; i < kNumParams; i++) {
    OnParamChange(i);
  }
}

void IntheBox::OnUIClose()
{
  Plugin::OnUIClose();
}

void IntheBox::OnParamChange(int paramIdx)
{
  // When a parameter changes (from DAW automation, preset load, etc.),
  // notify the React GUI via JavaScript
  if (GetUI() && GetUI()->GetWebView()) {
    const char* paramName = GetParam(paramIdx)->GetName();
    double value = GetParam(paramIdx)->Value();
    bool boolValue = GetParam(paramIdx)->Bool();
    
    WDL_String json;
    
    // Send parameter update to React
    // React listens via: window.updateParameter = (name, value) => { ... }
  if (paramIdx == kParamPower || paramIdx == kParamAntiAlias || paramIdx == kParamClipperEnabled) {
      // Power is boolean
      json.SetFormatted(512, 
        "if(window.updateParameter){window.updateParameter('%s',%s)}",
        paramName,
        boolValue ? "true" : "false"
      );
    } else {
      // All other parameters are doubles
      json.SetFormatted(512, 
        "if(window.updateParameter){window.updateParameter('%s',%f)}",
        paramName,
        value
      );
    }
    
    GetUI()->GetWebView()->EvaluateJavaScript(json.Get());
  }
}

void IntheBox::SendMeterLevel(double level)
{
  // Send VU meter level to React GUI
  // React listens via: window.updateVUMeter = (level) => { ... }
  if (GetUI() && GetUI()->GetWebView()) {
    WDL_String js;
    js.SetFormatted(128, "if(window.updateVUMeter){window.updateVUMeter(%f)}", level);
    GetUI()->GetWebView()->EvaluateJavaScript(js.Get());
  }
}

void IntheBox::SendClippingState(bool isClipping)
{
  // Send clipping state to React GUI
  // React listens via: window.updateClipping = (isClipping) => { ... }
  if (GetUI() && GetUI()->GetWebView()) {
    WDL_String js;
    js.SetFormatted(128, 
      "if(window.updateClipping){window.updateClipping(%s)}", 
      isClipping ? "true" : "false"
    );
    GetUI()->GetWebView()->EvaluateJavaScript(js.Get());
  }
}
#endif

void IntheBox::OnReset()
{
  mSampleRate = GetSampleRate();

  const double maxDelaySeconds = 0.05; // allocate 50ms buffer for modulation
  const int bufferSize = static_cast<int>(std::max(256.0, std::ceil(mSampleRate * maxDelaySeconds)));

  for (int c = 0; c < kMaxChannels; ++c) {
    mWowBuffer[c].assign(bufferSize, 0.0);
    mDelayWritePos[c] = 0;
    mToneLPState[c] = 0.0;
    mLowPassState[c] = 0.0;
    mClipperLPState[c] = 0.0;
    mClipperPrevInput[c] = 0.0;
    mHeldSample[c] = 0.0;
    mSampleHoldCounter[c] = 0;
  }

  mWowPhase = 0.0;
  mFlutterPhase = 0.0;
  mAntiAliasEnabled = GetParam(kParamAntiAlias)->Bool();
  mClipperEnabled = GetParam(kParamClipperEnabled)->Bool();
  mPower = GetParam(kParamPower)->Bool();

  const double smoothingMs = 5.0;

  const double driveNormalized = ClampValue(GetParam(kParamDrive)->Value() / 100.0, 0.0, 1.0);
  mDriveSmoother.Reset(mSampleRate, smoothingMs, driveNormalized);

  const double resamplerNormalized = ClampValue(GetParam(kParamResampler)->Value() / 100.0, 0.0, 1.0);
  mResamplerSmoother.Reset(mSampleRate, smoothingMs, resamplerNormalized);

  const double wowNormalized = ClampValue(GetParam(kParamWow)->Value() / 100.0, 0.0, 1.0);
  mWowSmoother.Reset(mSampleRate, smoothingMs, wowNormalized);

  const double flutterNormalized = ClampValue(GetParam(kParamFlutter)->Value() / 100.0, 0.0, 1.0);
  mFlutterSmoother.Reset(mSampleRate, smoothingMs, flutterNormalized);

  const double outputGainDb = OutputGainParamToDb(GetParam(kParamOutputGain)->Value());
  const double outputGainLinear = DbToLinear(outputGainDb);
  mOutputGainSmoother.Reset(mSampleRate, smoothingMs, outputGainLinear);
}

void IntheBox::OnParamChangeUI(int paramIdx, EParamSource source)
{
  // This is called when parameters change from the React GUI
  // Update internal DSP state variables
  switch(paramIdx) {
    case kParamDrive:
      mDrive = GetParam(kParamDrive)->Value();
      break;
    case kParamTone:
      mTone = GetParam(kParamTone)->Value();
      break;
    case kParamMPC:
      mMPC = GetParam(kParamMPC)->Value();
      break;
    case kParamWow:
      mWow = GetParam(kParamWow)->Value();
      break;
    case kParamNoise:
      mNoise = GetParam(kParamNoise)->Value();
      break;
    case kParamFlutter:
      mFlutter = GetParam(kParamFlutter)->Value();
      break;
    case kParamResampler:
      mResampler = GetParam(kParamResampler)->Value();
      break;
    case kParamLowPass:
      mLowPass = GetParam(kParamLowPass)->Value();
      break;
    case kParamOutputGain:
      mOutputGain = GetParam(kParamOutputGain)->Value();
      break;
    case kParamPower:
      mPower = GetParam(kParamPower)->Bool();
      break;
    case kParamClipperEnabled:
      mClipperEnabled = GetParam(kParamClipperEnabled)->Bool();
      break;
    case kParamClipperMode:
      mClipperMode = GetParam(kParamClipperMode)->Value();
      break;
    case kParamAntiAlias:
      mAntiAliasEnabled = GetParam(kParamAntiAlias)->Bool();
      break;
  }
  
  Plugin::OnParamChangeUI(paramIdx, source);
}

void IntheBox::ProcessBlock(iplug::sample** inputs, iplug::sample** outputs, int nFrames)
{
  const int nChans = NOutChansConnected();

  if (nChans == 0 || nFrames <= 0) {
    return;
  }

  if (mWowBuffer[0].empty()) {
    OnReset();
  }

  // Pull the latest parameter values (host automation/preset changes)
  mDrive = GetParam(kParamDrive)->Value();
  mTone = GetParam(kParamTone)->Value();
  mMPC = GetParam(kParamMPC)->Value();
  mWow = GetParam(kParamWow)->Value();
  mNoise = GetParam(kParamNoise)->Value();
  mFlutter = GetParam(kParamFlutter)->Value();
  mResampler = GetParam(kParamResampler)->Value();
  mLowPass = GetParam(kParamLowPass)->Value();
  mOutputGain = GetParam(kParamOutputGain)->Value();
  mPower = GetParam(kParamPower)->Bool();
  mClipperEnabled = GetParam(kParamClipperEnabled)->Bool();
  mClipperMode = GetParam(kParamClipperMode)->Value();
  mAntiAliasEnabled = GetParam(kParamAntiAlias)->Bool();

  const double sampleRate = std::max(1.0, mSampleRate);
  const double oversampledRate = sampleRate * 2.0;

  const double toneNormalized = ClampValue((mTone / 100.0) * 2.0 - 1.0, -1.0, 1.0);
  const double noiseAmount = ClampValue(mNoise / 100.0, 0.0, 1.0);

  mDriveSmoother.SetTarget(ClampValue(mDrive / 100.0, 0.0, 1.0));
  mResamplerSmoother.SetTarget(ClampValue(mResampler / 100.0, 0.0, 1.0));
  mWowSmoother.SetTarget(ClampValue(mWow / 100.0, 0.0, 1.0));
  mFlutterSmoother.SetTarget(ClampValue(mFlutter / 100.0, 0.0, 1.0));
  const double outputGainDbTarget = OutputGainParamToDb(mOutputGain);
  mOutputGainSmoother.SetTarget(DbToLinear(outputGainDbTarget));

  const double minNoiseDb = -90.0;
  const double maxNoiseDb = -45.0;
  const double noiseGain = (noiseAmount > 0.0)
    ? std::pow(10.0, (minNoiseDb + (maxNoiseDb - minNoiseDb) * (noiseAmount * noiseAmount)) / 20.0)
    : 0.0;

  // Drive stage settings (Neve 1073)
  const double driveRange = 9.0;

  // Tone stage (Studer A800 style shelving blend)
  const double toneAlpha = std::exp(-2.0 * M_PI * 650.0 / sampleRate);

  // Bit depth quantiser (MPC)
  double bitDepth = 16.0 - (mMPC / 100.0) * 12.0;
  bitDepth = ClampValue(bitDepth, 4.0, 16.0);
  const int targetBits = std::max(1, static_cast<int>(std::round(bitDepth)));
  const double quantStep = 2.0 / std::pow(2.0, static_cast<double>(targetBits));

  // Sample-rate reducer
  const int maxHoldSamples = 64;

  // Low-pass filter after wow/flutter
  const double minCutoff = 200.0;
  const double maxCutoff = 20000.0;
  const double lowPassNormalized = ClampValue(mLowPass / 100.0, 0.0, 1.0);
  const double cutoff = minCutoff * std::pow(maxCutoff / minCutoff, lowPassNormalized);
  const double lowPassAlpha = std::exp(-2.0 * M_PI * cutoff / sampleRate);

  // Wow/flutter delay modulation
  const bool useDelayMod = (mWowSmoother.target > 0.0 || mFlutterSmoother.target > 0.0);
  const double wowIncrement = (mWowSmoother.target > 0.0) ? (2.0 * M_PI * 0.45 / sampleRate) : 0.0;
  const double flutterIncrement = (mFlutterSmoother.target > 0.0) ? (2.0 * M_PI * 5.5 / sampleRate) : 0.0;
  const int delayBufferSize = static_cast<int>(mWowBuffer[0].size());

  // Clipper (Lavry Gold inspired)
  const double clipThreshold = 1.0;
  const double clipperHardness = ClampValue(mClipperMode / 100.0, 0.0, 1.0);
  const double clipperSoftness = 4.0 - clipperHardness * 3.0;
  const double clipperFloor = ClampValue(0.85 + clipperHardness * 0.15, 0.0, clipThreshold);
  const double clipperLowpassCutoff = std::min(18000.0, 0.45 * sampleRate);
  const double clipperAlpha = std::exp(-2.0 * M_PI * clipperLowpassCutoff / oversampledRate);

  auto clipperFn = [&](double value, bool& wasClipped) -> double {
    const double magnitude = std::abs(value);
    if (magnitude <= clipThreshold) {
      return value;
    }

    const double overshoot = magnitude - clipThreshold;
    const double shapedMagnitude = clipThreshold - (clipThreshold - clipperFloor) * std::tanh(overshoot * clipperSoftness);
    wasClipped = true;
    return (value >= 0.0 ? 1.0 : -1.0) * shapedMagnitude;
  };

  double rmsLevel = 0.0;
  bool clippingDetected = false;

  for (int s = 0; s < nFrames; ++s) {
    const double driveAmount = ClampValue(mDriveSmoother.Process(), 0.0, 1.0);
    const double driveSaturationGain = 1.0 + driveAmount * driveRange;
    const double driveNormalization = std::max(1e-6, std::tanh(driveSaturationGain));

    const double resamplerValue = ClampValue(mResamplerSmoother.Process(), 0.0, 1.0);
    const int currentHoldSamples = static_cast<int>(1 + std::round((1.0 - resamplerValue) * maxHoldSamples));

    const double wowAmount = ClampValue(mWowSmoother.Process(), 0.0, 1.0);
    const double flutterAmount = ClampValue(mFlutterSmoother.Process(), 0.0, 1.0);
    const double wowDepthSamples = wowAmount * (0.004 * sampleRate);
    const double flutterDepthSamples = flutterAmount * (0.0015 * sampleRate);

    const double outputGainLinear = ClampValue(mOutputGainSmoother.Process(), 0.0, 10.0);

    double delaySamples = 1.0;

    if (useDelayMod && delayBufferSize > 0) {
      const double wowLfo = std::sin(mWowPhase);
      const double flutterLfo = std::sin(mFlutterPhase);
      const double wowOffset = (wowLfo + 1.0) * 0.5;
      const double flutterOffset = (flutterLfo + 1.0) * 0.5;
      delaySamples = 1.0 + wowDepthSamples * wowOffset + flutterDepthSamples * flutterOffset;
      delaySamples = ClampValue(delaySamples, 1.0, std::max(1.0, static_cast<double>(delayBufferSize - 2)));
    }

    for (int c = 0; c < nChans; ++c) {
      const int chanIdx = c % kMaxChannels;
      const double inputSample = inputs[c][s];
      double processed = inputSample;

      // Power OFF: bypass all processing, clear states
      if (!mPower) {
        outputs[c][s] = inputSample;
        
        // Reset all stateful processors to input to avoid clicks
        if (delayBufferSize > 0) {
          mWowBuffer[chanIdx][mDelayWritePos[chanIdx]] = inputSample;
          mDelayWritePos[chanIdx] = (mDelayWritePos[chanIdx] + 1) % delayBufferSize;
        }

        mToneLPState[chanIdx] = inputSample;
        mLowPassState[chanIdx] = inputSample;
        mHeldSample[chanIdx] = inputSample;
        mSampleHoldCounter[chanIdx] = 0;
        mClipperPrevInput[chanIdx] = inputSample;
        mClipperLPState[chanIdx] = inputSample;
        
        if (c == 0) {
          rmsLevel += inputSample * inputSample;
        }
        continue;
      }

      // === Drive (Neve 1073) ===
      const double driven = std::tanh(processed * driveSaturationGain);
      processed = (1.0 - driveAmount) * processed + driveAmount * (driven / driveNormalization);

      // === Tone (Studer A800) ===
      mToneLPState[chanIdx] = toneAlpha * mToneLPState[chanIdx] + (1.0 - toneAlpha) * processed;
      const double lowComponent = mToneLPState[chanIdx];
      const double highComponent = processed - lowComponent;
      const double lowGain = 1.0 + (-toneNormalized) * 0.9;
      const double highGain = 1.0 + toneNormalized * 0.9;
      const double toneNorm = 2.0 / std::max(1e-6, lowGain + highGain);
      processed = (lowComponent * lowGain + highComponent * highGain) * toneNorm;

      // === BitCrusher (MPC) ===
      if (quantStep > 0.0) {
        const double snapped = std::round(processed / quantStep) * quantStep;
        processed = ClampValue(snapped, -1.0, 1.0);
      }

      // === Resampler ===
      if (currentHoldSamples > 1) {
        if (mSampleHoldCounter[chanIdx] <= 0) {
          mHeldSample[chanIdx] = processed;
          mSampleHoldCounter[chanIdx] = currentHoldSamples;
        }
        processed = mHeldSample[chanIdx];
        --mSampleHoldCounter[chanIdx];
      } else {
        mHeldSample[chanIdx] = processed;
        mSampleHoldCounter[chanIdx] = 0;
      }

      // === Wow & Flutter ===
      if (delayBufferSize > 0) {
        auto& buffer = mWowBuffer[chanIdx];
        const int writeIndex = mDelayWritePos[chanIdx];
        buffer[writeIndex] = processed;

        if (useDelayMod) {
          double readIndex = static_cast<double>(writeIndex) - delaySamples;
          while (readIndex < 0.0) {
            readIndex += delayBufferSize;
          }

          const int index0 = static_cast<int>(readIndex) % delayBufferSize;
          const double frac = readIndex - std::floor(readIndex);
          const int index1 = (index0 + 1) % delayBufferSize;
          const double sample0 = buffer[index0];
          const double sample1 = buffer[index1];
          processed = sample0 + (sample1 - sample0) * frac;
        }

        mDelayWritePos[chanIdx] = (writeIndex + 1) % delayBufferSize;
      }

      // === Low-pass ===
      mLowPassState[chanIdx] = (1.0 - lowPassAlpha) * processed + lowPassAlpha * mLowPassState[chanIdx];
      processed = mLowPassState[chanIdx];

      // === Tape hiss (post filtering so it stays broadband) ===
      if (noiseGain > 0.0) {
        mNoiseSeed = mNoiseSeed * 1664525u + 1013904223u;
        const double randomA = static_cast<double>((mNoiseSeed >> 9) & 0x7FFFFF) / static_cast<double>(0x7FFFFF);
        mNoiseSeed = mNoiseSeed * 1664525u + 1013904223u;
        const double randomB = static_cast<double>((mNoiseSeed >> 9) & 0x7FFFFF) / static_cast<double>(0x7FFFFF);
        const double tpdf = (randomA - randomB); // -1..1 triangular
        processed = ClampValue(processed + tpdf * noiseGain, -1.0, 1.0);
      }

      // === Output Gain ===
      processed *= outputGainLinear;

      // === Clipper with optional 2x oversampling ===
      double finalSample = processed;
      auto& clipPrev = mClipperPrevInput[chanIdx];
      auto& clipLp = mClipperLPState[chanIdx];

      if (mClipperEnabled) {
        if (mAntiAliasEnabled) {
          // Linear interpolation for 2x oversampling
          const double midInput = clipPrev + 0.5 * (processed - clipPrev);

          // Process first oversampled sample
          const double clipped0 = clipperFn(midInput, clippingDetected);
          clipLp = clipperAlpha * clipLp + (1.0 - clipperAlpha) * clipped0;
          const double filtered0 = clipLp;

          // Process second oversampled sample
          const double clipped1 = clipperFn(processed, clippingDetected);
          clipLp = clipperAlpha * clipLp + (1.0 - clipperAlpha) * clipped1;
          const double filtered1 = clipLp;

          // Average (downsample)
          finalSample = 0.5 * (filtered0 + filtered1);
        } else {
          finalSample = clipperFn(processed, clippingDetected);
          clipLp = finalSample;
        }
      } else {
        finalSample = processed;
        clipLp = processed;
      }

      clipPrev = processed;

      outputs[c][s] = finalSample;

      if (c == 0) {
        rmsLevel += finalSample * finalSample;
      }
    }

    if (useDelayMod) {
      mWowPhase += wowIncrement;
      mFlutterPhase += flutterIncrement;

      if (mWowPhase > 2.0 * M_PI) {
        mWowPhase -= 2.0 * M_PI;
      }
      if (mFlutterPhase > 2.0 * M_PI) {
        mFlutterPhase -= 2.0 * M_PI;
      }
    }
  }

  rmsLevel = std::sqrt(std::max(0.0, rmsLevel) / std::max(1, nFrames));
  mCurrentLevel = rmsLevel;
  mIsClipping = clippingDetected;

  if (++mMeterUpdateCounter >= 2) {
    mMeterUpdateCounter = 0;
#if IPLUG_EDITOR
    SendMeterLevel(mCurrentLevel);
    SendClippingState(mIsClipping);
#endif
  }
}
