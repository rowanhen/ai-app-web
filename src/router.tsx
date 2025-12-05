import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

// Create the router instance
const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function getRouter() {
  return router;
}
