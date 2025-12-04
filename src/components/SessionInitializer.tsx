import * as React from "react";
import { setSessionUserId } from "~/app/config/session";
import { usePostAuthInitialize } from "~/generated/api/authentication/authentication";

/**
 * Component that initializes the session on app load using the generated API mutation hook
 */
export function SessionInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const { mutate } = usePostAuthInitialize({
    mutation: {
      onSuccess: (response) => {
        // Store userId when session is successfully initialized
        if (response?.data?.userId) {
          setSessionUserId(response.data.userId);
        }
      },
      onError: (error) => {
        // Handle errors gracefully - log but don't block the app
        console.warn("Session initialization failed:", error);
      },
    },
  });

  // Trigger session initialization on mount
  React.useEffect(() => {
    mutate();
  }, [mutate]);

  return <>{children}</>;
}
