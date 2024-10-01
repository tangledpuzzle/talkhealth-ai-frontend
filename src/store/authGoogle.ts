import { create } from "zustand";

type GoogleAuthState = {
    googleAuth: boolean;
    setGoogleAuth: (googleAuth: boolean) => void;
    };

export const useGoogleAuthStore = create<GoogleAuthState>((set) => ({
    googleAuth: false,
    setGoogleAuth: (googleAuth) => set({ googleAuth }),
    }));