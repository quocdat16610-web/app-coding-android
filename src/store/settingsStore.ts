import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { safeStorage } from '@/lib/safeStorage';

export type ThemePreference = 'system' | 'light' | 'dark';
export type PlaybackRate = 0.75 | 1 | 1.25 | 1.5;

export const PLAYBACK_RATES: readonly PlaybackRate[] = [0.75, 1, 1.25, 1.5];

export interface SettingsState {
  theme: ThemePreference;
  voiceURI: string | null;
  rate: PlaybackRate;
  autoRead: boolean;
  subtitles: boolean;
  setTheme: (theme: ThemePreference) => void;
  setVoiceURI: (voiceURI: string | null) => void;
  setRate: (rate: PlaybackRate) => void;
  setAutoRead: (autoRead: boolean) => void;
  setSubtitles: (subtitles: boolean) => void;
}

export const SETTINGS_STORAGE_KEY = 'kotlin-academy-settings-v1';

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      voiceURI: null,
      rate: 1,
      autoRead: true,
      subtitles: true,
      setTheme: (theme) => set({ theme }),
      setVoiceURI: (voiceURI) => set({ voiceURI }),
      setRate: (rate) => set({ rate }),
      setAutoRead: (autoRead) => set({ autoRead }),
      setSubtitles: (subtitles) => set({ subtitles }),
    }),
    {
      name: SETTINGS_STORAGE_KEY,
      version: 1,
      storage: createJSONStorage(() => safeStorage),
      partialize: ({ theme, voiceURI, rate, autoRead, subtitles }) => ({
        theme,
        voiceURI,
        rate,
        autoRead,
        subtitles,
      }),
    },
  ),
);
