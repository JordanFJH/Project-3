import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/auth': import.meta.env.VITE_API,
      '/api': import.meta.env.VITE_API,
      '/content': import.meta.env.VITE_API
    }
  },
  plugins: [react()],
})


// url of backend on render
// https://mpt-backend.onrender.com

//URL for testing
// http://localhost:8080