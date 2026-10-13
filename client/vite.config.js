import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Same ports and paths the CRA setup used: dev on 3000 with /api proxied to the
// Express server on 8080, and the build in client/build, which index.js serves.
export default defineConfig({
   plugins: [react()],
   server: {
      port: 3000,
      proxy: { "/api": "http://localhost:8080" },
   },
   build: { outDir: "build" },
});
