import * as Utilities from "@common-lib/utilities";
import useHotkeys from "./use-hotkeys";

export const useGlobalNavigationHotkeys = () => {
  const onHandleSubmit = (event: KeyboardEvent) => {
    const target = event.target;
    if (Utilities.isFocusableElement(target)) {
      event.preventDefault();
      (target as HTMLElement).click();
    }
  };

  const onHandleNextFocus = (event: KeyboardEvent) => {
    const target = event.target;

    if (Utilities.isFocusableElement(target)) {
      event.preventDefault();

      const nextFocusable = Utilities.findNextFocusable(
        target as Element,
        "next"
      );
      if (nextFocusable) {
        nextFocusable.focus();
      }
    }
  };

  const onHandlePreviousFocus = (event: KeyboardEvent) => {
    const target = event.target;

    if (Utilities.isFocusableElement(target)) {
      event.preventDefault();

      const previousFocusable = Utilities.findNextFocusable(
        target as Element,
        "previous"
      );
      if (previousFocusable) {
        previousFocusable.focus();
      }
    }
  };

  useHotkeys("ArrowDown", onHandleNextFocus);
  useHotkeys("ArrowUp", onHandlePreviousFocus);
  useHotkeys("ArrowRight", onHandleNextFocus);
  useHotkeys("ArrowLeft", onHandlePreviousFocus);
  useHotkeys("Enter", onHandleSubmit);
  useHotkeys(" ", onHandleSubmit);
};
