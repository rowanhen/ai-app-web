// NOTE(jimmylee)
// Vendored from
// https://github.com/JohannesKlauss/react-hotkeys-hook/blob/main/src/index.ts

import {
  HotkeysProvider,
  useHotkeysContext,
} from "@modules-lib/hotkeys/hotkeys-provider";
import { isHotkeyPressed } from "@modules-lib/hotkeys/is-hotkey-pressed";
import type { HotkeyCallback, Keys, Options } from "@modules-lib/hotkeys/types";
import useHotkeys from "@modules-lib/hotkeys/use-hotkeys";
import useRecordHotkeys from "@modules-lib/hotkeys/use-record-hotkeys";

export {
  HotkeyCallback,
  HotkeysProvider,
  isHotkeyPressed,
  Keys,
  Options,
  useHotkeys,
  useHotkeysContext,
  useRecordHotkeys,
};
