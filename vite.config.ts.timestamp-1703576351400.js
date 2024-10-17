// vite.config.ts
import path from "path";
import { loadEnv } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import createVuePlugin from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import svgLoader from "vite-svg-loader";
var CWD = process.cwd();
var vite_config_default = ({ mode }) => {
  const { VITE_BASE_URL } = loadEnv(mode, CWD);
  return {
    base: VITE_BASE_URL,
    define: {},
    resolve: {
      alias: {
        "@": path.resolve("D:\\project\\2023\\project-zzyl-v2.1\\project-zzyl-admin-vue3-java", "./src")
      }
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${path.resolve(
              "src/style/variables.less"
            )}";`
          },
          math: "strict",
          javascriptEnabled: true
        }
      }
    },
    plugins: [
      createVuePlugin(),
      vueJsx(),
      viteMockServe({
        mockPath: "mock",
        localEnabled: false,
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
      host: "0.0.0.0",
      hmr: true,
      proxy: {
        "/api": {
          target: "http://172.16.43.24:9995",
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      }
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcbmltcG9ydCB7IENvbmZpZ0VudiwgVXNlckNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCB7IHZpdGVNb2NrU2VydmUgfSBmcm9tICd2aXRlLXBsdWdpbi1tb2NrJ1xyXG5pbXBvcnQgY3JlYXRlVnVlUGx1Z2luIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xyXG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcidcclxuXHJcbmNvbnN0IENXRCA9IHByb2Nlc3MuY3dkKClcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0ICh7IG1vZGUgfTogQ29uZmlnRW52KTogVXNlckNvbmZpZyA9PiB7XHJcbiAgY29uc3QgeyBWSVRFX0JBU0VfVVJMIH0gPSBsb2FkRW52KG1vZGUsIENXRClcclxuICByZXR1cm4ge1xyXG4gICAgYmFzZTogVklURV9CQVNFX1VSTCxcclxuICAgIGRlZmluZToge30sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoXCJEOlxcXFxwcm9qZWN0XFxcXDIwMjNcXFxccHJvamVjdC16enlsLXYyLjFcXFxccHJvamVjdC16enlsLWFkbWluLXZ1ZTMtamF2YVwiLCAnLi9zcmMnKVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIGNzczoge1xyXG4gICAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XHJcbiAgICAgICAgbGVzczoge1xyXG4gICAgICAgICAgbW9kaWZ5VmFyczoge1xyXG4gICAgICAgICAgICBoYWNrOiBgdHJ1ZTsgQGltcG9ydCAocmVmZXJlbmNlKSBcIiR7cGF0aC5yZXNvbHZlKFxyXG4gICAgICAgICAgICAgICdzcmMvc3R5bGUvdmFyaWFibGVzLmxlc3MnXHJcbiAgICAgICAgICAgICl9XCI7YFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIG1hdGg6ICdzdHJpY3QnLFxyXG4gICAgICAgICAgamF2YXNjcmlwdEVuYWJsZWQ6IHRydWVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICBjcmVhdGVWdWVQbHVnaW4oKSxcclxuICAgICAgdnVlSnN4KCksXHJcbiAgICAgIHZpdGVNb2NrU2VydmUoe1xyXG4gICAgICAgIG1vY2tQYXRoOiAnbW9jaycsXHJcbiAgICAgICAgbG9jYWxFbmFibGVkOiBmYWxzZSwgLy8gXHU2NjJGXHU1NDI2XHU1RjAwXHU1NDJGXHU2NzJDXHU1NzMwbW9jayBcdTYyMTFcdTRFRUNcdTc1MjhcdTc2ODRcdThGRENcdTdBMEJcdThGREVcdTYzQTUgXHU3NkY0XHU2M0E1XHU1MTczXHU5NUVEIFx1OEQ3MFx1NEVFM1x1NzQwNlx1NUMzMU9LXHJcbiAgICAgICAgcHJvZEVuYWJsZWQ6IHRydWUsXHJcbiAgICAgICAgc3VwcG9ydFRzOiB0cnVlLFxyXG4gICAgICAgIGxvZ2dlcjogdHJ1ZSxcclxuICAgICAgICBpbmplY3RDb2RlOiBgXHJcbiAgICAgICAgICBpbXBvcnQgeyBzZXR1cFByb2RNb2NrU2VydmVyIH0gZnJvbSAnLi4vbW9ja1Byb2RTZXJ2ZXInO1xyXG4gICAgICAgICAgc2V0dXBQcm9kTW9ja1NlcnZlcigpO1xyXG4gICAgICAgIGBcclxuICAgICAgfSksXHJcbiAgICAgIHN2Z0xvYWRlcigpXHJcbiAgICBdLFxyXG4gICAgc2VydmVyOiB7XHJcbiAgICAgIHBvcnQ6IDMwMDIsXHJcbiAgICAgIGhvc3Q6ICcwLjAuMC4wJyxcclxuICAgICAgaG1yOiB0cnVlLFxyXG4gICAgICBwcm94eToge1xyXG4gICAgICAgICcvYXBpJzoge1xyXG4gICAgICAgICAgLy8gdGFyZ2V0OiAnaHR0cDovLzE3Mi4xNi4xNy42Mzo5OTk1JywgLy8gJ2h0dHA6Ly8xNzIuMTYuMTcuMTkxOjk5OTUnLCAvLyAnaHR0cDovLzE3Mi4xNi4xNy42Mzo5OTk1JyxcclxuICAgICAgICAgIC8vIHRhcmdldDogJ2h0dHBzOi8vemh5bC1hZG1pbi10Lml0aGVpbWEubmV0L2FwaScsIC8vIFx1NkQ0Qlx1OEJENVx1NzNBRlx1NTg4M1xyXG4gICAgICAgICAgLy8gdGFyZ2V0OiAnaHR0cHM6Ly96aHlsLWFkbWluLml0aGVpbWEubmV0L2FwaScsIC8vIHBpcFx1NkI2M1x1NUYwRlx1NzNBRlx1NTg4M1xyXG4gICAgICAgICAgLy8gdGFyZ2V0OiAnaHR0cDovLzE3Mi4xNi4xNy42Mzo5OTk1JywgLy8gXHU1QzBGXHU1MTc1XHJcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vMTcyLjE2LjQzLjI0Ojk5OTUnLCAvLyBcdTVCQjZcdTRFNTBcclxuICAgICAgICAgIC8vIHRhcmdldDogJ2h0dHA6Ly8xNzIuMTYuMTcuMTkxOjk5OTUnLCAvLyBcdTZEMkFcdTZDRTJcclxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAgICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiBwYXRoLnJlcGxhY2UoL15cXC9hcGkvLCAnJylcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLE9BQU8sVUFBVTtBQUNqQixTQUFnQyxlQUFlO0FBQy9DLFNBQVMscUJBQXFCO0FBQzlCLE9BQU8scUJBQXFCO0FBQzVCLE9BQU8sWUFBWTtBQUNuQixPQUFPLGVBQWU7QUFFdEIsSUFBTSxNQUFNLFFBQVEsSUFBSTtBQUd4QixJQUFPLHNCQUFRLENBQUMsRUFBRSxLQUFLLE1BQTZCO0FBQ2xELFFBQU0sRUFBRSxjQUFjLElBQUksUUFBUSxNQUFNLEdBQUc7QUFDM0MsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sUUFBUSxDQUFDO0FBQUEsSUFDVCxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLEtBQUssUUFBUSxzRUFBc0UsT0FBTztBQUFBLE1BQ2pHO0FBQUEsSUFDRjtBQUFBLElBRUEsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osWUFBWTtBQUFBLFlBQ1YsTUFBTSw4QkFBOEIsS0FBSztBQUFBLGNBQ3ZDO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBLE1BQU07QUFBQSxVQUNOLG1CQUFtQjtBQUFBLFFBQ3JCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUVBLFNBQVM7QUFBQSxNQUNQLGdCQUFnQjtBQUFBLE1BQ2hCLE9BQU87QUFBQSxNQUNQLGNBQWM7QUFBQSxRQUNaLFVBQVU7QUFBQSxRQUNWLGNBQWM7QUFBQSxRQUNkLGFBQWE7QUFBQSxRQUNiLFdBQVc7QUFBQSxRQUNYLFFBQVE7QUFBQSxRQUNSLFlBQVk7QUFBQTtBQUFBO0FBQUE7QUFBQSxNQUlkLENBQUM7QUFBQSxNQUNELFVBQVU7QUFBQSxJQUNaO0FBQUEsSUFDQSxRQUFRO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixLQUFLO0FBQUEsTUFDTCxPQUFPO0FBQUEsUUFDTCxRQUFRO0FBQUEsVUFLTixRQUFRO0FBQUEsVUFFUixjQUFjO0FBQUEsVUFDZCxTQUFTLENBQUNBLFVBQVNBLE1BQUssUUFBUSxVQUFVLEVBQUU7QUFBQSxRQUM5QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
