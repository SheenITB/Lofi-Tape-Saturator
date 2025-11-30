interface Window {
  IPLUG?: {
    setParameterValue: (id: string | number, value: number) => void;
    getParameterValue?: (id: string | number) => number | boolean;
    setParameterValueNormalized?: (id: string | number, value: number) => void;
    setParameterNormalizedValue?: (id: string | number, value: number) => void;
    beginParameterChangeGesture?: (id: string | number) => void;
    endParameterChangeGesture?: (id: string | number) => void;
  };
  IPlugSendMsg?: (message: {
    msg: string;
    paramIdx?: number;
    value?: number;
    msgTag?: number;
    ctrlTag?: number;
    data?: string;
  }) => void;
  updateParameter?: (name: string, value: number | boolean) => void;
  updateVUMeter?: (level: number) => void;
  updateClipping?: (isClipping: boolean) => void;
  __updateDriveVU?: (level: number) => void;
}
