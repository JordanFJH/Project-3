import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/auth': 'https://mpt-backend.onrender.com',
      '/api': 'https://mpt-backend.onrender.com',
      '/content': 'https://mpt-backend.onrender.com'
    }
  },
  plugins: [react()],
})


// url of backend on render
// https://mpt-backend.onrender.com

//URL for testing
// http://localhost:8080