<template>
  <div class="index-conntainer">
    <div class="content">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
          <!-- 全部结点 -->
          <div class="search">
            <el-input
              v-model="searchKey"
              placeholder="请输入你的搜索内容"
              class="input-with-select"
              @keyup.enter.native="handleSearchData"
            >
              <template #append>
                <el-button :icon="Search" @click="handleSearchData" />
              </template>
            </el-input>
          </div>
          <el-divider></el-divider>
          <h3>{{ title }}</h3>

          <Echarts
            :index="1"
            :style="{
              height: '500px',
              width: '800px',
            }"
            :options="search"
          />
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <el-card class="card" shadow="hover">
            <Echarts
              :style="{
                height: '580px',
              }"
              :options="option"
            />
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<!-- <script>
  export default {
    name: 'Index',
  };
</script> -->

<script setup>
  import { ref, computed, reactive, onBeforeMount } from 'vue';

  import Echarts from '@/components/Echarts/index.vue';
  import { searchwork } from '@/api/search';
  import 'echarts-wordcloud';
  import { Search } from '@element-plus/icons-vue';
  const SearchData = ref({ data: [], links: [] });

  const title = '搜索结果';

  const searchKey = ref('');

  const nodes = computed(() =>
    SearchData.value.data.map(function (node, idx) {
      node.id = idx;
      return node;
    })
  );
  const links = computed(() => SearchData.value.links);

  const handleSearchData = async () => {
    console.log(1);
    const { data } = await searchwork({ key: searchKey.value });
    SearchData.value = data;
    console.log(data);
  };

  const colorList = [
    '#e6a23c',
    '#67c23a',
    '#409EFF',
    '#f56c6d',
    '#a650fe',
    '#5470c6',
    '#91cc75',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#ea7ccc',
  ];

  const search = reactive({
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    color: [
      '#e6a23c',
      '#67c23a',
      '#409EFF',
      '#f56c6d',
      '#a650fe',
      '#5470c6',
      '#91cc75',
      '#fac858',
      '#ee6666',
      '#73c0de',
      '#3ba272',
      '#fc8452',
      '#9a60b4',
      '#ea7ccc',
    ],
    legend: {
      x: 'center',
      show: true,
      data: ['政策', '内容', '体系', '标准', '方法'],
    },
    // title: {
    //   text: '双碳图谱展示',
    // },
    series: [
      {
        type: 'graph',
        layout: 'force',
        symbolSize: 140,
        label: {
          normal: {
            show: true,
            position: 'inside',
            textStyle: {
              fontSize: 15,
              color: 'black',
            },
          },
        },
        force: {
          repulsion: 1000,
          legendHoverLink: true,
        },
        edgeSymbol: ['circle', 'arrow'],
        edgeSymbolSize: [4, 4],
        edgeLabel: {
          normal: {
            show: true,
            textStyle: {
              fontSize: 15,
            },
            formatter: '{c}',
          },
        },
        force: {
          repulsion: 8000,
          edgeLength: [10, 100],
        },
        focusNodeAdjacency: true,
        draggable: true,
        roam: true,
        categories: [
          {
            name: '内容',
            itemStyle: {
              normal: {
                color: colorList[0],
              },
            },
          },
          {
            name: '政策',
            itemStyle: {
              normal: {
                color: colorList[1],
              },
            },
          },
          {
            name: '体系',
            itemStyle: {
              normal: {
                color: colorList[2],
              },
            },
          },
          {
            name: '标准',
            itemStyle: {
              normal: {
                color: colorList[3],
              },
            },
          },
          {
            name: '方法',
            itemStyle: {
              normal: {
                color: colorList[4],
              },
            },
          },
        ],
        lineStyle: {
          normal: {
            opacity: 0.9,
            width: 1,
            curveness: 0.3,
          },
        },
        progressiveThreshold: 700,
        nodes: nodes,
        links: links,
      },
    ],
  });

  const option = reactive({
    series: [
      {
        type: 'wordCloud',
        shape: 'circle',
        keepAspect: false,
        // maskImage: maskImage,
        left: 'center',
        top: 'center',
        width: '100%',
        height: '100%',
        right: null,
        bottom: null,
        sizeRange: [12, 60],
        rotationRange: [0, 0],
        // rotationStep: 45,
        gridSize: 8,
        drawOutOfBound: false,
        layoutAnimation: true,
        textStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          color: function () {
            return (
              'rgb(' +
              [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
              ].join(',') +
              ')'
            );
          },
        },
        emphasis: {
          // focus: 'self',
          textStyle: {
            textShadowBlur: 3,
            textShadowColor: '#333',
          },
        },
        //data属性中的value值却大，权重就却大，展示字体就却大
        data: [
          { name: '碳排放范围', value: 366 },
          { name: '双碳', value: 900 },
          { name: '碳达峰碳中和标准体系建设', value: 606 },
          { name: '氧化率', value: 525 },
          { name: '碳清除标准子体系', value: 520 },
          { name: '生产和服务过程减排标准', value: 450 },
          { name: '化石能源清洁利用标准', value: 253 },
          { name: '节能标准', value: 363 },
          { name: '基础通用标准子体系', value: 286 },
          { name: '其他间接温室气体排放', value: 550 },
          { name: '废弃物处理', value: 490 },
          { name: '直接温室气体排放', value: 763 },
          { name: '直接排放', value: 486 },
          { name: '间接排放', value: 680 },
          { name: '生态产品价值实现标准', value: 550 },
          { name: '碳排放交易相关标准规范', value: 163 },
          { name: '绿色金融标准', value: 86 },
          { name: '相关的运输活动', value: 117 },
          { name: '无组织排放', value: 58 },
          { name: '过程排放', value: 263 },
          { name: '术语、分类和碳信息披露标准', value: 186 },
          { name: '碳监测核算核查标准规范', value: 173 },
          { name: '低碳管理及评价标准', value: 499 },
          { name: '生态产品价值实现标准', value: 163 },
          { name: '过程排放', value: 186 },
          { name: '固定燃烧', value: 175 },
          { name: '移动燃烧 ', value: 199 },
          { name: '无组织排放', value: 86 },
          { name: '外购原料与燃料的开采和生产', value: 117 },
          { name: '运输废弃物', value: 58 },
          { name: '坚持系统布局', value: 263 },
          { name: '坚持稳步推进', value: 186 },
          { name: '处理寿命周期结束的售出产品', value: 173 },
        ],
      },
    ],
  });
</script>
<style lang="scss" scoped></style>
