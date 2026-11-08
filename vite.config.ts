import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// The catalog is the user site, so it's served from the root of muhdashiq.com.
// Each project lives under its own path, like muhdashiq.com/banana-leaf/.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toISOString()),
  },
});
