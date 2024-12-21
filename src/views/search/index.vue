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
            <!-- <template #header>
              <h3 class="title">实体列举</h3>
            </template> -->
            <el-table :data="SearchentityData" style="width: 100%" height="600px">
              <!-- <el-table-column prop="name" label="类别" width="60"> </el-table-column> -->
              <el-table-column prop="value" label="实体名称"> </el-table-column>
            </el-table>
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
  import { searchwork, searchentity } from '@/api/search';
  import { Search } from '@element-plus/icons-vue';
  const SearchData = ref({ data: [], links: [] });

  const SearchentityData = ref([]);

  const title = '搜索结果';

  const searchKey = ref('');

  // const dict = computed(() => Searchentity.value.data.map(function(){})
  onBeforeMount(async () => {
    let { data } = await searchentity();
    SearchentityData.value = data;
  });
  const links = computed(() => SearchData.value.links);

  const nodes = computed(() =>
    SearchData.value.data.map(function (node, idx) {
      node.id = idx;
      return node;
    })
  );
  const handleSearchData = async () => {
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
    '#ea7ccc',
    '#fac858',
    '#ee6666',
    '#73c0de',
    '#3ba272',
    '#fc8452',
    '#9a60b4',
    '#91cc75',
  ];

  const search = reactive({
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
