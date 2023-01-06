import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
const config = {
  resolve: {
    alias: {
      "@utils": path.resolve(__dirname, "./src/utils")
    }
  },
  plugins: [react()],
}
console.log(config)
export default defineConfig(config)
