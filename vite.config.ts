import path from 'path'
import { ConfigEnv, UserConfig, loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import createVuePlugin from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader'

const CWD = process.cwd()

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const { VITE_BASE_URL } = loadEnv(mode, CWD)
  return {
    base: VITE_BASE_URL,
    define: {},
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src')
      }
    },

    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve(
              'src/style/variables.less'
            )}";`
          },
          math: 'strict',
          javascriptEnabled: true
        }
      }
    },

    plugins: [
      createVuePlugin(),
      vueJsx(),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: false, // 是否开启本地mock 我们用的远程连接 直接关闭 走代理就OK
        prodEnabled: true,
        supportTs: true,
        logger: true,
        injectCode: `
          import { setupProdMockServer } from '../mockProdServer';
          setupProdMockServer();
        `
      }),
      svgLoader()
    ],
    server: {
      port: 3002,
      host: '0.0.0.0',
      hmr: true,
      proxy: {
        '/api': {
          // target: 'http://172.16.17.63:9995', // 'http://172.16.17.191:9995', // 'http://172.16.17.63:9995',
          // target: 'https://zhyl-admin-t.itheima.net/api', // 测试环境

          // target: 'https://zhyl-admin.itheima.net/api', // pip正式环境
          // target: 'http://172.16.17.63:9995', // 小兵
          // target: 'http://172.16.43.24:9995', // 家乐
          target: 'http://localhost:9995', // 洪波

          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  }
}
