import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// eslint-disable-next-line import/no-unresolved
import Components from 'unplugin-vue-components/vite'
// eslint-disable-next-line import/no-unresolved
import { VantResolver, ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// eslint-disable-next-line import/no-unresolved
import AutoImport from 'unplugin-auto-import/vite'
import { visualizer } from "rollup-plugin-visualizer";
import path from 'path'
import { fileURLToPath } from 'node:url';

const plugins: any[] = [] ;
  // 打包依赖展示
  plugins.push(
    visualizer({
        emitFile: true,
        filename:'stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
    })
);
// https://vitejs.dev/config
export default defineConfig({
    plugins: [vue(),

    Components({
        extensions: ['vue', 'md'],
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
        dts: './src/types/components.d.ts', //true
        dirs: ['src/components'],
        resolvers: [
            ElementPlusResolver({ importStyle: false }),
            // VantResolver({ importStyle: false })
        ],
        deep: true
    }),
    AutoImport({
        imports: ['vue', 'vue-router'
            ,
            {
                // '@/router/index.ts': ['pageName'],
                '@/runtime/language.ts': ['lang']
            }],
        dts: './src/types/auto-iomport.d.ts',
        dirs: ["src/composables"],
        eslintrc: {
            enabled: false,
            filepath: './.eslintrc-auto-import.json', // default  ./.eslintc-auto-import.json
            globalsPropValue: true,
        },
        resolvers: [ElementPlusResolver({ importStyle: false })],
    }),
    ...plugins
    ],
    css: {
        preprocessorOptions: {
            scss: {
                charset: false,
                additionalData: `@import "./src/assets/styles/mixins.scss";`
            }
        }
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
            // '~/': `${path.resolve(__dirname, 'src')}`
        }
    },
    // base: "./",//打包上传服务器的相对路径
});
