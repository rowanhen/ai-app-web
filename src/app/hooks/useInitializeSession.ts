import { useQuery } from "@tanstack/react-query";
import { setSessionUserId } from "~/app/config/session";
import { postAuthInitialize } from "~/generated/api/authentication/authentication";
import { PostAuthInitialize200 } from "~/generated/api/schemas";

/**
 * Custom hook that uses the generated postAuthInitialize function with useQuery
 * This attempts to initialize a session, but gracefully handles connection errors
 * if the backend API is not available.
 */
export function useInitializeSession() {
  const query = useQuery<PostAuthInitialize200>({
    queryKey: ["initializeSession"],
    queryFn: async ({ signal }) => {
      try {
        // Use the generated postAuthInitialize function
        const response = await postAuthInitialize(signal);

        // Store userId/session vars for forwarding to backend
        if (response?.data?.userId) {
          setSessionUserId(response.data.userId);
        }

        return response;
      } catch (error: any) {
        // Handle connection errors gracefully
        if (error?.code === "ECONNREFUSED" || error?.code === "ERR_NETWORK") {
          console.warn(
            "API server is not available. Session initialization skipped.",
            error
          );
          // Return a fallback response so the app can still render
          return {
            data: {
              userId: undefined,
            },
          } as PostAuthInitialize200;
        }
        // Re-throw other errors
        throw error;
      }
    },
    staleTime: Infinity, // Only initialize once per session
    gcTime: Infinity, // Keep in cache
    retry: 2, // Retry up to 2 times
    retryDelay: 1000, // Wait 1 second between retries
    // Don't fail the entire app if session initialization fails
    throwOnError: false,
  });

  return query;
}
