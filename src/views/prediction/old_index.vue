<template>
  <div class="index-conntainer">
    <el-card class="card-work" body-style=" padding-top: 0px">
      <h2>碳排放态势感知</h2>
      <p>
        以多能源系统的碳排放分析技术中构建的碳排放传导、分配模型为基础，在各个分支及节点上建立上述的碳排放态势感知模型，记录分析相应分支或节点上的相关数据并进行汇总。
      </p>
    </el-card>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card style="height: 95px; margin-top: 10px; margin-bottom: 10px">
          <div style="display: inline-block; margin-right: 10px; font-size: 17px"
            >请上传csv格式文件:</div
          >
          <el-upload
            action="http://localhost:5000/api/prediction"
            ref="uploadRef"
            class="upload-file"
            :auto-upload="false"
            limit="1"
            :on-success="uploadFileSuccess"
          >
            <template #trigger>
              <el-button size="small" type="primary" style="margin-left: 0px">选择文件</el-button>
            </template>
            <!-- <el-button class="ml-3" type="success" @click="submitUpload">上传文件</el-button> -->
          </el-upload>
          <el-select
            v-model="inputValue"
            placeholder="选择预测天数"
            size="small"
            style="width: 15%; margin-left: 10px"
            clearable="true"
            
          >
            <el-option
              v-for="item in Inputoptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-card>
        <Echarts
          :index="1"
          :style="{
            height: '600px',
            width: '100%',
          }"
          :options="option"
        />
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" style="margin-top: 10px">
        <Echarts
          :index="2"
          :style="{
            height: '710px',
            width: '100%',
          }"
          :options="optionAll"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'Index',
  };
</script>
<script setup>
  import { ref, computed, reactive, onMounted, watch } from 'vue';
  import Echarts from '@/components/Echarts/index.vue';
  import liaoningData from '@/assets/liaoning/liaoningData.json';
  // import { predictionData } from '@/api/prediction';
  // 文件上传成功时的钩子
  function uploadFileSuccess(response, file) {
    file.response = response.data;
    // const { datawork } = response.data;
    PreData.value = file.response;
    console.log(PreData.value);
  }
  const DataLiaoning = liaoningData;
  const inputValue = ref('');
  const PreData = ref({
    Prework: [[], [], []],
  });
  const Inputoptions = [
    {
      value: '1',
      label: '1天',
    },
    {
      value: '2',
      label: '2天',
    },
    {
      value: '3',
      label: '3天',
    },
    {
      value: '4',
      label: '4天',
    },
    {
      value: '5',
      label: '5天',
    },
    {
      value: '6',
      label: '6天',
    },
  ];
  // const load_data = async function () {
  //   const { data } = await predictionData();
  //   PreData.value = data;
  //   console.log(data);
  // };
  const dataPreFirst = computed(() => PreData.value.Prework[0]);
  const dataPreSecond = computed(() => PreData.value.Prework[1]);
  const dataPreThird = computed(() => PreData.value.Prework[2]);

  const option = reactive({
    title: {
      x: 'center',
      text: '单日碳排放量预测',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
      },
    },
    xAxis: {
      axisLabel: {
        interval: 0,
        rotate: 30,
      },
      type: 'category',
      data: dataPreFirst,
    },
    yAxis: {
      min: 0.5,
      max: 1,
      minInterval: 0.1,
      type: 'value',
    },
    series: [
      {
        name: '日碳排放量',
        data: dataPreSecond,
        type: 'line',
        color: 'green',
      },
      {
        name: '日碳排放量预测值',
        type: 'line',
        data: dataPreThird,
        lineStyle: {
          normal: {
            type: 'dotted',
            color: '#76ff7c',
          },
        },
        itemStyle: {
          normal: {
            color: '#77d58b', //折线点的颜色
          },
        },
      },
    ],
  });
  const optionAll = reactive({
    title: {
      text: '辽宁省日碳排放量',
      left: '1%',
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '10%',
    },
    xAxis: {
      data: DataLiaoning.map(function (item) {
        return item[0];
      }),
    },
    yAxis: {},
    dataZoom: [
      {
        startValue: '2020-06-01',
      },
      {
        type: 'inside',
      },
    ],
    visualMap: {
      top: 0,
      right: 10,
      orient: 'horizontal',
      show: false,
      pieces: [
        {
          gt: 0,
          lte: 0.2,
          color: '#93CE07',
        },
        {
          gt: 0.2,
          lte: 0.4,
          color: '#FBDB0F',
        },
        {
          gt: 0.4,
          lte: 0.6,
          color: '#FC7D02',
        },
        {
          gt: 0.6,
          lte: 0.8,
          color: '#FD0100',
        },
        {
          gt: 0.8,
          lte: 1,
          color: '#AA069F',
        },
        {
          gt: 1,
          color: '#AC3B2A',
        },
      ],
      outOfRange: {
        color: '#999',
      },
    },
    series: {
      name: '辽宁日碳排放量',
      type: 'line',
      data: DataLiaoning.map(function (item) {
        return item[1];
      }),
      markLine: {
        silent: true,
        lineStyle: {
          color: '#333',
        },
        data: [
          {
            yAxis: 0.2,
          },
          {
            yAxis: 0.4,
          },
          {
            yAxis: 0.6,
          },
          {
            yAxis: 0.8,
          },
          {
            yAxis: 1,
          },
        ],
      },
    },
  });
</script>
<style scoped></style>

<style lang="scss" scoped>
  .upload-file {
    display: inline-block;
  }
</style>
