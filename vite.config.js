import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { config } from 'dotenv';

// Load environment variables from .env file
config();

export default defineConfig({
  // Your Vite configuration
  plugins: [react()],
  define: {
    // eslint-disable-next-line no-undef
    'process.env': process.env
  }
});
