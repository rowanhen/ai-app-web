import { local } from "./local";
import { production } from "./production";
import { staging } from "./staging";

/**
 * Get the current environment from environment variables.
 * Requires VITE_ENVIRONMENT to be set (no fallbacks).
 */
function getEnvironment(): string {
  let env: string | undefined;

  if (
    typeof window !== "undefined" &&
    typeof import.meta !== "undefined" &&
    import.meta.env
  ) {
    // Client-side: check Vite environment variables
    env = import.meta.env.VITE_ENVIRONMENT;
  } else if (typeof process !== "undefined" && process.env) {
    // Server-side: check Node.js environment variables
    env = process.env.VITE_ENVIRONMENT || process.env.ENVIRONMENT;
  }

  if (!env) {
    throw new Error(
      "VITE_ENVIRONMENT or ENVIRONMENT must be set. " +
        "Valid values: 'local', 'staging', 'production'. " +
        "Set it in your .env file or pass it as an environment variable."
    );
  }

  return env.toLowerCase();
}

export const envConfig = () => {
  const env = getEnvironment();

  // Return appropriate config based on environment
  if (env === "local" || env === "development" || env === "dev") {
    return local;
  } else if (env === "staging") {
    return staging;
  } else if (env === "production" || env === "prod") {
    return production;
  } else {
    throw new Error(
      `Invalid environment: "${env}". ` +
        "Valid values are: 'local', 'staging', 'production'"
    );
  }
};
