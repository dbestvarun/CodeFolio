import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactIcons from 'vite-plugin-react-icons';
import path from "path"


export default defineConfig({
  plugins: [react(), reactIcons],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})