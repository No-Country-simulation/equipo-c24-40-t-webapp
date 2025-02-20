import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Puedes cambiar el puerto si es necesario
  },
  resolve: {
    alias: {
      '@': '/src', // Permite importar archivos usando '@' en lugar de rutas largas
    },
  },
});
