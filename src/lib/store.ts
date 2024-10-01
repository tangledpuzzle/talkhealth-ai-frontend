import { create } from "zustand";

interface ModalStore {
  login: boolean;
  signup1: boolean;
  signup2: boolean;
  forgpass: boolean;
  navmodal: boolean;
  toggleLogin: (val: boolean) => void;
  toggleSignup1: (val: boolean) => void;
  toggleSignup2: (val: boolean) => void;
  toggleForgpass: (val: boolean) => void;
  toggleNavmodal: (val: boolean) => void;
}

const useModalStore = create<ModalStore>((set) => ({
  login: false,
  signup1: false,
  signup2: false,
  forgpass: false,
  navmodal: false,
  toggleLogin: (val) => {
    set({ login: val });
  },
  toggleSignup1: (val) => {
    set({ signup1: val });
  },
  toggleSignup2: (val) => {
    set({ signup2: val });
  },
  toggleForgpass: (val) => {
    set({ forgpass: val });
  },
  toggleNavmodal: (val) => {
    set({ navmodal: val });
  },
}));

export default useModalStore;
