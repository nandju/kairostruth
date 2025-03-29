import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'; // Regroupe React et ReactDOM
            }
            return 'vendor'; // Regroupe les autres dépendances
          }
        },
      },
    },
    chunkSizeWarningLimit: 800, // Augmente la limite pour éviter l'avertissement
  },
});
