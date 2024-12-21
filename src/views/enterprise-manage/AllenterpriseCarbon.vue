<template>
  <div class="index-conntainer">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card class="card-work">
          <h2>宝山钢铁股份有限公司</h2>
          <p
            >宝山钢铁股份有限公司（简称“宝钢股份”）是中国最大、最现代化的钢铁联合企业。《世界钢铁业指南》评定宝钢股份在世界钢铁行业的综合竞争力为前三名。</p
          >
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
        <div style="margin-top: 10px">
          <chart1 :carbon="CarbonOneYearData.carbon1" :minHistory="CarbonOneYearData.minHistory1" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="15" :lg="15" :xl="15">
        <div style="margin-top: 10px">
          <Echarts
            :index="1"
            :style="{
              height: '220px',
              width: '100%',
            }"
            :options="option1"
          />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
        <div style="margin-top: 10px">
          <Echarts
            :index="2"
            :style="{
              height: '220px',
              width: '100%',
            }"
            :options="option2"
          />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card style="margin-top: 10px">
          <h2>东电沈阳热电有限公司</h2>
          <p
            >东电沈阳热电有限责任公司是1998-12-08注册成立的有限责任公司(国有控股)，注册地址位于沈阳经济技术开发区四号街11甲2号。东电沈阳热电有限责任公司的统一社会信用代码/注册号是912101064106189621，企业法人赵成明，目前企业处于开业状态。东电沈阳热电有限责任公司的经营范围是：热力、电力生产、销售；粉煤灰开发与综合利用；检修及调试（依法须经批准的项目，经相关部门批准后方可开展经营活动。）。</p
          >
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
        <div style="margin-top: 10px">
          <chart1 :carbon="CarbonOneYearData.carbon2" :minHistory="CarbonOneYearData.minHistory2" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="15" :lg="15" :xl="15">
        <div style="margin-top: 10px">
          <Echarts
            :index="3"
            :style="{
              height: '220px',
              width: '100%',
            }"
            :options="option3"
          />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
        <div style="margin-top: 10px">
          <Echarts
            :index="4"
            :style="{
              height: '220px',
              width: '100%',
            }"
            :options="option4"
          />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <el-card style="margin-top: 10px">
          <h2>国家能源集团辽宁电力沈西热电厂</h2>
          <p
            >电力、热力生产与销售；电源、热源项目开发、建设、管理；电能设备及配套设施的施工、检修及技术咨询；与电力相关的环保技术、综合节能技术研发及技术咨询。（依法须经批准的项目，经相关部门批准后方可开展经营活动。）。</p
          >
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
        <div style="margin-top: 10px">
          <chart1 :carbon="CarbonOneYearData.carbon3" :minHistory="CarbonOneYearData.minHistory3" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="15" :lg="15" :xl="15">
        <div style="margin-top: 10px">
          <Echarts
            :index="5"
            :style="{
              height: '220px',
              width: '100%',
            }"
            :options="option5"
          />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
        <div style="margin-top: 10px">
          <Echarts
            :index="6"
            :style="{
              height: '220px',
              width: '100%',
            }"
            :options="option6"
          />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'enterpriseAnsnlysis',
  };
</script>
<script setup>
  import { ref, reactive } from 'vue';
  import Echarts from '@/components/Echarts/index.vue';
  import chart1 from './components/page1/Chart1.vue';
  const colors = ['#84a2fe', '#22c3aa', '#7bd9a5'];
  const CarbonOneYearData = reactive({
    carbon1: 135600,
    minHistory1: 103465,
    carbon2: 122300,
    minHistory2: 93482,
    carbon3: 115704,
    minHistory3: 110324,
  });
  const option1 = reactive({
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
        data: [103, 103, 100, 103, 1800, 1830, 1870],
        smooth: true,
      },
      {
        name: '火电',
        type: 'line',
        // stack: 'Total',
        data: [101, 101, 100, 101, 1430, 1500, 1500],
        smooth: true,
      },
      {
        name: '水电',
        type: 'line',
        // stack: 'Total',
        data: [100, 100, 100, 100, 490, 490, 490],
        smooth: true,
      },
      {
        name: '风电',
        type: 'line',
        // stack: 'Total',
        data: [99, 99, 100, 99, 390, 390, 390],
        smooth: true,
      },
      {
        name: '核电',
        type: 'line',
        // stack: 'Total',
        data: [98, 98, 98, 98, 98, 98, 98],
        smooth: true,
      },
      {
        name: '太阳能',
        type: 'line',
        // stack: 'Total',
        data: [97, 97, 100, 197, 197, 197, 198],
        smooth: true,
      },
    ],
  });
  const option2 = reactive({
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
        data: [
          { value: 50963, name: '火电' },
          { value: 12318, name: '水电' },
          { value: 2944, name: '核电' },
          { value: 3553, name: '风电' },
          { value: 1536, name: '太阳能发电' },
        ],
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
  const option3 = reactive({
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
        data: [103, 103, 100, 103, 1750, 1930, 1970],
        smooth: true,
      },
      {
        name: '火电',
        type: 'line',
        // stack: 'Total',
        data: [101, 101, 100, 101, 1420, 1500, 1450],
        smooth: true,
      },
      {
        name: '水电',
        type: 'line',
        // stack: 'Total',
        data: [100, 100, 100, 100, 390, 390, 390],
        smooth: true,
      },
      {
        name: '风电',
        type: 'line',
        // stack: 'Total',
        data: [99, 99, 100, 99, 190, 190, 190],
        smooth: true,
      },
      {
        name: '核电',
        type: 'line',
        // stack: 'Total',
        data: [98, 98, 98, 98, 98, 98, 98],
        smooth: true,
      },
      {
        name: '太阳能',
        type: 'line',
        // stack: 'Total',
        data: [97, 97, 100, 97, 97, 97, 98],
        smooth: true,
      },
    ],
  });
  const option4 = reactive({
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
        data: [
          { value: 60963, name: '火电' },
          { value: 22318, name: '水电' },
          { value: 12944, name: '核电' },
          { value: 7553, name: '风电' },
          { value: 4536, name: '太阳能发电' },
        ],
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
  const option5 = reactive({
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
        data: [103, 103, 100, 103, 1900, 1930, 1970],
        smooth: true,
      },
      {
        name: '火电',
        type: 'line',
        // stack: 'Total',
        data: [101, 101, 100, 101, 1500, 1500, 1500],
        smooth: true,
      },
      {
        name: '水电',
        type: 'line',
        // stack: 'Total',
        data: [100, 100, 100, 100, 290, 290, 290],
        smooth: true,
      },
      {
        name: '风电',
        type: 'line',
        // stack: 'Total',
        data: [99, 99, 100, 99, 190, 190, 190],
        smooth: true,
      },
      {
        name: '核电',
        type: 'line',
        // stack: 'Total',
        data: [98, 98, 98, 98, 98, 98, 98],
        smooth: true,
      },
      {
        name: '太阳能',
        type: 'line',
        // stack: 'Total',
        data: [97, 97, 100, 97, 97, 97, 98],
        smooth: true,
      },
    ],
  });
  const option6 = reactive({
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
        data: [
          { value: 43963, name: '火电' },
          { value: 10318, name: '水电' },
          { value: 5982, name: '核电' },
          { value: 4541, name: '风电' },
          { value: 2576, name: '太阳能发电' },
        ],
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
</script>
