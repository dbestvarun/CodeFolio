import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import reactIcons from 'vite-plugin-react-icons';


export default defineConfig({
  plugins: [react(), reactIcons],
})