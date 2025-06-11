import { useEffect, useRef, useState } from 'react';

type ProgressIndicatorStyle = {
  frames: string[];
  interval: number;
};

const styles = {
  arrow: {
    frames: ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖'],
    interval: 100,
  },
  ball_wave: {
    frames: ['𓃉𓃉𓃉', '𓃉𓃉∘', '𓃉∘°', '∘°∘', '°∘𓃉', '∘𓃉𓃉'],
    interval: 100,
  },
  blocks1: {
    frames: ['░', '▒', '▓', '█'],
    interval: 100,
  },
  blocks2: {
    frames: ['▛', '▜', '▟', '▙'],
    interval: 100,
  },
  braille_spinner: {
    frames: ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'],
    interval: 80,
  },
  braille_simple: {
    frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'],
    interval: 80,
  },
  char_spinner: {
    frames: ['-', '\\', '|', '/'],
    interval: 200,
  },
  clock: {
    frames: ['🕛', '🕐', '🕑', '🕒', '🕓', '🕔', '🕕', '🕖', '🕗', '🕘', '🕙', '🕚'],
    interval: 100,
  },
  emoji_moon: {
    frames: ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'],
    interval: 200,
  },
  line: {
    frames: ['☰', '☱', '☳', '☷', '☶', '☴'],
    interval: 100,
  },
  old: {
    frames: ['—', '\\\\', '|', '/'],
    interval: 100,
  },
  x_plus: {
    frames: ['×', '+'],
    interval: 100,
  },
} satisfies Record<string, ProgressIndicatorStyle>;

const useRafInterval = (callback: () => void, delay: null | number) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay === null) {
      return undefined;
    }
    const id = setInterval(() => savedCallback.current(), delay);
    return () => {
      clearInterval(id);
    };
  }, [delay]);
};

export const ProgressIndicator = ({
  style,
}: {
  style: keyof typeof styles;
}) => {
  const { frames, interval } = styles[style];
  if (!style) {
    throw new Error('Invalid style index');
  }

  const [index, setIndex] = useState<number>(0);

  useRafInterval(() => {
    setIndex((index + 1) % frames.length);
  }, interval);

  return (
    <div
      style={{
        color: '#00d992',
        fontFamily: 'monospace',
        pointerEvents: 'none',
        textAlign: 'center',
        userSelect: 'none',
        whiteSpace: 'pre',
        width: '24px',
      }}
    >
      {frames[index]}
    </div>
  );
}; 