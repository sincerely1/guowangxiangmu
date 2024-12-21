<template>
  <div>
    <el-row class="search-row">
      <el-col :xs="24" :sm="24" :md="18" :lg="8" :xl="8">
        <el-input v-model="SearchNode" placeholder="搜索节点" @keyup.enter.native="handleSeach">
          <template #append>
            <el-button :icon="Search" @click="handleSeach" />
          </template>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <Echarts
          :index="1"
          :style="{
            height: '25px',
            width: '600px',
          }"
          :options="Legend"
        />
      </el-col>
    </el-row>
    <!-- 
      " -->
    <VueForceGraph3D
      ref="fgRef"
      :extraRenderers="extraRenderers"
      :graphData="graphData"
      backgroundColor="#090723"
      :nodeColor="getNodeColor"
      :nodeVal="30"
      :nodeResolution="20"
      :nodeOpacity="1"
      :nodeThreeObject="nodeThreeObject"
      :nodeThreeObjectExtend="true"
      linkLabel="value"
      :linkDirectionalArrowLength="3.5"
      :linkDirectionalArrowRelPos="1"
      :linkCurvature="0.25"
      :linkOpacity="0.5"
      :linkDirectionalParticles="2"
      :onNodeClick="onHandleClick"
      :onNodeDragEnd="
        (node) => {
          node.fx = node.x;
          node.fy = node.y;
          node.fz = node.z;
        }
      "
    ></VueForceGraph3D>
  </div>
</template>
<script>
  export default {
    name: 'nodeTxt',
  };
</script>
<script setup>
  import { ref, onBeforeMount, onMounted } from 'vue';
  import { get3ddata } from '@/api/relation';
  import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
  import { forceLink, forceCollide, forceManyBody, forceCenter } from 'd3-force';
  import { Search } from '@element-plus/icons-vue';

  const legend = '图例：';
  const SearchNode = ref('');
  const fgRef = ref(null);
  const extraRenderers = [new CSS2DRenderer()];
  const graphData = ref({
    nodes: [],
    links: [],
  });
  onMounted(() => {
    addCollisionForce();
  });
  const getNodeColor = (node) => {
    return colorList[Number.parseInt(node.group)];
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
  const Legend = reactive({
    legend: {
      x: 'center',
      // itemWidth: 20,
      // itemHeight: 9,
      // top: 'middle',
      // bottom: 'middle',
      show: true,
      // itemGap: 18,
      textStyle: {
        fontSize: 14,
      },
      data: ['政策', '内容', '体系', '标准', '方法', '企业', '数据'],
    },
    series: [
      {
        type: 'graph',
        categories: [
          {
            name: '内容',
            itemStyle: {
              color: colorList[0],
            },
          },
          {
            name: '政策',
            itemStyle: {
              color: colorList[1],
            },
          },
          {
            name: '体系',
            itemStyle: {
              color: colorList[2],
            },
          },
          {
            name: '标准',
            itemStyle: {
              color: colorList[3],
            },
          },
          {
            name: '方法',
            itemStyle: {
              color: colorList[4],
            },
          },
          {
            name: '企业',
            itemStyle: {
              color: colorList[5],
            },
          },
          {
            name: '数据',
            itemStyle: {
              color: colorList[6],
            },
          },
        ],
      },
    ],
  });
  onBeforeMount(async () => {
    let { data } = await get3ddata();
    graphData.value = data;
  });
  function nodeThreeObject(node) {
    const nodeEl = document.createElement('div');
    nodeEl.textContent = node.id;
    nodeEl.style.color = node.color;
    nodeEl.className = 'node-label';
    return new CSS2DObject(nodeEl);
  }
  function addCollisionForce(links) {
    //   function strength(link) {
    //     return 1 / Math.min(count(link.source), count(link.target));
    // }forceCollide
    fgRef.value.d3Force('collision', forceCollide().radius(20).strength(0.1));
    // fgRef.value.d3Force("charge", forceManyBody().strength(-30))
    // fgRef.value.d3Force("link", forceLink(links).distance(70).strength(2))
    // fgRef.value.d3Force("center", forceCenter(0, 100).strength(0.05))

    // fgRef.value.d3Force(
    //   "link",
    //   forceLink((link)=>1 / Math.min(count(link.source), count(link.target)))
    // )
    // fgRef.value.d3Force(
    //   "collision",
    //   forceCollide(() =>50)
    // )
  }
  const handleSeach = () => {
    let searchNodes = graphData.value.nodes.filter((node) => {
      if (node.id == SearchNode.value) {
        return true;
      } else {
        return false;
      }
    });
    if (searchNodes.length) {
      onHandleClick(searchNodes[0]);
    }
  };
  const onHandleClick = (node) => {
    // Aim at node from outside it
    const distance = 10;
    const distRatio = distance / Math.hypot(node.x, node.y, node.z);

    fgRef.value.cameraPosition(
      { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
      node, // lookAt ({ x, y, z })
      1000 // ms transition duration
    );
    if (node.id.length > 10) {
      ElNotification({
        title: '实体名称',
        message: node.id,
        type: 'info',
      });
    }
  };
</script>

<style>
  .node-label {
    font-size: 12px;
    font-weight: bolder;
    padding: 1px 4px;
    border-radius: 4px;
    color: aliceblue !important;
    text-align: center;
    background-color: rgba(0, 0, 0, 0);
    user-select: none;
    width: 120px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
<style scoped>
  .search-row {
    margin-bottom: 10px;
  }
</style>
