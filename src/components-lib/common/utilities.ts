//@ts-nocheck
const hasOwn = {}.hasOwnProperty;
const localhostDomainRE = /^localhost[\:?\d]*(?:[^\:?\d]\S*)?$/;
const nonLocalhostDomainRE = /^[^\s\.]+\.\S{2,}$/;
const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/;

export function noop() {
  return null;
}

export function pluralize(text: string, count: number) {
  return count > 1 || count === 0 ? `${text}s` : text;
}

export function getOrdinalNumber(n) {
  return (
    n +
    (n > 0
      ? ["th", "st", "nd", "rd"][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : "")
  );
}

// NOTE(jimmylee)
// Stolen from: https://github.com/JohannesKlauss/react-hotkeys-hook/blob/main/src/deepEqual.ts
export function deepEqual(x: any, y: any): boolean {
  //@ts-ignore
  return x && y && typeof x === "object" && typeof y === "object"
    ? Object.keys(x).length === Object.keys(y).length &&
        //@ts-ignore
        Object.keys(x).reduce(
          (isEqual, key) => isEqual && deepEqual(x[key], y[key]),
          true
        )
    : x === y;
}

export function getDomainFromEmailWithoutAnySubdomain(email: string): string {
  const atIndex = email.lastIndexOf("@");
  if (atIndex === -1) {
    return "";
  }

  const domain = email.slice(atIndex + 1);
  const domainParts = domain.split(".");

  if (domainParts.length < 2) {
    return "";
  }

  const mainDomain = domainParts.slice(-2).join(".");
  return mainDomain;
}

export function onHandleAppearanceModeChange(className?: string) {
  const body = document.body;

  body.classList.forEach((existingClass) => {
    if (existingClass.startsWith("tint-")) {
      body.classList.remove(existingClass);
    }
  });

  if (className) {
    body.classList.add(className);
  }
}

export function onHandleAppearanceChange(className?: string) {
  const body = document.body;

  body.classList.forEach((existingClass) => {
    if (existingClass.startsWith("theme-")) {
      body.classList.remove(existingClass);
    }
  });

  if (className) {
    body.classList.add(className);
  } else {
    body.classList.add("theme-light");
  }
}

export function onHandleFontChange(className?: string) {
  const body = document.body;

  if (className) {
    body.classList.forEach((existingClass) => {
      if (existingClass.startsWith("font-")) {
        body.classList.remove(existingClass);
      }
    });

    body.classList.add(className);
    return;
  }

  body.classList.forEach((existingClass) => {
    if (existingClass.startsWith("font-")) {
      body.classList.remove(existingClass);
    }
  });
}

export function formatDollars(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export function calculatePositionWithGutter(
  rect,
  objectWidth,
  viewportWidth,
  gutter = 24
) {
  const right = viewportWidth - rect.right;
  const top = rect.top + rect.height + gutter;
  const side = right + objectWidth >= viewportWidth ? "left" : "right";
  const adjustedRight =
    side === "left" ? viewportWidth - objectWidth - gutter : right;
  return { top, right: adjustedRight, side };
}

export function calculatePositionWithGutterById(
  id,
  objectWidth,
  viewportWidth,
  gutter?
) {
  let rect;
  if (id) {
    const el = document.getElementById(id);
    if (el) {
      rect = el.getBoundingClientRect();
    }
  }
  return calculatePositionWithGutter(rect, objectWidth, viewportWidth, gutter);
}

export function leftPad(input, length) {
  const zerosNeeded = length - input.length;
  if (zerosNeeded <= 0) {
    return input;
  }

  const zeros = "0".repeat(zerosNeeded);

  return zeros + input;
}

export function toDateISOString(data: string) {
  const date = new Date(data);
  const dayOfWeek = date.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const month = date.toLocaleDateString("en-US", {
    month: "long",
  });
  const dayOfMonth = getOrdinalNumber(date.getDate());
  const year = date.getFullYear();

  const formattedDate = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;

  return formattedDate;
}

export function elide(string, length = 140, emptyState = "...") {
  if (isEmpty(string)) {
    return emptyState;
  }

  if (string.length < length) {
    return string.trim();
  }

  return `${string.substring(0, length)}...`;
}

export function bytesToSize(bytes: number, decimals: number = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1000;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(dm)} ${sizes[i]}`;
}

export function isEmpty(text: any) {
  // NOTE(jimmylee):
  // If a number gets passed in, it isn't considered empty for zero.
  if (text === 0) {
    return false;
  }

  if (!text) {
    return true;
  }

  if (typeof text === "object") {
    return true;
  }

  if (text.length === 0) {
    return true;
  }

  text = text.toString();

  return Boolean(!text.trim());
}

export function createSlug(text: any) {
  if (isEmpty(text)) {
    return "untitled";
  }

  const a = "æøåàáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;";
  const b = "aoaaaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------";
  const p = new RegExp(a.split("").join("|"), "g");

  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special chars
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function isUrl(string: any) {
  if (typeof string !== "string") {
    return false;
  }

  let match = string.match(protocolAndDomainRE);
  if (!match) {
    return false;
  }

  let everythingAfterProtocol = match[1];
  if (!everythingAfterProtocol) {
    return false;
  }

  if (
    localhostDomainRE.test(everythingAfterProtocol) ||
    nonLocalhostDomainRE.test(everythingAfterProtocol)
  ) {
    return true;
  }

  return false;
}

export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  delay: number
) {
  let timeoutID: number | undefined;
  let lastArgs: Args | undefined;

  const run = () => {
    if (lastArgs) {
      fn(...lastArgs);
      lastArgs = undefined;
    }
  };

  const debounced = (...args: Args) => {
    clearTimeout(timeoutID);
    lastArgs = args;
    timeoutID = window.setTimeout(run, delay);
  };

  debounced.flush = () => {
    clearTimeout(timeoutID);
  };

  return debounced;
}

export function timeAgo(dateInput: Date | string | number): string {
  const date = new Date(dateInput);
  const now = new Date();
  const secondsPast = (now.getTime() - date.getTime()) / 1000;

  if (secondsPast < 0 || isNaN(secondsPast)) {
    return "[INVALID]";
  }

  if (secondsPast < 60) {
    return "Just now";
  } else if (secondsPast < 3600) {
    const minutes = Math.floor(secondsPast / 60);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (secondsPast < 86400) {
    const hours = Math.floor(secondsPast / 3600);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (secondsPast < 604800) {
    const days = Math.floor(secondsPast / 86400);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  }

  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  return formattedDate;
}

export function classNames(...args: any[]): string {
  let classes: string[] = [];

  for (let i = 0; i < arguments.length; i++) {
    let arg = arguments[i];
    if (!arg) continue;

    let argType = typeof arg;

    if (argType === "string" || argType === "number") {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      if (arg.length) {
        let inner = classNames.apply(null, arg);
        if (inner) {
          classes.push(inner);
        }
      }
    } else if (argType === "object") {
      if (arg.toString !== Object.prototype.toString) {
        classes.push(arg.toString());
      } else {
        for (let key in arg) {
          if (hasOwn.call(arg, key) && arg[key]) {
            classes.push(key);
          }
        }
      }
    }
  }

  return classes.join(" ");
}

export async function generateNonce() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 8; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function filterUndefined(obj) {
  const res = {};
  Object.keys(obj)
    .filter((k) => obj[k] !== undefined)
    .forEach((k) => (res[k] = obj[k]));
  return res;
}

export const isFocusableElement = (
  element: EventTarget | null
): element is HTMLElement => {
  if (!element || !(element instanceof HTMLElement)) {
    return false;
  }

  const focusableSelectors = [
    "a[href]",
    "button",
    "input",
    "select",
    "textarea",
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ];

  return element.matches(focusableSelectors.join(", "));
};

export const findNextFocusable = (
  element: Element | null,
  direction: "next" | "previous" = "next"
): HTMLElement | null => {
  if (!element) return null;

  const focusableSelectors = [
    "a[href]",
    "button",
    "input",
    "select",
    "textarea",
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]',
  ];

  const focusableElements = Array.from(
    document.querySelectorAll<HTMLElement>(focusableSelectors.join(", "))
  );

  const currentIndex = focusableElements.indexOf(element as HTMLElement);

  if (currentIndex !== -1) {
    const nextIndex =
      direction === "next"
        ? (currentIndex + 1) % focusableElements.length
        : (currentIndex - 1 + focusableElements.length) %
          focusableElements.length;

    return focusableElements[nextIndex];
  }

  return null;
};

export const findFocusableDescendant = (
  container: Element | null,
  currentFocused: Element | null = null,
  direction: "next" | "previous" = "next"
): HTMLElement | null => {
  if (!container) return null;

  const focusableElements = Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"]), [contenteditable="true"]'
    )
  );

  if (focusableElements.length === 0) return null;

  let index = 0;
  if (currentFocused) {
    const currentIndex = focusableElements.indexOf(
      currentFocused as HTMLElement
    );
    if (currentIndex !== -1) {
      index = direction === "next" ? currentIndex + 1 : currentIndex - 1;
    }
  }

  if (index >= 0 && index < focusableElements.length) {
    return focusableElements[index];
  }

  return null;
};

export function formatCryptoAddress(
  address: string,
  startChars: number = 6,
  endChars: number = 4
): string {
  if (isEmpty(address)) {
    return "";
  }

  const addressStr = address.toString();

  // If address is shorter than the combined length, return as-is
  if (addressStr.length <= startChars + endChars) {
    return addressStr;
  }

  // Extract start and end portions
  const start = addressStr.substring(0, startChars);
  const end = addressStr.substring(addressStr.length - endChars);

  return `${start}...${end}`;
}

/**
 * Generate a simple hash from a string seed
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
}

/**
 * Generate a random gradient background based on a seed string.
 * The same seed will always produce the same gradient.
 *
 * @param seed - The seed string (e.g., user ID)
 * @returns CSS gradient string (e.g., "linear-gradient(135deg, #ff6b6b, #4ecdc4)")
 */
export function generateGradientFromSeed(seed: string): string {
  if (!seed) {
    // Default gradient if no seed provided
    return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
  }

  const hash = hashString(seed);

  // Generate two colors from the hash
  // Use different parts of the hash to create distinct colors
  const hue1 = hash % 360;
  const hue2 = (hash * 7) % 360; // Multiply by prime to get different hue

  // Use moderate saturation and lightness for nice gradients
  const saturation = 60 + (hash % 20); // 60-80%
  const lightness1 = 50 + (hash % 15); // 50-65%
  const lightness2 = 45 + ((hash * 3) % 20); // 45-65%

  // Generate HSL colors
  const color1 = `hsl(${hue1}, ${saturation}%, ${lightness1}%)`;
  const color2 = `hsl(${hue2}, ${saturation + 10}%, ${lightness2}%)`;

  // Generate angle from hash (0-360 degrees)
  const angle = hash % 360;

  return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
}
