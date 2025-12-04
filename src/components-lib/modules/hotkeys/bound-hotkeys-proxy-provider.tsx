// NOTE(jimmylee)
// Vendored from
// https://github.com/JohannesKlauss/react-hotkeys-hook/blob/main/src/BoundHotkeysProxyProvider.tsx

import { Hotkey } from "@modules-lib/hotkeys/types";
import { createContext, ReactNode, useContext } from "react";

type BoundHotkeysProxyProviderType = {
  addHotkey: (hotkey: Hotkey) => void;
  removeHotkey: (hotkey: Hotkey) => void;
};

const BoundHotkeysProxyProvider = createContext<
  BoundHotkeysProxyProviderType | undefined
>(undefined);

export const useBoundHotkeysProxy = () => {
  return useContext(BoundHotkeysProxyProvider);
};

interface Props {
  children: ReactNode;
  addHotkey: (hotkey: Hotkey) => void;
  removeHotkey: (hotkey: Hotkey) => void;
}

export default function BoundHotkeysProxyProviderProvider({
  addHotkey,
  removeHotkey,
  children,
}: Props) {
  return (
    <BoundHotkeysProxyProvider.Provider value={{ addHotkey, removeHotkey }}>
      {children}
    </BoundHotkeysProxyProvider.Provider>
  );
}
