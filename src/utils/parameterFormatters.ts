export const LOW_PASS_MIN_HZ = 200;
export const LOW_PASS_MAX_HZ = 20000;

export function clamp01(value: number): number {
  if (Number.isNaN(value)) {
    return 0;
  }
  if (value < 0) {
    return 0;
  }
  if (value > 1) {
    return 1;
  }
  return value;
}

export function clampParam(value: number): number {
  if (Number.isNaN(value)) {
    return 0;
  }
  if (value < 0) {
    return 0;
  }
  if (value > 100) {
    return 100;
  }
  return value;
}

export function mapLowPassParamToHz(parameterValue: number): number {
  const clamped = clampParam(parameterValue);
  const normalized = clamped / 100;
  return LOW_PASS_MIN_HZ * Math.pow(LOW_PASS_MAX_HZ / LOW_PASS_MIN_HZ, normalized);
}

export function formatHz(value: number): string {
  const hz = Math.max(0, Number.isFinite(value) ? value : 0);
  return `${Math.round(hz)} Hz`;
}

export function formatLowPassParamToHz(parameterValue: number): string {
  return formatHz(mapLowPassParamToHz(parameterValue));
}
