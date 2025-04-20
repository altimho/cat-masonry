import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log(env);
  return {
    plugins: [
      react({
        jsxImportSource: '@emotion/react',
        babel: {
          plugins: ['@emotion/babel-plugin'],
        },
      }),
    ],
    server: {
      proxy: {
        '/api': {
          target: 'https://api.pexels.com',
          rewrite: (path) => path.replace(/^\/api/, '/v1'),
          changeOrigin: true,
          headers: {
            Authorization: env.PEXELS_API_KEY,
          },
        },
      },
    },
  };
});
