import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8888, //开发服务器端口
    open: true, //自动打开页面
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@hooks": path.resolve(__dirname, "src/hooks")
    }
  }
  // preview:{
  //   port: 8000,
  //   open: true,
  // }
})
