import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
// import { MakerDMG } from "@electron-forge/maker-dmg";
import { VitePlugin } from '@electron-forge/plugin-vite';
import path from 'path';

const config: ForgeConfig = {
  packagerConfig: {
    name:"ELectron-App",
    asar: true,
    icon: './logo/logo',
    // icon: path.join(process.cwd(), "ico", "icon.icns"),
    // extraResource: [
    //   path.join(process.cwd(), "icon", "icon.icns"),
    // ],
  },
  rebuildConfig: {},
  makers: [
    new MakerSquirrel({
      authors: "yf",
      description: "xxx",
      noMsi:true,
      // setupIcon:'./resources/icon.png',
      // iconUrl: 'http://example.com/favicon.ico'
    }), 
    // new MakerDMG({
    //   icon: path.join(process.cwd(), "icon", "icon.icns"),
    //   format: "ULFO",
    // }),
    new MakerZIP({}, ['darwin']), 
    new MakerRpm({}), 
    new MakerDeb({})
  ],
  plugins: [
    new VitePlugin({
      // `build` can specify multiple entry builds, which can be Main process, Preload scripts, Worker process, etc.
      // If you are familiar with Vite configuration, it will look really familiar.
      build: [
        {
          // `entry` is just an alias for `build.lib.entry` in the corresponding file of `config`.
          entry: 'src/main/main.ts',
          config: 'vite.main.config.ts',
        },
        {
          entry: 'src/preload/preload.ts',
          config: 'vite.preload.config.ts',
        },
      ],
      renderer: [
        {
          name: 'main_window',
          config: 'vite.renderer.config.ts',
        },
      ],
    }),
  ],
};

export default config;
