<template>
  <div class="index-conntainer">
    <div class="content">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
          <!-- 全部结点 -->
          <Echarts
            :index="1"
            :style="{
              height: '800px',
            }"
            :options="option"
          />
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <el-card class="card" shadow="hover">
            <template #header>
              <h3 class="title">实体占比</h3>
            </template>
            <div v-for="(item, index) in skillList" :key="index">
              <div class="skill-title">{{ item.title }}</div>
              <el-progress
                :stroke-width="10"
                :percentage="item.percentage"
                :color="item.color"
              ></el-progress>
            </div>
          </el-card>
          <div style="margin-top: 10px">
            <Echarts
              :index="2"
              :style="{
                height: '400px',
              }"
              :options="relationship_option"
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
  import { ref, computed, reactive, onBeforeMount, watch } from 'vue';
  import Echarts from '@/components/Echarts/index.vue';
  import { getdata } from '@/api/relation';
  // const skillList = ref([]);
  const chartData = ref({ nodes: [], links: [], relationship: [] });
  const PieChartData = computed(() => {
    let result = [];
    for (const key in chartData.value.relationship) {
      result.push({ name: key, value: chartData.value.relationship[key] });
    }
    return result;
  });
  onBeforeMount(() => {
    load_data();
  });

  const load_data = async function () {
    const { data } = await getdata();
    chartData.value = data;
    console.log(data);
  };
  const nodes = computed(() =>
    chartData.value.nodes.map(function (node, idx) {
      node.id = idx;
      return node;
    })
  );
  const links = computed(() => chartData.value.links);
  const skillList = [
    {
      title: '政策',
      percentage: 15,
      color: '#67c23a',
    },
    {
      title: '内容',
      percentage: 35,
      color: '#e6a23c',
    },
    {
      title: '体系',
      percentage: 15,
      color: '#409EFF',
    },
    {
      title: '标准',
      percentage: 10,
      color: '#f56c6d',
    },
    {
      title: '方法',
      percentage: 8,
      color: '#a650fe',
    },
    {
      title: '企业',
      percentage: 5,
      color: '#5470c6',
    },
    {
      title: '数据',
      percentage: 12,
      color: '#ea7ccc',
    },
  ];

  const relationship_option = reactive({
    title: {
      text: '实体关系示意图',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    // legend: {
    //   orient: 'vertical',
    //   left: 'left',
    // },
    series: [
      {
        name: '关系名称',
        type: 'pie',
        radius: '50%',
        data: PieChartData,
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
  const option = reactive({
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    legend: {
      x: 'center',
      show: true,
      data: ['政策', '内容', '体系', '标准', '方法', '企业', '数据'],
    },
    title: {
      text: '双碳图谱展示',
    },
    series: [
      {
        type: 'graph',
        layout: 'force',
        symbolSize: 60,
        label: {
          normal: {
            show: true,
            position: 'inside',
            textStyle: {
              fontSize: 10,
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
              fontSize: 10,
            },
            formatter: '{c}',
          },
        },
        force: {
          repulsion: 500,
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
        // tooltip: {
        //   formatter: function (node) {
        //     // 区分连线和节点，节点上额外显示其他数字
        //     if (!node.value) {
        //       return node.data.name;
        //     } else {
        //       return node.data.name + ':' + node.data.showNum;
        //     }
        //   },
        // },
        lineStyle: {
          normal: {
            opacity: 0.9,
            width: 1,
            curveness: 0.3,
          },
        },
        progressiveThreshold: 700,
        // nodes: nodes,
        // links: links,
        // nodes: chartData.value.data.map(function (node, idx) {
        //   console(node);
        //   node.id = idx;
        //   return node;
        // }),
        // links: chartData.value.links,
        // progressiveThreshold: 700,
        nodes: nodes,
        links: links,
      },
    ],
  });
</script>
<style lang="scss" scoped></style>
