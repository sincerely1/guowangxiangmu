<template>
  <div class="index-conntainer">
    <div class="content">
      <el-row :gutter="10">
        <el-col :span="24">
          <!-- 全部结点 -->

          <el-input
            v-model="graphKey"
            placeholder="请以实体 实体 关系 属性 属性为格式添加图谱"
            class="input-with-select"
            @keyup.enter.native="handleGraphData"
          >
            <template #append>
              <el-button :icon="Upload" @click="handleGraphData" />
            </template>
          </el-input>
        </el-col>
        <el-divider></el-divider>
        <h3>{{ title }}</h3>
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <Echarts
            :index="1"
            :style="{
              height: '500px',
              width: '800px',
            }"
            :options="graph"
          />
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
  import { graphwork } from '@/api/graphget';
  import { Upload } from '@element-plus/icons-vue';
  const GraphData = ref({ data: [], links: [] });

  const title = '更新结果';

  const graphKey = ref('');

  // const dict = computed(() => Searchentity.value.data.map(function(){})
  const links = computed(() => GraphData.value.links);
  const nodes = computed(() =>
    GraphData.value.data.map(function (node, idx) {
      node.id = idx;
      return node;
    })
  );
  const handleGraphData = async () => {
    const { data } = await graphwork({ key: graphKey.value });
    GraphData.value = data;
    console.log(data);
  };

  const colorList = [
    '#e6a23c',
    '#67c23a',
    '#409EFF',
    '#f56c6d',
    '#a650fe',
    '#5470c6',
    '#ea7ccc',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#91cc75',
  ];

  const graph = reactive({
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    legend: {
      x: 'center',
      show: true,
      data: ['政策', '内容', '体系', '标准', '方法', '企业', '数据'],
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
              fontSize: 12,
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
              fontSize: 12,
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
          {
            name: '企业',
            itemStyle: {
              normal: {
                color: colorList[5],
              },
            },
          },
          {
            name: '数据',
            itemStyle: {
              normal: {
                color: colorList[6],
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
</script>
<style lang="scss" scoped></style>
