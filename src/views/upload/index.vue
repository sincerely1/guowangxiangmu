<template>
  <div class="index-conntainer">
    <el-card class="card-work" body-style=" padding-top: 0px">
      <h2>数据上传</h2>
      <p> 支持文本以及excel的数据上传格式,将数据自动添加到图数据库以及关系数据库中。 </p>
    </el-card>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card style="height: 170px; margin-top: 10px; margin-bottom: 5px">
          <template #header>
            <div class="card-header">
              <div class="upload-header">图谱数据:</div>
            </div>
          </template>
          <div class="upload-container">
            <el-upload
              :action="uploadURL"
              ref="uploadRef1"
              class="upload-demo"
              :auto-upload="false"
              limit="1"
              :on-success="uploadFileSuccess"
            >
              <template #trigger>
                <el-button type="primary" style="margin-left: 0px">选择文件</el-button>
              </template>
              <template #tip>
                <div class="el-upload__tip text-red"> 请上传txt文件 </div>
              </template>
              <el-button type="success" @click="submitUpload" style="margin-left: 20px"
                >上传文件</el-button
              >
            </el-upload>
            <el-switch
              v-model="uploadType"
              active-text="覆盖文件"
              inactive-text="追加内容"
              @change="uploadAppend"
            />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-card style="height: 170px; margin-top: 10px; margin-bottom: 5px">
          <template #header>
            <div class="card-header">
              <div class="upload-header">碳排放数据:</div>
            </div>
          </template>
          <div class="upload-container">
            <el-upload
              action="http://localhost:5000/api/uploadexcel"
              ref="uploadRef2"
              class="upload-demo"
              :auto-upload="true"
              limit="1"
              :on-success="uploadExcelSuccess"
            >
              <template #trigger>
                <el-button type="primary" style="margin-left: 0px">选择文件</el-button>
              </template>
              <template #tip>
                <div class="el-upload__tip text-red"> 请上传csv文件 </div>
              </template>
              <el-button type="success" @click="submitUpload" style="margin-left: 20px"
                >上传文件</el-button
              >
            </el-upload>
            <el-switch v-model="uploadNum" active-text="覆盖文件" inactive-text="追加内容" />
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <Echarts
          :index="1"
          :style="{
            height: '600px',
          }"
          :options="option_graph"
        />
      </el-col>
      <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <el-table :data="CarbonData" style="width: 100%" height="620px">
          <!-- <el-table-column prop="name" label="类别" width="60"> </el-table-column> -->
          <el-table-column prop="date" label="日期"> </el-table-column>
          <el-table-column prop="number" label="碳排放量"> </el-table-column>
        </el-table>
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
  // import { predictionData } from '@/api/prediction';
  // 文件上传成功时的钩子
  const uploadRef1 = ref();
  const uploadURL = ref('http://localhost:5000/api/uploadtxt');
  const uploadType = ref(true);
  const uploadNum = ref(true);
  const submitUpload = () => {
    uploadRef1.value.submit();
  };
  function uploadAppend() {
    if (uploadType.value == true) {
      uploadURL.value = 'http://localhost:5000/api/uploadtxt';
    } else {
      uploadURL.value = 'http://localhost:5000/api/uploadtxtAppend';
    }
  }
  function uploadFileSuccess(response, file) {
    file.response = response.data;
    // const { datawork } = response.data;
    TxtData.value = file.response;
    console.log(TxtData.value);
  }
  function uploadExcelSuccess(response, file) {
    file.response = response.data;
    // const { datawork } = response.data;
    CarbonData.value = file.response;
    console.log(TxtData.value);
  }
  const CarbonData = ref([]);
  const TxtData = ref({ nodes: [], links: [] });
  const nodes = computed(() =>
    TxtData.value.nodes.map(function (node, idx) {
      node.id = idx;
      return node;
    })
  );
  const links = computed(() => TxtData.value.links);

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
  const option_graph = reactive({
    animationDurationUpdate: 1500,
    animationEasingUpdate: 'quinticInOut',
    legend: {
      x: 'center',
      show: true,
      data: ['政策', '内容', '体系', '标准', '方法', '企业', '数据'],
    },
    // title: {
    //   text: '双碳图谱导入',
    // },
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
<style scoped></style>

<style lang="scss" scoped>
  .upload-header {
    font-size: 20px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial,
      sans-serif;
  }
  .text-red {
    color: red;
  }
  .upload-container {
    display: flex;
    align-content: center;
    justify-content: space-between;
  }
</style>
