<template>
    <div class="dashboard">
        <!-- <div>{{ commonUtils.renderLwh(2,3,4, '$')}}</div> -->
        <div>{{ isEnglish }}</div>
        <!-- <el-input v-model="input" @focus="onInputFocus('tid')" placeholder="">
        </el-input>

        <div v-show="showKeyboard">
            <SimpleKeyboard ref="simpleKeyboard" @onChange="onChangeKeyboard" />
        </div> -->
        
        <!-- <div class="cus-keyboard"  @dblclick="() => {return false;}">
           <VueKeyborard  :defaultVal="'MO'" :text.sync="input" @accept="accept"></VueKeyborard>
        </div> -->

        <!-- <input type="text" placeholder="Text input" @focus="showKetboard" data-layout="normal" />
        <Keyboards :options="options"
         v-if="visible" 
        :layout="layout" :cancel="hide" :accept="accept" :input="input"></Keyboards> -->
        <div class="sum-layout">
            <div class="sum-block" v-for="item in layoutSum" :key="item.sumtitle">
                <div class="sum-title">
                    <span>{{ item.sumtitle }}</span>
                    <b :class="[item.class]">{{ item.num }}</b>
                </div>
                <div class="sum-row">
                    <label>{{ item.sumRow }}</label>
                    <b class="red">{{ item.price }}</b>
                </div>
                <div class="sum-row">
                    <label>{{ item.quantityYitle }}</label>
                    <b>{{ item.quantity }}</b>
                </div>
            </div>
        </div>

        <div class="chart-layout">
            <div class="chart-title">
                <span>Sale's Statistics - Last 30 Days</span>
            </div>
            <div class="chart-body">
                <div class="chart-sum">

                </div>
                <div class="chart-content">
                    <div class="chart-inner" id="salesChart"></div>
                </div>
            </div>
        </div>

        <div class="chart-layout">
            <div class="chart-title">
                <span>Days's Statistics - Last 30 Days</span>
            </div>
            <div class="chart-body">
                <div class="chart-sum">
                </div>
                <div class="chart-content">
                    <div class="chart-inner" id="dayChart"></div>
                </div>
            </div>
        </div>

        <div class="chart-layout">
            <div class="chart-title">
                <span>Days's Statistics - Last 30 Days</span>
            </div>
            <div class="chart-body">
                <div class="chart-sum">
                </div>
                <div class="chart-content">
                    <div class="chart-inner" id="stockChart"></div>
                </div>
            </div>
        </div>

    </div>
    <div>
        <font-awesome-icon icon="fa-solid fa-house" color="pink" />
        <font-awesome-icon icon="fa-brands fa-qq" />
        <font-awesome-icon icon="fa-brands fa-weixin" />
        <font-awesome-icon icon="fa-brands fa-github" />
        <i class="fa fa-camera-retro fa-3x"></i> fa-camera-retro
    </div>
    <div>Desktop2</div>
    <p>Welcome to your Electron application.</p>
    <router-link to="/signIn">登陆</router-link>
    <p>我用electron 版本号： {{ varsions }}</p>
    <el-input v-model="inputs" placeholder="Please input" />
    <el-button type="primary" @click="goSign">点解登陆</el-button>
    <el-button type="success" @click="showMessage">点击弹出</el-button>
    <el-button type="danger" @click="showErrorMessage">点击错误弹出</el-button>
    <!-- <div>
        <el-button type="primary" @click="openWindow('/product')">打开新的页面</el-button>
    </div> -->
    <div>
        <el-button type="primary" @click="showNote">点击Note</el-button>
    </div>
    <div>
        <el-button type="primary" @click="showAbout">点击关于页面</el-button>
    </div>

    <p id="output">Click it to see the effect in this interface.</p>
</template>
<script setup lang="ts">
import { map } from "lodash";
// import Highcharts from "@/runtime/highchart";
import { salesChartItems } from "./chart-test-items";

// import Highcharts from 'highcharts/es-modules/masters/highcharts.src.js';
import Highcharts from 'highcharts/es-modules/masters/highcharts.src';
// import 'highcharts/es-modules/masters/highcharts-more.src.js';
// import 'highcharts/es-modules/masters/modules/boost.src.js';
// import 'highcharts/es-modules/masters/modules/no-data-to-display.src.js';


// import { getCurrentInstance } from 'vue'
// 获取Component实例
const proxy = getCurrentInstance()?.proxy
// import { commonUtils } from "@/composables/common-utils";
// console.log(window.electron)
// console.log(window.api)
console.log(window.isEnglish)
console.log(proxy.isEnglish)
console.log(window.highcharts)
console.log(Highcharts)
// console.log(proxy.highcharts)
// let Highcharts = window.highcharts // proxy.highcharts
const input = ref<any>()
const visible = ref<boolean>(false)
const options = ref({
    useKbEvents: false,
    preventClickEvent: false
})
const layout = ref('normal')
const accept = (text: string) => {
    alert("Input text: " + text);
    hide();
}

const showKetboard = (e: any) => {
    input.value = e.target;
    layout.value = e.target.dataset.layout;

    if (!visible.value)
        visible.value = true
}

const hide = () => {
    visible.value = false;
}

const simpleKeyboard = ref<any>(null);
const showKeyboard = ref<boolean>(false)
const changeIpt = ref('')
const onInputFocus = (res: any) => {
    console.log(res)
    console.log(simpleKeyboard)
    showKeyboard.value = true
    changeIpt.value = res
    // 父组件调用子组件的方法
    simpleKeyboard.value?.onKeyPress('{clear}')
}
const onChangeKeyboard = (input: any) => {
    console.log(input)
    //   if (changeIpt.value == 'latheNumber') {
    //     this.toolParameter.latheNumber = input
    //   } else if (this.changeIpt == 'tid') {
    //     this.toolParameter.tid = input
    //   }
}
// 点击关闭隐藏键盘
const closekeyboard = () => {
    showKeyboard.value = false
}

const layoutSum = reactive(
    [
        { sumtitle: "Today's Sales", num: '234', class: 'red', sumRow: 'Sales Revenue', price: '$12323.12', quantityYitle: 'Sales Quantity', quantity: 3 },
        { sumtitle: "Last 30 Days' Sales", num: '4434', class: 'blue', sumRow: 'Sales Revenue', price: '$12323.12', quantityYitle: 'Sales Quantity', quantity: 3 },
        { sumtitle: "Inventory Overview", num: '4124', class: 'green', sumRow: 'Active Categories', price: '$12323.12', quantityYitle: 'Low Stock Categories', quantity: 3 },
        { sumtitle: "Purchases in the Last 30 Days", num: '1454', class: '', sumRow: 'Receiving Transactions', price: '$12323.12', quantityYitle: 'Received Quantity', quantity: 3 }
    ]
)
const varsions = ref<string | number>();
varsions.value = window.api?.electron || 0

window.api.setTitle('收银台的主页')

const inputs = ref('')
const keyboardText = ref<string>('')

const router = useRouter()
const goSign = () => {
    router.push('/signIn')
}
const showMessage = () => {
    window.api.showMessage('is successful')
}
const showErrorMessage = () => {
    window.api.showErrorMessage('Error title', 'error box show')
}
const showNote = () => {
    const NOTIFICATION_TITLE = 'Basic Notification'
    const NOTIFICATION_BODY = 'Notification from the Main process'
    window.api.showNote(NOTIFICATION_TITLE, NOTIFICATION_BODY)
}
const showAbout = () => {
    console.log('1222')
    window.api.createAboutWin()
}

let salesChart: any | null = null;
let stockChart: any | null = null;
let dayChart: any | null = null;

onMounted(() => {
    salesChart = Highcharts.chart('salesChart', {
        accessibility: {
            enabled: false
        },
        chart: {
            zoomType: "xy",
            type: "column",
            events: {
                load() { }
            }
        },
        credits: {
            enabled: false
        },
        title: {
            text: ""
        },
        xAxis: {
            allowDecimals: false, //不允许小数
            type: "category", //自定义X坐标类别
            showEmpty: false,
            categories: []
        },
        yAxis: [
            {
                title: {
                    enabled: false
                },
                showEmpty: true,
                opposite: true
            },
            {
                title: {
                    enabled: false
                }
            }
        ],
        tooltip: {
            split: true,
            shared: true
        },
        plotOptions: {
            area: {
                stacking: "normal",
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [
            {
                name: 'AA',
                dataLabels: {
                    enabled: true
                },
                color: "#50c5c9",
                type: "column",
                yAxis: 0,
                id: "amount",
                data: []
            },
            {
                name: 'BB',
                dataLabels: {
                    enabled: true
                },
                yAxis: 0,
                color: "#6bb762",
                type: "column",
                id: "paidAmount",
                data: []
            },
            {
                name: 'CC',
                dataLabels: {
                    enabled: true
                },
                yAxis: 1,
                color: "#1C84C6",
                type: "spline",
                id: "orderCount",
                data: []
            }
        ]
    })

    bindSaleChart();

    dayChart = Highcharts.chart('dayChart', {
        accessibility: {
            enabled: false
        },
        chart: {
            zoomType: 'xy',
            type: "column",
        },
        title: {
            text: '杭州月平均温度和降雨量'
        },
        subtitle: {
            // text: '数据来源: WorldClimate.com'
        },
        xAxis: [{
            // categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            //     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            // crosshair: true,
            categories: [],
            allowDecimals: false, //不允许小数
            type: "category", //自定义X坐标类别
            showEmpty: false,
        }],
        yAxis: [{ // Primary yAxis
            labels: {
                format: '{value}°C',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            title: {
                enabled: false,
                text: '温度',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            }
        }, { // Secondary yAxis
            title: {
                enabled: false,
                text: '降雨量',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            labels: {
                format: '{value} mm',
                style: {
                    color: Highcharts.getOptions().colors[0]
                }
            },
            opposite: true
        }],
        tooltip: {
            split: true,
            shared: true
        },
        legend: {
            layout: 'vertical',
            align: 'left',
            x: 120,
            verticalAlign: 'top',
            y: 100,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
        },
        series: [{
            name: '降雨量',
            type: 'column',
            yAxis: 1,
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
            tooltip: {
                valueSuffix: ' mm'
            }
        },
        {
            name: '温度',
            type: 'spline',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
            tooltip: {
                valueSuffix: '°C'
            }
        }]
    });

    bindDayChart()

    //stockChart chart

    stockChart = Highcharts.chart('stockChart', {
        accessibility: {
            enabled: false
        },
        chart: {
            zoomType: "xy",
            type: "column",
            events: {
                load() { }
            }
        },
        credits: {
            enabled: false
        },
        title: {
            text: ""
        },
        xAxis: {
            allowDecimals: false, //不允许小数
            type: "category", //自定义X坐标类别
            showEmpty: false,
            categories: []
        },
        yAxis: [
            {
                title: {
                    enabled: false
                },
                showEmpty: true,
                opposite: true
            },
            {
                title: {
                    enabled: false
                }
            }
        ],
        tooltip: {
            split: true,
            shared: true
        },
        plotOptions: {
            area: {
                stacking: "normal",
                dataLabels: {
                    enabled: true
                }
            }
        },
        series: [
            {
                name: 'AA',
                dataLabels: {
                    enabled: true
                },
                color: "#50c5c9",
                type: "column",
                yAxis: 0,
                id: "amount",
                data: []
            },
            {
                name: 'BB',
                dataLabels: {
                    enabled: true
                },
                yAxis: 0,
                color: "#6bb762",
                type: "column",
                id: "paidAmount",
                data: []
            },
            {
                name: 'CC',
                dataLabels: {
                    enabled: true
                },
                yAxis: 1,
                color: "#1C84C6",
                type: "spline",
                id: "orderCount",
                data: []
            }
        ]
    });

    bindStockChart();
})

const bindSaleChart = () => {
    if (salesChart) {
        salesChart.xAxis[0].setCategories(
            map(salesChartItems, (o) => {
                return o.date;
            })
        )

        salesChart.update({
            series: [
                {
                    id: "amount",
                    data: map(salesChartItems, (o) => {
                        return o.amount;
                    })
                },
                {
                    id: "paidAmount",
                    data: map(salesChartItems, (o) => {
                        return o.paidAmount;
                    })
                },
                {
                    id: "orderCount",
                    data: map(salesChartItems, (o) => {
                        return o.orderCount;
                    })
                }
            ]
        })
    }
}

const bindStockChart = () => {
    if (stockChart) {
        stockChart.xAxis[0].setCategories(
            map(salesChartItems, (o) => {
                return o.date;
            })
        )

        stockChart.update({
            series: [
                {
                    id: "amount",
                    data: map(salesChartItems, (o) => {
                        return o.amount;
                    })
                },
                {
                    id: "paidAmount",
                    data: map(salesChartItems, (o) => {
                        return o.paidAmount;
                    })
                },
                {
                    id: "orderCount",
                    data: map(salesChartItems, (o) => {
                        return o.orderCount;
                    })
                }
            ]
        })
    }
}

const bindDayChart = () => {
    if (dayChart) {
        dayChart.xAxis[0].setCategories(
            map(salesChartItems, (o) => {
                return o.date;
            })
        )


        // salesChart.update({
        //     series: [
        //         {
        //             id: "amount",
        //             data: map(salesChartItems, (o) => {
        //                 return o.amount;
        //             })
        //         },
        //         {
        //             id: "paidAmount",
        //             data: map(salesChartItems, (o) => {
        //                 return o.paidAmount;
        //             })
        //         },
        //         {
        //             id: "orderCount",
        //             data: map(salesChartItems, (o) => {
        //                 return o.orderCount;
        //             })
        //         }
        //     ]
        // })
    }
}

// import Highcharts from 'highcharts/es-modules/masters/highcharts.src.js';
// import 'highcharts/es-modules/masters/highcharts-more.src.js';
// import 'highcharts/es-modules/masters/modules/boost.src.js';
// import 'highcharts/es-modules/masters/modules/no-data-to-display.src.js';
// console.log(Highcharts);

// const chart = Highcharts.chart('container', {
//     series: [{
//         type: 'line',
//         data: [2, 3, 5, 7, 11, 13, 17, 19]
//     }]
// });

// console.log(chart);
// console.log(Highcharts.Point.prototype.highlight)
// console.log(this.series)
</script>  
<style lang="scss" scoped>
@import './dashboard.scss';
</style>