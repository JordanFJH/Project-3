import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/auth': import.meta.env.VITE_SERVER,
      '/api': import.meta.env.VITE_SERVER,
      '/content': import.meta.env.VITE_SERVER
    }
  },
  plugins: [react()],
})


// url of backend on render
// https://mpt-backend.onrender.com

//URL for testing
// http://localhost:8080