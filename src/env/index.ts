import { local } from "./local";
import { production } from "./production";
import { staging } from "./staging";

export const envConfig = () => {
  // Check if we're in a browser environment
  if (typeof window !== "undefined") {
    if (window.location.pathname.includes("local")) {
      return local;
    } else if (window.location.pathname.includes("staging")) {
      return staging;
    } else {
      return production;
    }
  }

  // Server-side rendering or Node.js environment
  // Use environment variable or default to production
  const env = process.env.NODE_ENV || process.env.ENVIRONMENT || "production";

  if (env === "development" || env === "local") {
    return local;
  } else if (env === "staging") {
    return staging;
  } else {
    return production;
  }
};
