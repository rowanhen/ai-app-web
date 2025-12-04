/**
 * Session management utilities
 * Stores and retrieves session variables (userId, etc.) for forwarding to backend
 */

const SESSION_USER_ID_KEY = "session_userId";

/**
 * Check if we're in a browser environment
 */
function isBrowser(): boolean {
  return typeof window !== "undefined" && typeof sessionStorage !== "undefined";
}

/**
 * Store userId from initialize response
 */
export function setSessionUserId(userId: string | undefined): void {
  if (userId && isBrowser()) {
    try {
      sessionStorage.setItem(SESSION_USER_ID_KEY, userId);
    } catch (error) {
      // Handle cases where sessionStorage might be disabled or unavailable
      console.warn("Failed to set session userId:", error);
    }
  }
}

/**
 * Get stored userId
 */
export function getSessionUserId(): string | undefined {
  if (!isBrowser()) {
    return undefined;
  }

  try {
    return sessionStorage.getItem(SESSION_USER_ID_KEY) || undefined;
  } catch (error) {
    // Handle cases where sessionStorage might be disabled or unavailable
    console.warn("Failed to get session userId:", error);
    return undefined;
  }
}

/**
 * Clear session data
 */
export function clearSession(): void {
  if (!isBrowser()) {
    return;
  }

  try {
    sessionStorage.removeItem(SESSION_USER_ID_KEY);
  } catch (error) {
    // Handle cases where sessionStorage might be disabled or unavailable
    console.warn("Failed to clear session:", error);
  }
}
