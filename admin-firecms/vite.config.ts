import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
const config = {
  optimizeDeps: {
    exclude: [
      "firebase",
      "firebase/app",
      "firebase/auth",
      "firebase/firestore",
      "firebase/analytics",
      "firebase/storage",
      "firebase/functions",
      "firebase/performance",
    ],
  },
  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "./src/utils")
    }
  },
  plugins: [react()],
}
console.log(config)
export default defineConfig(config)
