<template>
  <div class="index-conntainer">
    <el-card class="card-work" body-style=" padding-top: 0px">
      <h2>双碳业务统一智能分析系统</h2>
      <p>
        系统基于vue3与Flask开发，将图数据库与关系型数据库结合，支持双碳统一知识图谱的二维与三维的查看、知识图谱的关键词搜索以及智能回复功能。
      </p>
    </el-card>
    <div class="content">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="10">
          <Echarts
            :index="1"
            :style="{
              height: '320px',
              width: '100%',
            }"
            :options="optionFirst"
          />
          <div class="EchartsWork">
            <Echarts
              :index="2"
              :style="{
                height: '300px',
                width: '100%',
              }"
              :options="optionSecond"
            />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="9" :xl="14">
          <el-card>
            <div id="liaoningmap"></div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="7" :xl="8">
          <Echarts
            :index="3"
            :style="{
              height: '320px',
              width: '100%',
            }"
            :options="optionThird"
          />
          <div class="EchartsWork">
            <Echarts
              :index="4"
              :style="{
                height: '300px',
                width: '100%',
              }"
              :options="optionFourth"
            />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Index',
  };
</script>
<script setup>
  import { ref, computed, reactive, onMounted, watch } from 'vue';
  import * as echarts from 'echarts/core';
  import Echarts from '@/components/Echarts/index.vue';
  import { getAlldata } from '@/api/data';
  import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    VisualMapComponent,
    GeoComponent,
  } from 'echarts/components';
  import { MapChart } from 'echarts/charts';
  import { CanvasRenderer } from 'echarts/renderers';
  import liaoningJson from '@/assets/liaoning/liaoning.json';
  echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    VisualMapComponent,
    GeoComponent,
    MapChart,
    CanvasRenderer,
  ]);

  const AllData = ref({
    dataMap: [],
    electricity: [],
    industry: [[], []],
    analysis: [[]],
    power: [[], [], [], [], [], []],
  });
  let Mapchart = reactive({});
  const load_data = async function () {
    const { data } = await getAlldata();
    AllData.value = data;
    console.log(data);
  };
  const dataMap = computed(() => AllData.value.dataMap);
  const dataElectricity = computed(() => AllData.value.electricity);
  const dataIndustryEmission = computed(() => AllData.value.industry[0]);
  const dataIndustryElectricity = computed(() => AllData.value.industry[1]);
  const dataAnalysis = computed(() => AllData.value.analysis[0]);
  const dataPowerFirst = computed(() => AllData.value.power[0]);
  const dataPowerSecond = computed(() => AllData.value.power[1]);
  const dataPowerThird = computed(() => AllData.value.power[2]);
  const dataPowerFourth = computed(() => AllData.value.power[3]);
  const dataPowerFifth = computed(() => AllData.value.power[4]);
  const dataPowerSixth = computed(() => AllData.value.power[5]);
  const optionFirst = reactive({
    title: {
      x: 'center',
      text: '发电量',
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      // x: 'center',
      top: '25',
      orient: 'horizontal',
      right: '9',
      show: true,
      textStyle: {
        fontSize: 12,
      },
      data: ['电量', '火电', '水电', '风电', '核电', '太阳能'],
    },
    grid: {
      top: '80',
      left: '5%',
      right: '4%',
      bottom: '1%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['2015', '2016', '2017', '2018', '2019', '2020', '2021'],
    },
    yAxis: {
      type: 'value',
      name: '百万千瓦时',
      min: 0,
      max: 3000,
      interval: 500,
      // axisLabel: {
      //   formatter: '{value}',
      // },
    },
    series: [
      {
        name: '电量',
        type: 'line',
        // stack: 'Total',
        data: dataPowerFirst,
        smooth: true,
      },
      {
        name: '火电',
        type: 'line',
        // stack: 'Total',
        data: dataPowerSecond,
        smooth: true,
      },
      {
        name: '水电',
        type: 'line',
        // stack: 'Total',
        data: dataPowerThird,
        smooth: true,
      },
      {
        name: '风电',
        type: 'line',
        // stack: 'Total',
        data: dataPowerFourth,
        smooth: true,
      },
      {
        name: '核电',
        type: 'line',
        // stack: 'Total',
        data: dataPowerFifth,
        smooth: true,
      },
      {
        name: '太阳能',
        type: 'line',
        // stack: 'Total',
        data: dataPowerSixth,
        smooth: true,
      },
    ],
  });

  const optionSecond = reactive({
    title: {
      text: '行业用电量及碳排放量',
      x: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        crossStyle: {
          color: '#999',
        },
      },
    },
    legend: {
      top: '25',
      orient: 'horizontal',
      // right: '9',
      data: ['电量', '碳排放量'],
    },
    xAxis: [
      {
        type: 'category',
        data: ['工业', '建筑业', '金融业', '房地产业', '农、林、牧、渔业', '住宿和餐饮业'],
        axisPointer: {
          type: 'shadow',
        },
        axisLabel: { interval: 0, rotate: 30 },
      },
    ],
    yAxis: [
      {
        type: 'value',
        name: '电量(kw/h)',
        min: 50000,
        max: 350000,
        interval: 50000,
        axisLabel: {
          formatter: '{value}',
        },
      },
      {
        type: 'value',
        name: '碳排放量(万吨)',
        min: 0,
        max: 300,
        interval: 50,
        axisLabel: {
          formatter: '{value}',
        },
      },
    ],
    grid: {
      top: '20%',
      left: '13%',
      bottom: '20%',
    },
    series: [
      {
        name: '碳排放量',
        type: 'bar',
        barWidth: 30,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' 万吨';
          },
        },
        data: dataIndustryEmission,
        // data: [200000.0, 250000.9, 270000.0, 233000.2, 235000.6, 176000.7, 135000.6],
      },
      {
        name: '电量',
        type: 'line',
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value) {
            return value + ' KW/h';
          },
        },
        data: dataIndustryElectricity,
        // data: [100.2, 200.3, 230.4, 230.0, 160.5, 120.0, 60.2],
      },
    ],
  });
  const optionThird = reactive({
    title: {
      text: '发电占比',
      x: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'horizontal',
      top: '30',
    },
    series: [
      {
        top: '60',
        type: 'pie',
        radius: '70%',
        data: dataElectricity,
        // data: [
        //   { value: 50963, name: '火电' },
        //   { value: 12318, name: '水电' },
        //   { value: 2944, name: '核电' },
        //   { value: 3553, name: '风电' },
        //   { value: 1536, name: '太阳能发电' },
        // ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  });
  const optionFourth = reactive({
    title: {
      text: '用电情况',
      x: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      // prettier-ignore
      data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45'],
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} W',
      },
      axisPointer: {
        snap: true,
      },
    },
    grid: {
      top: '25%',
      left: '15%',
    },
    visualMap: {
      show: false,
      dimension: 0,
      pieces: [
        {
          lte: 6,
          color: 'green',
        },
        {
          gt: 6,
          lte: 8,
          color: 'red',
        },
        {
          gt: 8,
          lte: 14,
          color: 'green',
        },
        {
          gt: 14,
          lte: 17,
          color: 'red',
        },
        {
          gt: 17,
          color: 'green',
        },
      ],
    },
    series: [
      {
        top: '40%',
        name: '用电情况',
        type: 'line',
        smooth: true,
        // prettier-ignore
        data: dataAnalysis,
        z: 3,
        markArea: {
          itemStyle: {
            color: 'rgba(255, 173, 177, 0.4)',
          },
          data: [
            [
              {
                name: '早高峰',
                xAxis: '07:30',
              },
              {
                xAxis: '10:00',
              },
            ],
            [
              {
                name: '晚高峰',
                xAxis: '17:30',
              },
              {
                xAxis: '21:15',
              },
            ],
          ],
        },
      },
    ],
  });
  const option = reactive({
    title: {
      text: '辽宁省碳排放情况',
      x: 'center',
      // subtext: 'Data from Wikipedia',
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}<br/>{c} (p / km2)',
    },
    visualMap: {
      min: 800,
      max: 50000,
      text: ['High', 'Low'],
      realtime: false,
      calculable: true,
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered'],
      },
    },
    series: [
      {
        name: '辽宁省各市碳排放密度',
        type: 'map',
        map: 'Liaoning',
        label: {
          show: true,
        },
        data: dataMap,
      },
    ],
  });
  onMounted(() => {
    load_data();
    const chartDom = document.getElementById('liaoningmap');
    echarts.registerMap('Liaoning', liaoningJson);
    Mapchart = echarts.init(chartDom);
    Mapchart.setOption(option);
  });
  watch(
    option,
    (newdata) => {
      Mapchart.clear();
      Mapchart.setOption(newdata, true);
    },
    { deep: true }
  );
</script>
<style scoped>
  .card-work {
    height: 100px;
    width: 100%;
    margin-bottom: 10px;
  }
  .EchartsWork {
    padding-top: 10px;
  }
</style>

<style lang="scss" scoped>
  #liaoningmap {
    width: 100%;
    height: 630px;
  }
</style>
