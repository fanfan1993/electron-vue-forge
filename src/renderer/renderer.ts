/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

// eslint-disable-next-line import/no-unresolved
import '../assets/styles/main.scss';
// import "vant/lib/index.css";
import 'element-plus/dist/index.css';
// import { startup as vueStartup } from './vue.main'


import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';
import { createPinia } from "pinia";
import { identityUtils } from '../runtime/identity';
import FontAwesomeIcon, { setupComponents } from './fontawesome'

// import Highcharts from 'highcharts/es-modules/masters/highcharts';
// import Highcharts from "highcharts";
// import Highcharts from 'highcharts/es-modules/highcharts.js';
// import Highcharts from 'highcharts/es-modules/masters/highcharts';
const app = createApp(App);
app.use(createPinia());
// app.use(Highcharts);

// import * as Highcharts from 'highcharts';

// declare module 'highcharts' {
//     interface Point {
//         highlight (event: Highcharts.PointerEventObject): void;
//     }
// }

// Highcharts.Point.prototype.highlight = function (
//     event: Highcharts.PointerEventObject
// ): void {
//     event = this.series.chart.pointer.normalize(event);
//     this.onMouseOver(event);
//     this.series.chart.tooltip.refresh(this);
//     this.series.chart.xAxis[0].drawCrosshair(event, this);
// };
window.router = router;

const language = identityUtils.getLanguage();
app.config.globalProperties.isEnglish = language.isEnglish();
app.config.globalProperties.lang = lang;
app.config.globalProperties.highcharts = lang;

window.isEnglish = language.isEnglish();
setupComponents(app)

app.use(router).mount('#app')

// import * as Highcharts from 'highcharts';
import Highcharts from "highcharts";
import MapsModule from "highcharts/modules/map";
import StockModule from "highcharts/modules/stock";
import GanttModule from "highcharts/modules/gantt";

// In order to use Highcharts Maps we need to
// wrap Highcharts with the correct module:
MapsModule(Highcharts);
StockModule(Highcharts)
GanttModule(Highcharts);

// Use the HighchartsVue plugin, register <highcharts> component
// @ts-ignore
app.use(Highcharts)

app.config.globalProperties.highcharts = Highcharts;
window.highcharts = Highcharts;

declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        isEnglish: boolean;
        lang: (l: L | { zh: string, en: string }) => string;
        // utils: Utils;
        // imageUtils: ImageUtils;
        // commonUtils: CommonUtils;
        // dialogUtils: DialogUtils;
    }
}