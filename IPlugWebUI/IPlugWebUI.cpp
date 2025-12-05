#include "IPlugWebUI.h"
#include "IPlug_include_in_plug_src.h"
#include "IPlugPaths.h"
#include <algorithm>
#include <cmath>
#include <cstdint>

namespace
{
constexpr double kRandNorm = 1.0 / 4294967296.0; // 1 / 2^32

inline double NextRandom(uint32_t& state)
{
  state ^= state << 13;
  state ^= state >> 17;
  state ^= state << 5;
  return static_cast<double>(state) * kRandNorm;
}
}

namespace
{
constexpr double kPi = 3.14159265358979323846;
constexpr double kMinQ = 0.0001;

inline void NormaliseBiquad(double& b0, double& b1, double& b2, double& a0, double& a1, double& a2)
{
  if (std::fabs(a0) < 1e-12)
  {
    b0 = 1.0;
    b1 = b2 = a1 = a2 = 0.0;
    return;
  }
  b0 /= a0;
  b1 /= a0;
  b2 /= a0;
  a1 /= a0;
  a2 /= a0;
}
}

double BiquadFilter::Process(double input, int channel)
{
  const size_t idx = static_cast<size_t>(channel > 0 ? 1 : 0);
  const double out = b0 * input + z1[idx];
  z1[idx] = b1 * input - a1 * out + z2[idx];
  z2[idx] = b2 * input - a2 * out;
  return out;
}

void BiquadFilter::Reset()
{
  z1.fill(0.0);
  z2.fill(0.0);
}

void BiquadFilter::SetLowShelf(double sampleRate, double freq, double gainDB, double q)
{
  if (sampleRate <= 0.0 || freq <= 0.0)
  {
    b0 = 1.0;
    b1 = b2 = a1 = a2 = 0.0;
    return;
  }

  const double A = std::pow(10.0, gainDB / 40.0);
  const double w0 = 2.0 * kPi * freq / sampleRate;
  const double cosw0 = std::cos(w0);
  const double sinw0 = std::sin(w0);
  const double alpha = sinw0 / (2.0 * std::max(q, kMinQ));
  const double beta = 2.0 * std::sqrt(A) * alpha;

  double a0 = (A + 1.0) + (A - 1.0) * cosw0 + beta;
  double a1Tmp = -2.0 * ((A - 1.0) + (A + 1.0) * cosw0);
  double a2Tmp = (A + 1.0) + (A - 1.0) * cosw0 - beta;
  double b0Tmp = A * ((A + 1.0) - (A - 1.0) * cosw0 + beta);
  double b1Tmp = 2.0 * A * ((A - 1.0) - (A + 1.0) * cosw0);
  double b2Tmp = A * ((A + 1.0) - (A - 1.0) * cosw0 - beta);

  b0 = b0Tmp;
  b1 = b1Tmp;
  b2 = b2Tmp;
  a1 = a1Tmp;
  a2 = a2Tmp;

  NormaliseBiquad(b0, b1, b2, a0, a1, a2);
}

void BiquadFilter::SetHighShelf(double sampleRate, double freq, double gainDB, double q)
{
  if (sampleRate <= 0.0 || freq <= 0.0)
  {
    b0 = 1.0;
    b1 = b2 = a1 = a2 = 0.0;
    return;
  }

  const double A = std::pow(10.0, gainDB / 40.0);
  const double w0 = 2.0 * kPi * freq / sampleRate;
  const double cosw0 = std::cos(w0);
  const double sinw0 = std::sin(w0);
  const double alpha = sinw0 / (2.0 * std::max(q, kMinQ));
  const double beta = 2.0 * std::sqrt(A) * alpha;

  double a0 = (A + 1.0) - (A - 1.0) * cosw0 + beta;
  double a1Tmp = 2.0 * ((A - 1.0) - (A + 1.0) * cosw0);
  double a2Tmp = (A + 1.0) - (A - 1.0) * cosw0 - beta;
  double b0Tmp = A * ((A + 1.0) + (A - 1.0) * cosw0 + beta);
  double b1Tmp = -2.0 * A * ((A - 1.0) + (A + 1.0) * cosw0);
  double b2Tmp = A * ((A + 1.0) + (A - 1.0) * cosw0 - beta);

  b0 = b0Tmp;
  b1 = b1Tmp;
  b2 = b2Tmp;
  a1 = a1Tmp;
  a2 = a2Tmp;

  NormaliseBiquad(b0, b1, b2, a0, a1, a2);
}

void BiquadFilter::SetPeaking(double sampleRate, double freq, double gainDB, double q)
{
  if (sampleRate <= 0.0 || freq <= 0.0)
  {
    b0 = 1.0;
    b1 = b2 = a1 = a2 = 0.0;
    return;
  }

  const double A = std::pow(10.0, gainDB / 40.0);
  const double w0 = 2.0 * kPi * freq / sampleRate;
  const double cosw0 = std::cos(w0);
  const double sinw0 = std::sin(w0);
  const double alpha = sinw0 / (2.0 * std::max(q, kMinQ));

  double a0 = 1.0 + alpha / A;
  double a1Tmp = -2.0 * cosw0;
  double a2Tmp = 1.0 - alpha / A;
  double b0Tmp = 1.0 + alpha * A;
  double b1Tmp = -2.0 * cosw0;
  double b2Tmp = 1.0 - alpha * A;

  b0 = b0Tmp;
  b1 = b1Tmp;
  b2 = b2Tmp;
  a1 = a1Tmp;
  a2 = a2Tmp;

  NormaliseBiquad(b0, b1, b2, a0, a1, a2);
}

void BiquadFilter::SetLowPass(double sampleRate, double freq, double resonance)
{
  if (sampleRate <= 0.0 || freq <= 0.0)
  {
    b0 = 1.0;
    b1 = b2 = a1 = a2 = 0.0;
    return;
  }

  const double w0 = 2.0 * kPi * freq / sampleRate;
  const double cosw0 = std::cos(w0);
  const double sinw0 = std::sin(w0);
  const double alpha = sinw0 / (2.0 * std::max(resonance, kMinQ));

  double a0 = 1.0 + alpha;
  double a1Tmp = -2.0 * cosw0;
  double a2Tmp = 1.0 - alpha;
  double b0Tmp = (1.0 - cosw0) * 0.5;
  double b1Tmp = 1.0 - cosw0;
  double b2Tmp = (1.0 - cosw0) * 0.5;

  b0 = b0Tmp;
  b1 = b1Tmp;
  b2 = b2Tmp;
  a1 = a1Tmp;
  a2 = a2Tmp;

  NormaliseBiquad(b0, b1, b2, a0, a1, a2);
}

IPlugWebUI::IPlugWebUI(const InstanceInfo& info)
: Plugin(info, MakeConfig(kNumParams, kNumPresets))
{
  GetParam(kParamDriveGain)->InitDouble("DriveGain", 0.2, 0.0, 1.0, 0.001, "");
  GetParam(kParamDriveVU)->InitDouble("DriveVU", 0.0, 0.0, 1.0, 0.001, "", IParam::kFlagCannotAutomate);
  GetParam(kParamDriveVU)->SetDisplayFunc([](double value, WDL_String& text) {
    text.SetFormatted(32, "%0.2f", value);
  });

  GetParam(kParamToneLowGain)->InitDouble("ToneLow", 0.0, -12.0, 12.0, 0.1, "dB");
  GetParam(kParamToneHighGain)->InitDouble("ToneHigh", 0.0, -12.0, 12.0, 0.1, "dB");
  GetParam(kParamToneMidQ)->InitDouble("ToneMidQ", 1.0, 0.5, 2.0, 0.01, "");
  GetParam(kParamMpcBits)->InitInt("MPCBits", 16, 1, 16, "bits");
  GetParam(kParamResampleRatio)->InitDouble("ResampleRatio", 1.0, 0.25, 4.0, 0.001, "x");
  GetParam(kParamWowAmount)->InitDouble("WowAmount", 0.02, 0.0, 0.1, 0.0001, "");
  GetParam(kParamWowRate)->InitDouble("WowRate", 0.2, 0.05, 5.0, 0.001, "Hz");
  GetParam(kParamFlutterAmount)->InitDouble("FlutterAmount", 0.01, 0.0, 0.05, 0.0001, "");
  GetParam(kParamFlutterRate)->InitDouble("FlutterRate", 8.0, 1.0, 40.0, 0.01, "Hz");
  GetParam(kParamNoiseLevel)->InitDouble("NoiseLevel", 0.0, 0.0, 100.0, 0.1, "%");
  GetParam(kParamLowPassCutoff)->InitDouble("LowPassCutoff", 14000.0, 200.0, 20000.0, 1.0, "Hz");
  GetParam(kParamLowPassResonance)->InitDouble("LowPassResonance", 0.2, 0.0, 1.0, 0.01, "");
  GetParam(kParamOutputGain)->InitDouble("Output", 0.0, -12.0, 12.0, 0.1, "dB");
  GetParam(kParamClipThreshold)->InitDouble("ClipThreshold", 1.0, 0.0, 1.0, 0.001, "");
  GetParam(kParamClipMode)->InitEnum("ClipMode", kClipModeTanh, kNumClipModes);
  GetParam(kParamClipMode)->SetDisplayText(kClipModeHard, "Hard");
  GetParam(kParamClipMode)->SetDisplayText(kClipModeSoft, "Soft");
  GetParam(kParamClipMode)->SetDisplayText(kClipModeTanh, "Tanh");
  GetParam(kParamClipSlope)->InitDouble("ClipSlope", 0.5, 0.0, 1.0, 0.001, "");
  GetParam(kParamPower)->InitBool("Power", true);

#ifdef DEBUG
  SetEnableDevTools(true);
#endif
  
  mEditorInitFunc = [&]()
  {
    LoadIndexHtml(__FILE__, GetBundleID());
    EnableScroll(false);
  };

  for (int i = 0; i < kNumParams; ++i)
    OnParamChange(i);
  
}

void IPlugWebUI::ProcessBlock(sample** inputs, sample** outputs, int nFrames)
{
  const int nIn = NInChansConnected();
  const int nOut = NOutChansConnected();
  const int channels = std::min(nIn, nOut);

  // === SMOOTH POWER/BYPASS ===
  // Smooth ramp to avoid clicks: 0.0 = fully bypassed, 1.0 = fully active
  const double targetRamp = mPowerOn ? 1.0 : 0.0;
  const double rampSpeed = 0.005; // Adjust for faster/slower fade (higher = faster)
  
  if (std::abs(mBypassRamp - targetRamp) < 0.0001)
  {
    mBypassRamp = targetRamp;
  }
  else
  {
    mBypassRamp += (targetRamp - mBypassRamp) * rampSpeed;
  }
  
  // If fully bypassed, just copy input to output
  if (mBypassRamp < 0.0001)
  {
    for (int c = 0; c < channels; ++c)
    {
      std::copy(inputs[c], inputs[c] + nFrames, outputs[c]);
    }
    return;
  }

  // Signal flow: Input → Drive/Transformer → Tone → Bit Reduction → Resampler → Wow/Flutter → Low-pass → Dry/Wet → Clipper → Output
  float drivePeak = 0.0f;

  // Cache drive gain smoothing (convert 0..1 → dB up to +24dB headroom)
  const double driveLinear = std::clamp(mDriveSmoother.Process(mDriveGain), 0.0, 1.0);
  const double preampDb = driveLinear * 30.0 - 4.0; // gently biased boost emulating transformer input
  const double driveGain = std::pow(10.0, preampDb / 20.0);

  // Transformer-inspired dynamic coefficients
  const double sagCoeff = std::clamp(0.992 - driveLinear * 0.028, 0.9, 0.999);
  const double biasFollowCoeff = 0.982;
  const double asymmetryBase = 0.02 + driveLinear * 0.09;
  const double evenEnhancer = 0.35 + driveLinear * 0.4;
  const double triodeAmount = 1.15 + driveLinear * 1.3;
  const double oddBlend = 0.45 + driveLinear * 0.25;
  const double finalSaturation = 0.95 + driveLinear * 1.2;

  // Gentle HF roll-off for transformer-like sheen
  constexpr double twoPi = 6.28318530717958647693;
  const double sampleRate = std::max(GetSampleRate(), 1.0);
  const double lowpassHz = std::clamp(16000.0 - driveLinear * 5500.0, 8000.0, 18000.0);
  const double lpAlpha = std::exp(-twoPi * lowpassHz / sampleRate);
  const double lpComp = 1.0 - lpAlpha;
  const int bits = std::clamp(mMpcBits, 1, 16);
  // bitLevels removed - was unused
  const double bitTransientGain = 3.0 + (16 - bits) * 0.45;
  const double bitTransientMix = 0.015 + (16 - bits) * 0.02;
  const double resampleRatio = std::clamp(mResampleRatio, 0.25, 4.0);
  const double aliasBase = std::clamp(0.05 + (1.0 - std::min(resampleRatio, 1.0)) * 0.6, 0.0, 0.8);
  const double wowDepthSamples = std::max(0.0, mWowAmount) * (0.0032 * sampleRate);
  // INCREASED FLUTTER DEPTH for more noticeable effect (was 0.0009, now 0.0025)
  const double flutterDepthSamples = std::max(0.0, mFlutterAmount) * (0.0025 * sampleRate);
  const double baseDelaySamples = std::max(12.0, sampleRate * 0.0012);
  const double noiseAmount = std::clamp(mNoiseLevel, 0.0, 1.0);

  for (int s = 0; s < nFrames; ++s)
  {
    const double wowValue = std::sin(mWowPhase);
    const double flutterValue = std::sin(mFlutterPhase);
    mWowPhase += mWowPhaseInc;
    if (mWowPhase > twoPi)
      mWowPhase -= twoPi;
    mFlutterPhase += mFlutterPhaseInc;
    if (mFlutterPhase > twoPi)
      mFlutterPhase -= twoPi;

    const double modDelay = baseDelaySamples + wowValue * wowDepthSamples + flutterValue * flutterDepthSamples;
    const double clampedDelay = std::clamp(modDelay, 1.0, static_cast<double>(kWowBufferSize - 3));
    // INCREASED FLUTTER PITCH INFLUENCE for more noticeable tape-like effect (was 0.05, now 0.18)
    const double pitchInfluence = wowValue * mWowAmount * 0.12 + flutterValue * mFlutterAmount * 0.18;

    for (int c = 0; c < channels; ++c)
    {
      double inputSample = inputs[c][s];
      double processed = inputSample;

      // === PREAMP / DRIVE ===
      processed *= driveGain;

      double rectified = std::fabs(processed);
      double& sagState = mTransformerSaturation[c];
      sagState = sagCoeff * sagState + (1.0 - sagCoeff) * rectified;

      const double sagCompression = 1.0 / (1.0 + sagState * (0.35 + driveLinear * 0.45));
      processed *= sagCompression;

      const double polarity = processed >= 0.0 ? 1.0 : -1.0;
      double biasTarget = asymmetryBase * sagState * polarity;
      double& biasState = mTransformerBias[c];
      biasState = biasFollowCoeff * biasState + (1.0 - biasFollowCoeff) * biasTarget;

      const double transformerInput = processed + biasState * (0.65 + driveLinear * 0.25);

      // Transformer-style asymmetric saturation encourages even harmonics
      const double evenStage = transformerInput + evenEnhancer * transformerInput * std::fabs(transformerInput);
      const double triodeStage = std::tanh(evenStage * triodeAmount);

      const double oddStageInput = transformerInput * (1.0 + driveLinear * 0.25);
      const double oddStage = oddStageInput - (oddStageInput * oddStageInput * oddStageInput) * (0.22 + driveLinear * 0.18);

      processed = oddBlend * triodeStage + (1.0 - oddBlend) * oddStage;
      processed = std::tanh(processed * finalSaturation);
      processed -= biasState * 0.55; // remove DC introduced by transformer bias

      // Single-pole low-pass for transformer coil roll-off
    double& lpState = mTransformerLowpass[c];
    lpState = lpAlpha * lpState + lpComp * processed;
    processed = lpState;

    drivePeak = std::max(drivePeak, static_cast<float>(std::fabs(processed)));

      // === TONE: Studer A800-inspired curve ===
      double toneProcessed = processed;
      toneProcessed = mToneLowShelf.Process(toneProcessed, c);
      toneProcessed = mToneMidBell.Process(toneProcessed, c);
      toneProcessed = mToneHighShelf.Process(toneProcessed, c);

      double detector = std::fabs(toneProcessed);
      double& env = mToneEnvelope[c];
      if (detector > env)
        env = mToneAttackCoeff * env + (1.0 - mToneAttackCoeff) * detector;
      else
        env = mToneReleaseCoeff * env + (1.0 - mToneReleaseCoeff) * detector;

      const double compression = 1.0 / (1.0 + env * (0.28 + driveLinear * 0.22));
      const double compressed = toneProcessed * compression;
      const double tapeSaturation = std::tanh(compressed * (1.25 + driveLinear * 0.35));
      processed = (1.0 - mToneSaturationMix) * compressed + mToneSaturationMix * tapeSaturation;

      // === MPC BIT REDUCTION ===
      // Apply bit reduction for all bit depths (including 16-bit)
      // Use proper bit depth calculation: for N bits, we have 2^N levels
      const double maxLevel = static_cast<double>((1 << bits) - 1);
      const double scaled = (processed + 1.0) * 0.5 * maxLevel; // Map -1..1 to 0..maxLevel
      const double quantized = (std::floor(scaled + 0.5) / maxLevel) * 2.0 - 1.0; // Quantize and map back to -1..1
      
      double transient = processed - mMpcPrevSample[c];
      double transientShape = std::tanh(transient * bitTransientGain);
      mMpcPrevSample[c] = quantized;
      processed = quantized + transientShape * bitTransientMix;

      // === RESAMPLER (aliasing sample & hold) ===
      double& phase = mResamplePhase[c];
      double& hold = mResampleHold[c];
      if (phase <= 0.0)
        hold = processed;

      double step = std::max(0.05, resampleRatio + pitchInfluence);
      phase += step;
      if (phase >= 1.0)
      {
        phase -= std::floor(phase);
        hold = processed;
      }

      const double aliasBlend = std::clamp(aliasBase + std::fabs(pitchInfluence) * 0.25, 0.0, 0.85);
      processed = hold + (processed - hold) * aliasBlend;

      // === WOW & FLUTTER DELAYED PLAYBACK ===
      auto& buffer = mWowBuffer[c];
      int& writeIdx = mWowWriteIndex[c];
      buffer[writeIdx] = processed;

      double readPos = static_cast<double>(writeIdx) - clampedDelay;
      while (readPos < 0.0)
        readPos += static_cast<double>(kWowBufferSize);

      const int idxA = static_cast<int>(readPos) % kWowBufferSize;
      const int idxB = (idxA + 1) % kWowBufferSize;
      const double frac = readPos - static_cast<double>(idxA);
      const double delayed = buffer[idxA] + (buffer[idxB] - buffer[idxA]) * frac;

      writeIdx = (writeIdx + 1) % kWowBufferSize;
      processed = delayed;

      // === LOW-PASS SMOOTHER ===
      processed = mLowPassFilter.Process(processed, c);

      // === VINYL NOISE GENERATOR (IMPROVED) ===
      if (noiseAmount > 0.0)
      {
        uint32_t& seed = mNoiseSeeds[c];
        const double white = NextRandom(seed) - 0.5;
        
        // Hiss component - more gentle high-frequency roll-off
        double& hissState = mNoiseFilter[c];
        hissState = 0.96 * hissState + 0.04 * white; // Softer filtering
        const double hissGain = noiseAmount * 0.25; // Reduced gain
        const double hiss = (0.8 * hissState + 0.2 * white) * hissGain;
        
        // Apply dedicated LPF to reduce harshness (around 6kHz)
        const double filteredHiss = mNoiseLowPassFilter.Process(hiss, c);

        // Crackle/Pop component - more realistic vinyl behavior
        double crackle = 0.0;
        double& env = mCrackleEnvelope[c];
        int& cooldown = mCrackleCooldown[c];
        if (cooldown <= 0)
        {
          // Much lower trigger probability for subtle vinyl effect
          const double triggerProbability = 0.000008 + noiseAmount * 0.00015;
          if (NextRandom(seed) < triggerProbability)
          {
            // REDUCED: Much lower intensity for crackle peaks (was 0.6-1.2, now 0.15-0.35)
            env = 0.15 + NextRandom(seed) * 0.2;
            // Longer cooldown for more spaced-out pops
            cooldown = std::max(1, static_cast<int>(sampleRate * (0.04 + NextRandom(seed) * 0.12)));
          }
        }
        else
        {
          --cooldown;
        }

        if (env > 0.0001)
        {
          const double pop = NextRandom(seed) * 2.0 - 1.0;
          // REDUCED: Much lower crackle gain (was 0.3-1.0, now 0.08-0.25)
          crackle = pop * env * (0.08 + noiseAmount * 0.17);
          // Slower decay for more natural sound
          env *= 0.65 + noiseAmount * 0.15;
          if (env < 0.00005)
            env = 0.0;
        }

        // Apply LPF to crackle as well to reduce harshness
        const double filteredCrackle = mNoiseLowPassFilter.Process(crackle, c);
        
        processed += filteredHiss + filteredCrackle;
      }

      // DRY/WET removed - now 100% wet with output gain control

      // === CLIPPER ===
      const double threshold = std::max(0.0001, mClipThreshold);
      double clipped = processed;
      if (mClipMode == kClipModeHard)
      {
        clipped = std::max(-threshold, std::min(processed, threshold));
      }
      else if (mClipMode == kClipModeSoft)
      {
        const double slope = std::clamp(mClipSlope, 0.0, 1.0);
        const double softLimit = threshold * (1.0 + slope);
        if (processed > threshold)
        {
          clipped = threshold + (processed - threshold) / (1.0 + slope * (processed - threshold));
          clipped = std::min(clipped, softLimit);
        }
        else if (processed < -threshold)
        {
          clipped = -threshold + (processed + threshold) / (1.0 + slope * (-processed - threshold));
          clipped = std::max(clipped, -softLimit);
        }
      }
      else // tanh
      {
        clipped = threshold * std::tanh(processed / threshold);
      }

      // Apply output gain and smooth bypass crossfade
      const double wetSignal = clipped;
      const double drySignal = inputSample;
      const double mixedOutput = drySignal * (1.0 - mBypassRamp) + wetSignal * mBypassRamp;
      
      // Apply output gain to final mixed signal
      const double finalOutput = mixedOutput * mOutputGainLinear;

      outputs[c][s] = static_cast<sample>(finalOutput);

      (void) c; // VU metering already captured after drive stage
    }

    // pass-through additional outputs if any
    for (int c = channels; c < nOut; ++c)
      outputs[c][s] = 0.0;
  }

  // Update peak with decay (approx 300ms)
  const float decayFactor = 0.9f;
  mLastPeak = std::max(drivePeak, mLastPeak * decayFactor);

  SendDriveVUMeter(mLastPeak);
}

void IPlugWebUI::OnReset()
{
  auto sr = GetSampleRate();
  mOscillator.SetSampleRate(sr);
  mDriveSmoother.SetSmoothTime(20., sr);
  mDriveSmoother.SetValue(mDriveGain);
  mLastPeak = 0.0f;
  mDriveVUQueued.store(false, std::memory_order_release);
  mPendingDriveVU.store(0.0f, std::memory_order_release);
  mTransformerSaturation.fill(0.0);
  mTransformerBias.fill(0.0);
  mTransformerLowpass.fill(0.0);
  mToneEnvelope.fill(0.0);

  const double sampleRate = std::max(sr, 1.0);
  const double attackTime = 0.004;  // ~4ms attack for tape compression
  const double releaseTime = 0.12;  // ~120ms release mimicking tape recovery
  mToneAttackCoeff = std::exp(-1.0 / (attackTime * sampleRate));
  mToneReleaseCoeff = std::exp(-1.0 / (releaseTime * sampleRate));
  mToneSaturationMix = 0.32;

  mToneLowShelf.Reset();
  mToneHighShelf.Reset();
  mToneMidBell.Reset();
  UpdateToneFilters();
  mLowPassFilter.Reset();
  UpdateLowPassFilter();
  
  // Initialize dedicated noise LPF at 6kHz for softer vinyl sound
  mNoiseLowPassFilter.Reset();
  mNoiseLowPassFilter.SetLowPass(sampleRate, 6000.0, 0.7);

  mResamplePhase.fill(0.0);
  mResampleHold.fill(0.0);
  mMpcPrevSample.fill(0.0);
  mNoiseFilter.fill(0.0);
  mCrackleEnvelope.fill(0.0);
  mCrackleCooldown.fill(0);
  const uint32_t baseSeed = static_cast<uint32_t>(std::max(1.0, sr)) ^ 0x9E3779B9u;
  mNoiseSeeds[0] ^= (baseSeed | 1u);
  mNoiseSeeds[1] ^= ((baseSeed << 16) | 1u);
  for (auto& seed : mNoiseSeeds)
  {
    if (seed == 0)
      seed = 1u;
  }

  for (auto& buffer : mWowBuffer)
    buffer.fill(0.0);
  mWowWriteIndex.fill(0);
  mWowPhase = 0.0;
  mFlutterPhase = 0.0;
  RefreshWowFlutterIncrements();
}

void IPlugWebUI::SendDriveVUMeter(float linearValue)
{
  const float clamped = std::clamp(linearValue, 0.0f, 1.0f);
  mPendingDriveVU.store(clamped, std::memory_order_release);
  mDriveVUQueued.store(true, std::memory_order_release);
}

void IPlugWebUI::UpdateToneFilters()
{
  const double sampleRate = std::max(GetSampleRate(), 1.0);
  const double lowShelfGain = 1.5 + mToneLowGain;
  const double lowShelfQ = 0.74;
  const double highShelfGain = -1.75 + mToneHighGain;
  const double highShelfQ = 0.8;
  const double midGainDb = 0.6 + (mToneMidQ - 1.0) * 2.0;
  const double midQ = std::clamp(1.1 + (mToneMidQ - 1.0) * 0.7, 0.4, 3.0);

  mToneLowShelf.SetLowShelf(sampleRate, 110.0, lowShelfGain, lowShelfQ);
  mToneHighShelf.SetHighShelf(sampleRate, 12500.0, highShelfGain, highShelfQ);
  mToneMidBell.SetPeaking(sampleRate, 3800.0, midGainDb, midQ);
}

void IPlugWebUI::UpdateLowPassFilter()
{
  const double sampleRate = std::max(GetSampleRate(), 1.0);
  const double nyquist = sampleRate * 0.5;
  const double cutoff = std::clamp(mLowPassCutoff, 20.0, nyquist * 0.98);
  const double resonance = std::clamp(mLowPassResonance, 0.3, 8.0);
  mLowPassFilter.SetLowPass(sampleRate, cutoff, resonance);
}

void IPlugWebUI::RefreshWowFlutterIncrements()
{
  const double sampleRate = std::max(GetSampleRate(), 1.0);
  const double wowRate = std::clamp(mWowRate, 0.05, 5.0);
  const double flutterRate = std::clamp(mFlutterRate, 1.0, 40.0);
  mWowPhaseInc = (2.0 * kPi * wowRate) / sampleRate;
  mFlutterPhaseInc = (2.0 * kPi * flutterRate) / sampleRate;
}

void IPlugWebUI::OnIdle()
{
  Plugin::OnIdle();
#if IPLUG_EDITOR
  if (!mUIOpen.load(std::memory_order_acquire))
    return;

  if (!mDriveVUQueued.exchange(false, std::memory_order_acq_rel))
    return;

  const float value = mPendingDriveVU.load(std::memory_order_acquire);

  WDL_String js;
  js.SetFormatted(128, "if(window.__updateDriveVU){window.__updateDriveVU(%f)}", value);
  EvaluateJavaScript(js.Get());
  GetParam(kParamDriveVU)->Set(static_cast<double>(value));
#endif
}

#if IPLUG_EDITOR
void IPlugWebUI::OnUIOpen()
{
  Plugin::OnUIOpen();
  mUIOpen.store(true, std::memory_order_release);
  mDriveVUQueued.store(true, std::memory_order_release);
}

void IPlugWebUI::OnUIClose()
{
  mUIOpen.store(false, std::memory_order_release);
  Plugin::OnUIClose();
}
#endif

bool IPlugWebUI::OnMessage(int msgTag, int ctrlTag, int dataSize, const void* pData)
{
  if (msgTag == kMsgTagButton1)
    Resize(512, 335);
  else if(msgTag == kMsgTagButton2)
    Resize(1024, 335);
  else if(msgTag == kMsgTagButton3)
    Resize(1024, 768);
  else if (msgTag == kMsgTagBinaryTest)
  {
    // Use the data parameter to avoid warning
    (void)pData;
    DBGMSG("Data Size %i bytes\n",  dataSize);
    // Byte inspection code commented out - enable if needed for debugging
    // auto uint8Data = reinterpret_cast<const uint8_t*>(pData);
    // DBGMSG("Byte values: %i, %i, %i, %i\n", uint8Data[0], uint8Data[1], uint8Data[2], uint8Data[3]);
  }

  return false;
}

void IPlugWebUI::OnParamChange(int paramIdx)
{
  switch (paramIdx)
  {
    case kParamDriveGain:
      mDriveGain = GetParam(kParamDriveGain)->Value();
      mDriveSmoother.SetValue(mDriveGain);
      break;
  case kParamDriveVU: break; // read-only meter updated from audio thread
    case kParamToneLowGain:
      mToneLowGain = GetParam(kParamToneLowGain)->Value();
      UpdateToneFilters();
      break;
    case kParamToneHighGain:
      mToneHighGain = GetParam(kParamToneHighGain)->Value();
      UpdateToneFilters();
      break;
    case kParamToneMidQ:
      mToneMidQ = GetParam(kParamToneMidQ)->Value();
      UpdateToneFilters();
      break;
    case kParamMpcBits:
      mMpcBits = GetParam(kParamMpcBits)->Int();
      break;
    case kParamResampleRatio:
      mResampleRatio = GetParam(kParamResampleRatio)->Value();
      break;
    case kParamWowAmount:
      mWowAmount = GetParam(kParamWowAmount)->Value();
      break;
    case kParamWowRate:
      mWowRate = GetParam(kParamWowRate)->Value();
      RefreshWowFlutterIncrements();
      break;
    case kParamFlutterAmount:
      mFlutterAmount = GetParam(kParamFlutterAmount)->Value();
      break;
    case kParamFlutterRate:
      mFlutterRate = GetParam(kParamFlutterRate)->Value();
      RefreshWowFlutterIncrements();
      break;
    case kParamNoiseLevel:
      mNoiseLevel = GetParam(kParamNoiseLevel)->Value() * 0.01;
      break;
    case kParamLowPassCutoff:
      mLowPassCutoff = GetParam(kParamLowPassCutoff)->Value();
      UpdateLowPassFilter();
      break;
    case kParamLowPassResonance:
      mLowPassResonance = GetParam(kParamLowPassResonance)->Value();
      UpdateLowPassFilter();
      break;
    case kParamOutputGain:
      mOutputGainDB = GetParam(kParamOutputGain)->Value();
      mOutputGainLinear = std::pow(10.0, mOutputGainDB / 20.0);
      break;
    case kParamClipThreshold: mClipThreshold = GetParam(kParamClipThreshold)->Value(); break;
    case kParamClipMode: mClipMode = GetParam(kParamClipMode)->Int(); break;
    case kParamClipSlope: mClipSlope = GetParam(kParamClipSlope)->Value(); break;
    case kParamPower: mPowerOn = GetParam(kParamPower)->Bool(); break;
    default: break;
  }
}

void IPlugWebUI::ProcessMidiMsg(const IMidiMsg& msg)
{
  TRACE;
  msg.PrintMsg();
  SendMidiMsg(msg);
}

bool IPlugWebUI::CanNavigateToURL(const char* url)
{
  DBGMSG("Navigating to URL %s\n", url);
  return true;
}

bool IPlugWebUI::OnCanDownloadMIMEType(const char* mimeType)
{
  return std::string_view(mimeType) != "text/html";
}

void IPlugWebUI::OnDownloadedFile(const char* path)
{
  WDL_String str;
  str.SetFormatted(64, "Downloaded file to %s\n", path);
  LoadHTML(str.Get());
}

void IPlugWebUI::OnFailedToDownloadFile(const char* path)
{
  WDL_String str;
  str.SetFormatted(64, "Faild to download file to %s\n", path);
  LoadHTML(str.Get());
}

void IPlugWebUI::OnGetLocalDownloadPathForFile(const char* fileName, WDL_String& localPath)
{
  DesktopPath(localPath);
  localPath.AppendFormatted(MAX_WIN32_PATH_LEN, "/%s", fileName);
}
