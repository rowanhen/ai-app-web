import * as React from "react";
import { useInitializeSession } from "~/app/hooks/useInitializeSession";

/**
 * Component that attempts to initialize the session on app load using the generated API
 * If the API is unavailable, the app will still render without blocking
 */
export function SessionInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  // Attempt to initialize session, but don't block rendering if it fails
  const { isError, error } = useInitializeSession();

  // Log errors for debugging but don't block the app
  React.useEffect(() => {
    if (isError) {
      console.warn("Session initialization failed:", error);
    }
  }, [isError, error]);

  return <>{children}</>;
}
