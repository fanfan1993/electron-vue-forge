<!-- <template>
    <div class="graph">
      <div class="buttons">
        <p>
          <b-button variant="outline-secondary" @click="viewGraph('column')">縦棒グラフ</b-button>
        </p>
        <p>
          <b-button variant="outline-secondary" @click="viewGraph('bar')">横棒グラフ</b-button>
        <p>
          <b-button variant="outline-secondary" @click="viewGraph('line')">線グラフ</b-button>
        </p>
        <p>
          <b-button variant="outline-secondary" @click="viewGraph('pie')">円グラフ</b-button>
        </p>
      </div>
      <div id="graph">表示したいグラフを選択してください。</div>
    </div>
  </template>
  
  <script lang="ts" setup>
import Highcharts from 'highcharts/es-modules/masters/highcharts.src';
  
  export default class Graph extends {
    public get Data(): any {
      return [];
    }
    viewGraph(graphType: string) {
      this.Data.array = [];
      this.Data.graphType = graphType;
      for (let i = 0; i < 4; i++) {
        this.Data.array.push(Math.round(Math.random() * 100));
      }
      this.graph();
    }
  
    graph() {
      Highcharts.chart({
        chart: {
          renderTo: "graph",
          type: this.Data.graphType
        },
        credits: {
          text: 'Rockhopper-Penguin',
          href: 'https://github.com/rockhopper-penguin'
        },
        title: false as Highcharts.TitleOptions,
        xAxis: {
          categories: this.Data.categories,
          crosshair: true
        } as Highcharts.XAxisOptions,
        yAxis: {
          title: false,
          labels: {
            format: "{value}"
          },
          opposite: false
        } as Highcharts.YAxisOptions,
        series: [
          {
            name: "test",
            type: this.Data.graphType,
            data: this.Data.array
          }
        ]
      });
    }
} -->