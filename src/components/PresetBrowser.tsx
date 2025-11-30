import { useState, useEffect, useLayoutEffect, useRef, type RefObject, type CSSProperties } from 'react';
import { formatLowPassParamToHz } from '../utils/parameterFormatters';

export interface Preset {
  name: string;
  date: string;
  category?: string;
  description?: string;
  parameters: {
    drive: number;
    tone: number;
    mpc: number;
    wow: number;
    noise: number;
    flutter: number;
    resampler: number;
    lowPass: number;
    outputGain: number;
    clipperEnabled?: boolean;
    clipperMode: number;
    antiAlias?: boolean;
  };
}

interface PresetBrowserProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef?: RefObject<HTMLElement | null>;
  fallbackAnchorRef?: RefObject<HTMLElement | null>;
  anchorVersion?: number;
  currentParameters: {
    drive: number;
    tone: number;
    mpc: number;
    wow: number;
    noise: number;
    flutter: number;
    resampler: number;
    lowPass: number;
    outputGain: number;
    clipperEnabled?: boolean;
    clipperMode: number;
    antiAlias?: boolean;
  };
  onLoadPreset: (preset: Preset) => void;
}

const ensureAntiAliasFlag = (preset: Preset): Preset => {
  if (typeof preset.parameters.antiAlias === 'undefined') {
    preset.parameters.antiAlias = false;
  }
  if (typeof preset.parameters.clipperEnabled === 'undefined') {
    preset.parameters.clipperEnabled = false;
  }
  if (typeof preset.parameters.outputGain !== 'number') {
    preset.parameters.outputGain = 67;
  }
  return preset;
};

// Factory presets
const FACTORY_PRESETS: Preset[] = [
  {
    name: "Warm Vintage",
    date: "Factory",
    category: "Factory",
    parameters: {
      drive: 35,
      tone: 60,
      mpc: 65,
      wow: 25,
      noise: 20,
      flutter: 30,
          resampler: 49,
          lowPass: 68,
          outputGain: 78,
      clipperMode: 0,
      antiAlias: true
    }
  },
  {
    name: "Lo-Fi Crunch",
    date: "Factory",
    category: "Factory",
    parameters: {
      drive: 75,
      tone: 45,
      mpc: 35,
      wow: 50,
      noise: 45,
      flutter: 60,
          resampler: 62,
          lowPass: 82,
          outputGain: 84,
      clipperMode: 100,
      antiAlias: true
    }
  },
  {
    name: "Subtle Warmth",
    date: "Factory",
    category: "Factory",
    parameters: {
      drive: 20,
      tone: 55,
      mpc: 85,
      wow: 10,
      noise: 8,
      flutter: 15,
  resampler: 95,
  lowPass: 90,
  outputGain: 40,
      clipperMode: 0,
      antiAlias: true
    }
  },
  {
    name: "Heavy Saturation",
    date: "Factory",
    category: "Factory",
    parameters: {
      drive: 85,
      tone: 40,
      mpc: 50,
      wow: 35,
      noise: 30,
      flutter: 45,
          resampler: 58,
          lowPass: 75,
          outputGain: 66,
      clipperMode: 100,
      antiAlias: true
    }
  },
  {
    name: "Cassette Deck",
    date: "Factory",
    category: "Factory",
    parameters: {
      drive: 45,
      tone: 50,
      mpc: 45,
      wow: 40,
      noise: 35,
      flutter: 50,
          resampler: 38,
          lowPass: 48,
          outputGain: 80,
      clipperMode: 50,
      antiAlias: true
    }
  },
  {
    name: "MPC Vintage",
    date: "Factory",
    category: "Factory",
    parameters: {
      drive: 35,
      tone: 50,
      mpc: 40,
      wow: 5,
      noise: 10,
      flutter: 5,
  resampler: 65,
  lowPass: 75,
  outputGain: 70,
      clipperMode: 50,
      antiAlias: true
    }
  }
];

interface PresetGroup {
  title: string;
  description: string;
  presets: Preset[];
}

const STYLE_PRESET_GROUPS: PresetGroup[] = [
  {
    title: "MPC Style",
    description: "Crunchy converters and transient punch inspired by classic samplers.",
    presets: [
      {
        name: "MPC 3000 Punch",
        date: "Style",
        category: "MPC Style",
        description: "Focused midrange punch with subtle tape wobble.",
        parameters: {
          drive: 55,
          tone: 52,
          mpc: 30,
          wow: 8,
          noise: 18,
          flutter: 10,
          resampler: 60,
          lowPass: 72,
          outputGain: 78,
          clipperMode: 68,
          antiAlias: true
        }
      },
      {
        name: "MPC 60 Dust",
        date: "Style",
        category: "MPC Style",
        description: "Vintage grit with filtered highs and vinyl hiss.",
        parameters: {
          drive: 48,
          tone: 44,
          mpc: 25,
          wow: 12,
          noise: 28,
          flutter: 14,
          resampler: 55,
          lowPass: 62,
          outputGain: 82,
          clipperMode: 62,
          antiAlias: true
        }
      }
    ]
  },
  {
    title: "Tape Style",
    description: "Saturated heads, rolling low end, and mechanical wow/flutter.",
    presets: [
      {
        name: "HiFi Tape 15ips",
        date: "Style",
        category: "Tape Style",
        description: "Smooth harmonic drive with open highs.",
        parameters: {
          drive: 42,
          tone: 58,
          mpc: 70,
          wow: 18,
          noise: 22,
          flutter: 20,
          resampler: 85,
          lowPass: 88,
          outputGain: 65,
          clipperMode: 34,
          antiAlias: true
        }
      },
      {
        name: "Cassette Type II",
        date: "Style",
        category: "Tape Style",
        description: "Narrow band cassette tone with extra wobble.",
        parameters: {
          drive: 50,
          tone: 47,
          mpc: 55,
          wow: 32,
          noise: 40,
          flutter: 36,
          resampler: 70,
          lowPass: 64,
          outputGain: 74,
          clipperMode: 52,
          antiAlias: true
        }
      }
    ]
  },
  {
    title: "Lo-Fi Style",
    description: "Dusty textures, reduced fidelity, and detuned vibes.",
    presets: [
      {
        name: "Bedroom Demo",
        date: "Style",
        category: "Lo-Fi Style",
        description: "Soft saturation with heavy tone roll-off.",
        parameters: {
          drive: 38,
          tone: 36,
          mpc: 45,
          wow: 28,
          noise: 38,
          flutter: 27,
          resampler: 62,
          lowPass: 58,
          outputGain: 68,
          clipperMode: 40,
          antiAlias: true
        }
      },
      {
        name: "Walkman Memories",
        date: "Style",
        category: "Lo-Fi Style",
        description: "Tight mono feel with strong flutter and hiss.",
        parameters: {
          drive: 46,
          tone: 40,
          mpc: 35,
          wow: 36,
          noise: 44,
          flutter: 42,
          resampler: 54,
          lowPass: 52,
          outputGain: 80,
          clipperMode: 48,
          antiAlias: true
        }
      }
    ]
  },
  {
    title: "Hip-Hop Style",
    description: "Thick subs, punchy clippers, and aggressive character.",
    presets: [
      {
        name: "Golden Era",
        date: "Style",
        category: "Hip-Hop Style",
        description: "Round low-end and crunchy top for sample-based beats.",
        parameters: {
          drive: 62,
          tone: 48,
          mpc: 38,
          wow: 16,
          noise: 24,
          flutter: 18,
          resampler: 66,
          lowPass: 60,
          outputGain: 72,
          clipperMode: 76,
          antiAlias: true
        }
      },
      {
        name: "Trap Glue",
        date: "Style",
        category: "Hip-Hop Style",
        description: "Focused saturation with high-frequency fizz for 808s.",
        parameters: {
          drive: 70,
          tone: 55,
          mpc: 48,
          wow: 12,
          noise: 18,
          flutter: 14,
          resampler: 72,
          lowPass: 74,
          outputGain: 66,
          clipperMode: 85,
          antiAlias: true
        }
      }
    ]
  },
  {
    title: "Boom Bap Style",
    description: "Dirty drums, chopped samples, and saturated preamps.",
    presets: [
      {
        name: "Street Cypher",
        date: "Style",
        category: "Boom Bap Style",
        description: "Knocky drums with narrowed bandwidth.",
        parameters: {
          drive: 68,
          tone: 42,
          mpc: 32,
          wow: 22,
          noise: 32,
          flutter: 24,
          resampler: 49,
          lowPass: 68,
          outputGain: 78,
          clipperMode: 88,
          antiAlias: true
        }
      },
      {
        name: "Basement Tape",
        date: "Style",
        category: "Boom Bap Style",
        description: "Saturated mids with strong cassette coloration.",
        parameters: {
          drive: 64,
          tone: 46,
          mpc: 28,
          wow: 30,
          noise: 36,
          flutter: 34,
          resampler: 59,
          lowPass: 62,
          outputGain: 78,
          clipperMode: 72,
          antiAlias: true
        }
      }
    ]
  }
];

FACTORY_PRESETS.forEach(ensureAntiAliasFlag);
STYLE_PRESET_GROUPS.forEach(group => {
  group.presets.forEach(ensureAntiAliasFlag);
});

const toBitDepth = (value: number): number => {
  const clamped = Math.min(100, Math.max(0, value));
  const depth = 16 - (clamped / 100) * 12;
  return Math.max(4, Math.min(16, Math.round(depth)));
};

const toOutputGainDb = (value: number): string => {
  const clamped = Math.min(100, Math.max(0, value));
  const normalized = clamped / 100;
  const db = -24 + normalized * 36;
  return `${db.toFixed(1)} dB`;
};

export function PresetBrowser({ isOpen, onClose, anchorRef, fallbackAnchorRef, anchorVersion = 0, currentParameters, onLoadPreset }: PresetBrowserProps) {
  const [userPresets, setUserPresets] = useState<Preset[]>([]);
  const [newPresetName, setNewPresetName] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [activeTab, setActiveTab] = useState<'factory' | 'styles' | 'user'>('styles');
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ top: number; left: number; width: number; height: number } | null>(null);

  const buildPresetKey = (preset: Preset) => `${preset.category ?? 'Default'}::${preset.name}`;

  // Load user presets from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('itb-user-presets');
    if (saved) {
      try {
        const parsed: Preset[] = JSON.parse(saved);
        setUserPresets(parsed.map(preset => ensureAntiAliasFlag({ ...preset, parameters: { ...preset.parameters } })));
      } catch (e) {
        console.error('Failed to load presets:', e);
      }
    }
  }, []);

  // Save user presets to localStorage
  const saveToStorage = (presets: Preset[]) => {
    localStorage.setItem('itb-user-presets', JSON.stringify(presets));
  };

  const handleSavePreset = () => {
    if (!newPresetName.trim()) return;

    const newPreset: Preset = {
      name: newPresetName.trim(),
      date: new Date().toLocaleDateString('it-IT'),
      category: 'User',
      parameters: { ...currentParameters }
    };

    const updated = [...userPresets, ensureAntiAliasFlag(newPreset)];
    setUserPresets(updated);
    saveToStorage(updated);
    setSelectedPreset(newPreset);
    setActiveTab('user');
    setNewPresetName('');
    setShowSaveDialog(false);
  };

  const handleDeletePreset = (index: number) => {
    const updated = userPresets.filter((_, i) => i !== index);
    setUserPresets(updated);
    saveToStorage(updated);
    if (selectedPreset && buildPresetKey(userPresets[index]) === buildPresetKey(selectedPreset)) {
      setSelectedPreset(null);
    }
  };

  const handleLoadPreset = (preset: Preset) => {
    setSelectedPreset(preset);
    onLoadPreset(preset);
  };

  const tabs: { key: 'factory' | 'styles' | 'user'; label: string }[] = [
    { key: 'factory', label: 'Factory' },
    { key: 'styles', label: 'Styles' },
    { key: 'user', label: 'User' }
  ];

  const renderPresetRow = (
    preset: Preset,
    key: string,
    options?: { showDescription?: boolean; deleteIndex?: number }
  ) => {
    const isSelected = selectedPreset ? buildPresetKey(selectedPreset) === buildPresetKey(preset) : false;

    return (
      <div
        key={key}
        className={options?.deleteIndex !== undefined ? 'flex items-center gap-1' : 'block'}
      >
        <button
          onClick={() => handleLoadPreset(preset)}
          className="w-full text-left px-1.5 py-1 transition-all hover:brightness-125"
          style={{
            fontFamily: 'Arial, sans-serif',
            fontSize: '6px',
            color: isSelected ? '#ffd680' : '#b89060',
            background: isSelected
              ? 'linear-gradient(90deg, #3a2818, #2a1810)'
              : 'linear-gradient(90deg, #2a2218, #1a1510)',
            boxShadow: isSelected
              ? 'inset 0 1px 3px rgba(255,180,80,0.3), 0 1px 2px rgba(0,0,0,0.5)'
              : 'inset 0 1px 2px rgba(0,0,0,0.6)',
            border: '1px solid #3a3020',
            borderRadius: '1px'
          }}
        >
          <div className="flex justify-between items-center">
            <span style={{ fontWeight: 'bold' }}>{preset.name}</span>
            <span style={{ fontSize: '5px', opacity: 0.6 }}>{preset.date}</span>
          </div>
          {options?.showDescription && preset.description && (
            <div
              style={{
                marginTop: '2px',
                fontFamily: 'Georgia, serif',
                fontSize: '5px',
                color: '#8a7050'
              }}
            >
              {preset.description}
            </div>
          )}
        </button>
        {options?.deleteIndex !== undefined && (
          <button
            onClick={() => handleDeletePreset(options.deleteIndex!)}
            className="px-1 py-0.5 transition-all hover:brightness-125"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '6px',
              color: '#ff6060',
              background: 'linear-gradient(180deg, #4a2020, #3a1010)',
              boxShadow: 'inset 0 1px 2px rgba(255,100,100,0.2), 0 1px 2px rgba(0,0,0,0.5)',
              border: '1px solid #5a3030',
              borderRadius: '1px'
            }}
            title="Delete preset"
          >
            ✕
          </button>
        )}
      </div>
    );
  };

  const renderFactoryContent = () => (
    <div className="flex flex-col" style={{ gap: '6px', height: '100%' }}>
      <div
        className="mb-1.5 pb-0.5"
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: '7px',
          color: '#d4a574',
          textShadow: '0 1px 2px rgba(0,0,0,0.8)',
          letterSpacing: '0.1em',
          borderBottom: '1px solid #3a3020'
        }}
      >
        ★ FACTORY PRESETS
      </div>
      <div className="space-y-0.5 overflow-y-auto pr-1" style={{ maxHeight: '100%' }}>
        {FACTORY_PRESETS.map((preset, index) =>
          renderPresetRow(preset, `factory-${index}`)
        )}
      </div>
    </div>
  );

  const renderStylesContent = () => (
    <div className="space-y-1.5 overflow-y-auto pr-1" style={{ maxHeight: '100%' }}>
      {STYLE_PRESET_GROUPS.map((group, groupIndex) => (
        <div
          key={`style-group-${groupIndex}`}
          className="p-1.5"
          style={{
            background: 'linear-gradient(145deg, #241b13, #18100a)',
            border: '1px solid #3a2c20',
            borderRadius: '1px',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6)'
          }}
        >
          <div
            className="mb-0.5"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '7px',
              color: '#d4a574',
              letterSpacing: '0.12em',
              textShadow: '0 1px 2px rgba(0,0,0,0.8)'
            }}
          >
            {group.title.toUpperCase()}
          </div>
          <div
            className="mb-1"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '5px',
              color: '#8a7050',
              opacity: 0.9
            }}
          >
            {group.description}
          </div>
          <div className="space-y-0.5">
            {group.presets.map((preset, presetIndex) =>
              renderPresetRow(preset, `style-${groupIndex}-${presetIndex}`, { showDescription: true })
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderUserContent = () => (
    <div className="flex flex-col" style={{ height: '100%' }}>
      <div
        className="mb-1.5 pb-0.5 flex justify-between items-center"
        style={{
          fontFamily: 'Georgia, serif',
          fontSize: '7px',
          color: '#d4a574',
          textShadow: '0 1px 2px rgba(0,0,0,0.8)',
          letterSpacing: '0.1em',
          borderBottom: '1px solid #3a3020'
        }}
      >
        <span>♪ USER PRESETS</span>
        <button
          onClick={() => setShowSaveDialog(!showSaveDialog)}
          className="px-1.5 py-0.5 transition-all hover:brightness-125"
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: '6px',
            color: '#3a2010',
            background: 'linear-gradient(180deg, #c8a870, #a88850)',
            boxShadow: 'inset 0 1px 2px rgba(255,220,180,0.7), 0 1px 2px rgba(0,0,0,0.5)',
            border: '1px solid #8a6830',
            borderRadius: '1px'
          }}
        >
          + NEW
        </button>
      </div>

      {showSaveDialog && (
        <div
          className="mb-1.5 p-1.5"
          style={{
            background: 'linear-gradient(145deg, #3a2818, #2a1810)',
            border: '1px solid #5a4830',
            borderRadius: '1px'
          }}
        >
          <input
            type="text"
            value={newPresetName}
            onChange={(e) => setNewPresetName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSavePreset()}
            placeholder="Enter preset name..."
            className="w-full px-1.5 py-0.5 mb-1"
            style={{
              fontFamily: 'Arial, sans-serif',
              fontSize: '6px',
              color: '#ffd680',
              background: 'linear-gradient(145deg, #1a1510, #0a0a08)',
              border: '1px solid #3a3020',
              borderRadius: '1px',
              outline: 'none',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.8)'
            }}
            autoFocus
          />
          <div className="flex gap-1">
            <button
              onClick={handleSavePreset}
              disabled={!newPresetName.trim()}
              className="flex-1 px-1.5 py-0.5 transition-all hover:brightness-125 disabled:opacity-50"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '6px',
                color: '#3a2010',
                background: 'linear-gradient(180deg, #88c870, #68a850)',
                boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5), 0 1px 2px rgba(0,0,0,0.5)',
                border: '1px solid #5a8a30',
                borderRadius: '1px'
              }}
            >
              SAVE
            </button>
            <button
              onClick={() => {
                setShowSaveDialog(false);
                setNewPresetName('');
              }}
              className="flex-1 px-1.5 py-0.5 transition-all hover:brightness-125"
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '6px',
                color: '#ffd680',
                background: 'linear-gradient(180deg, #3a3020, #2a2010)',
                boxShadow: 'inset 0 1px 2px rgba(255,220,180,0.2), 0 1px 2px rgba(0,0,0,0.5)',
                border: '1px solid #4a4030',
                borderRadius: '1px'
              }}
            >
              CANCEL
            </button>
          </div>
        </div>
      )}

      <div className="space-y-0.5 overflow-y-auto pr-1" style={{ flex: 1 }}>
        {userPresets.length === 0 ? (
          <div
            className="text-center py-2"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '6px',
              color: '#6a5040',
              fontStyle: 'italic'
            }}
          >
            No user presets saved yet
          </div>
        ) : (
          userPresets.map((preset, index) =>
            renderPresetRow(preset, `user-${index}`, { deleteIndex: index })
          )
        )}
      </div>
    </div>
  );

  useEffect(() => {
    if (activeTab !== 'user' && showSaveDialog) {
      setShowSaveDialog(false);
    }
  }, [activeTab, showSaveDialog]);

  useEffect(() => {
    if (!isOpen) {
      setDropdownPosition(null);
    }
  }, [isOpen]);

  const [anchors, setAnchors] = useState<{ primary: HTMLElement | null; fallback: HTMLElement | null }>({
    primary: anchorRef?.current ?? null,
    fallback: fallbackAnchorRef?.current ?? null
  });

  useEffect(() => {
    const nextPrimary = anchorRef?.current ?? null;
    const nextFallback = fallbackAnchorRef?.current ?? null;

    setAnchors(previous => {
      if (previous.primary === nextPrimary && previous.fallback === nextFallback) {
        return previous;
      }
      return { primary: nextPrimary, fallback: nextFallback };
    });
  }, [anchorRef, fallbackAnchorRef, anchorVersion]);

  const primaryAnchor = anchors.primary;
  const fallbackAnchor = anchors.fallback;

  useLayoutEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const anchorNode = primaryAnchor ?? fallbackAnchor;

      if (!anchorNode || !dropdownRef.current) {
        setDropdownPosition(null);
        return;
      }

  const anchorRect = anchorNode.getBoundingClientRect();
      const margin = 12;
      const anchorWidth = anchorRect.width || 1;
      const widthBoostRatio = 0.55; // scales the dropdown width relative to the badge
      const targetWidth = Math.max(
        260,
        Math.min(anchorWidth + anchorWidth * widthBoostRatio, window.innerWidth - margin * 2)
      );
      const availableBelow = window.innerHeight - anchorRect.bottom - margin;
      const targetHeight = Math.max(260, Math.min(availableBelow > 0 ? availableBelow : window.innerHeight - margin * 2, 420));

  const offsetRatio = 0.88;
  const offsetPixels = 37.7952755906 - 7.55905511812;
  const rawLeft = anchorRect.left + window.scrollX + anchorWidth * offsetRatio - offsetPixels;
      const rawTop = anchorRect.bottom + window.scrollY + 8;

      const clampedLeft = Math.max(window.scrollX + margin, Math.min(rawLeft, window.scrollX + window.innerWidth - targetWidth - margin));
      const clampedTop = Math.max(window.scrollY + margin, Math.min(rawTop, window.scrollY + window.innerHeight - targetHeight - margin));

      setDropdownPosition({ top: clampedTop, left: clampedLeft, width: targetWidth, height: targetHeight });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen, primaryAnchor, fallbackAnchor, anchorVersion]);

  if (!isOpen) return null;

  const Screw = () => (
    <div 
      className="rounded-full relative"
      style={{
        width: '5px',
        height: '5px',
        background: 'radial-gradient(circle at 30% 30%, #8a8a8a, #2a2a2a)',
        boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.4), inset 0 -1px 2px rgba(0,0,0,0.8)'
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-black/70" style={{ width: '3px', height: '0.5px' }} />
      </div>
    </div>
  );

  const dropdownStyle: CSSProperties = {
    width: '380px',
    maxHeight: '420px',
    background: 'linear-gradient(145deg, #e8d8c0, #d4c4a8)',
    boxShadow: `
      0 16px 48px rgba(0,0,0,0.95),
      inset 0 2px 4px rgba(255,240,220,0.6),
      inset 0 -2px 6px rgba(80,50,30,0.3),
      0 0 0 1px #6a5040
    `,
    border: '2px solid #8a7050',
    borderRadius: '0 0 2px 2px',
    borderTop: '1px solid #a89070',
    padding: '8px',
    overflow: 'hidden'
  };

  if (dropdownPosition) {
    dropdownStyle.top = `${dropdownPosition.top}px`;
    dropdownStyle.left = `${dropdownPosition.left}px`;
    dropdownStyle.width = `${dropdownPosition.width}px`;
    dropdownStyle.height = `${dropdownPosition.height}px`;
    dropdownStyle.maxHeight = undefined;
    dropdownStyle.transform = undefined;
  } else {
    dropdownStyle.top = '224px';
    dropdownStyle.left = '50%';
    dropdownStyle.transform = 'translateX(-50%)';
  }

  return (
    <>
      {/* Invisible overlay to close dropdown when clicking outside */}
      <div 
        className="fixed inset-0"
        style={{ zIndex: 9980 }}
        onClick={onClose}
      />
      
      {/* Dropdown menu */}
      <div 
        className="fixed animate-slideDown"
        ref={dropdownRef}
        style={{ ...dropdownStyle, zIndex: 9990 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Corner screws */}
        <div className="absolute top-1.5 left-1.5"><Screw /></div>
        <div className="absolute top-1.5 right-1.5"><Screw /></div>
        <div className="absolute bottom-1.5 left-1.5"><Screw /></div>
        <div className="absolute bottom-1.5 right-1.5"><Screw /></div>

        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '9px',
                color: '#3a2010',
                textShadow: '1px 1px 0px rgba(255,240,200,0.8)',
                letterSpacing: '0.1em',
                fontWeight: 'bold'
              }}
            >
              PRESET BROWSER
            </h2>
            <div 
              style={{
                fontFamily: 'Georgia, serif',
                fontSize: '5px',
                color: '#5a3820',
                letterSpacing: '0.15em'
              }}
            >
              Load & Save Configurations
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-1.5 py-0.5 transition-all hover:brightness-110 active:brightness-95"
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '7px',
              fontWeight: 'bold',
              color: '#3a2010',
              background: 'linear-gradient(180deg, #c8a870, #a88850)',
              boxShadow: `
                inset 0 1px 2px rgba(255,220,180,0.7),
                inset 0 -2px 3px rgba(60,40,20,0.5),
                0 2px 4px rgba(0,0,0,0.4)
              `,
              border: '1px solid #8a6830',
              borderRadius: '1px'
            }}
          >
            ✕
          </button>
        </div>

        {/* Tab selector */}
        <div className="flex gap-1 mb-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className="px-2 py-1 transition-all"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '7px',
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: isActive ? '#2a1810' : '#d4a574',
                  background: isActive
                    ? 'linear-gradient(180deg, #d4af72 0%, #a8803e 100%)'
                    : 'linear-gradient(180deg, #3a3020 0%, #2a2010 100%)',
                  boxShadow: isActive
                    ? 'inset 0 1px 3px rgba(255,245,210,0.9), inset 0 -2px 4px rgba(40,30,20,0.8), 0 3px 8px rgba(0,0,0,0.6)'
                    : 'inset 0 1px 2px rgba(0,0,0,0.6)',
                  border: '1px solid #6a5040',
                  borderRadius: '2px',
                  textShadow: isActive ? '0.5px 0.5px 0 rgba(255,240,200,0.85)' : 'none'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Main content area */}
        <div 
          className="relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #2a2218, #1a1510)',
            boxShadow: `
              inset 0 3px 8px rgba(0,0,0,0.8),
              inset 0 -2px 4px rgba(100,80,60,0.3)
            `,
            border: '2px solid #4a3828',
            borderRadius: '1px',
            padding: '6px',
            maxHeight: '340px'
          }}
        >
          {activeTab === 'factory' && renderFactoryContent()}
          {activeTab === 'styles' && renderStylesContent()}
          {activeTab === 'user' && renderUserContent()}

          {/* Current preset info */}
          {selectedPreset && (
            <div 
              className="mt-1.5 p-1.5"
              style={{
                background: 'linear-gradient(145deg, #3a2818, #2a1810)',
                border: '1px solid #5a4830',
                borderRadius: '1px'
              }}
            >
              <div 
                className="mb-0.5"
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '6px',
                  color: '#d4a574',
                  letterSpacing: '0.1em'
                }}
              >
                LOADED: {selectedPreset.name}
              </div>
              <div 
                className="grid grid-cols-3 gap-x-1.5 gap-y-0.5"
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: '5px',
                  color: '#8a7050'
                }}
              >
                <div>Style: {selectedPreset.category ?? 'Custom'}</div>
                <div>Drive: {selectedPreset.parameters.drive}%</div>
                <div>Tone: {selectedPreset.parameters.tone}%</div>
                <div>MPC: {toBitDepth(selectedPreset.parameters.mpc)}bit</div>
                <div>Wow: {selectedPreset.parameters.wow}%</div>
                <div>Noise: {selectedPreset.parameters.noise}%</div>
                <div>Flutter: {selectedPreset.parameters.flutter}%</div>
                <div>Low-Pass: {formatLowPassParamToHz(selectedPreset.parameters.lowPass)}</div>
                <div>Output Gain: {toOutputGainDb(selectedPreset.parameters.outputGain)}</div>
                <div>Clipper: {selectedPreset.parameters.clipperMode}%</div>
              </div>
            </div>
          )}
        </div>

        {/* CSS Animation */}
        <style>{`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(-8px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }
          .animate-slideDown {
            animation: slideDown 0.2s ease-out forwards;
          }
        `}</style>
      </div>
    </>
  );
}