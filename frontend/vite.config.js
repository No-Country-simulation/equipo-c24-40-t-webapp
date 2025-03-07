import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://ec2-44-203-97-209.compute-1.amazonaws.com:3000',  // Cambia esta URL según corresponda
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    port: 3100, // Puedes cambiar el puerto si es necesario
  },
  resolve: {
    alias: {
      '@': '/src', // Permite importar archivos usando '@' en lugar de rutas largas
    },
  },
});
