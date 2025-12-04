/// <reference types="vite/client" />
import DefaultLayout from "@components-lib/page/DefaultLayout";
import { useGlobalNavigationHotkeys } from "@modules-lib/hotkeys/use-global-navigation-hotkeys";
import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import Providers from "~/components/Providers";
import { SessionInitializer } from "~/components/SessionInitializer";
import appCss from "~/styles/app.css?url";
import globalFontsCss from "~/styles/global-fonts.css?url";
import globalCss from "~/styles/global.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "TanStack Start",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: globalCss },
      { rel: "stylesheet", href: globalFontsCss },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png",
      },
      { rel: "manifest", href: "/site.webmanifest", color: "#fffff" },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  shellComponent: RootDocument,
  pendingComponent: () => <div>Loading...</div>,
  notFoundComponent: () => <div>Not Found</div>,
});

function RootDocument() {
  useGlobalNavigationHotkeys();
  return (
    <>
      <HeadContent />
      <Providers>
        <SessionInitializer>
          <DefaultLayout previewPixelSRC="https://intdev-global.s3.us-west-2.amazonaws.com/template-app-icon.png">
            <Outlet />
          </DefaultLayout>
        </SessionInitializer>
      </Providers>
    </>
  );
}
