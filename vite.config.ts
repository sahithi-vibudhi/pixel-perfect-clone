import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isCI = process.env.CI === "true";

export default defineConfig({
  nitro: isCI ? false : undefined,

  tanstackStart: {
    server: { entry: "server" },

    ...(isCI
      ? {
          prerender: {
            enabled: true,
            crawlLinks: true,
            autoStaticPathsDiscovery: true,
            failOnError: true,
          },
          pages: [{ path: "/" }],
        }
      : {}),
  },
});
