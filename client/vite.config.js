import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/auth': "http://localhost:8080",
      '/api': "http://localhost:8080",
      '/content': "http://localhost:8080"
    }
  },
  plugins: [react()],
})


// url of backend on render
// https://mpt-backend.onrender.com

//URL for testing
// http://localhost:8080