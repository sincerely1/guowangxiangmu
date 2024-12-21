<template>
  <div class="index-conntainer">
    <el-card class="card-work" body-style=" padding-top: 0px">
      <h2>碳流排放分析</h2>
      <p>
        可以从能源转化节点开始，对碳排放的具体流向进行准确追踪，明确网络中各支路、各节点的碳排放量。
      </p>
    </el-card>
    <div class="content" style="padding-top: 10px">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <Echarts
            :index="1"
            :style="{
              height: '600px',
              width: '100%',
            }"
            :options="option"
          />
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
  import Echarts from '@/components/Echarts/index.vue';

  const dataMei = {
    name: '发电厂',
    value: 11337,
    children: [
      {
        name: '燃煤发电厂',
        value: 11337,
        children: [
          {
            name: '变电站',
            value: 4294,
            children: [
              {
                name: '高压电',
                value: 621,
                children: [
                  { name: '电力公司', value: 621 },
                  { name: '钢铁厂', value: 1021 },
                  { name: '化工厂', value: 1421 },
                  { name: '铝厂', value: 721 },
                  { name: '煤矿', value: 721 },
                ],
              },
              {
                name: '低压电',
                value: 621,
                children: [
                  { name: '餐馆和酒店', value: 621 },
                  { name: '商场和超市', value: 1021 },
                  { name: '办公室', value: 1421 },
                  { name: '学校和医院', value: 721 },
                  { name: '家庭', value: 721 },
                ],
              },
            ],
          },
        ],
      },
      {
        name: '核电厂',
        value: 11337,
        children: [
        {
            name: '变电站',
            value: 4294,
            children: [
              {
                name: '高压电',
                value: 621,
                children: [
                  { name: '电力公司', value: 621 },
                  { name: '钢铁厂', value: 1021 },
                  { name: '化工厂', value: 1421 },
                  { name: '铝厂', value: 721 },
                  { name: '煤矿', value: 721 },
                ],
              },
              {
                name: '低压电',
                value: 621,
                children: [
                  { name: '餐馆和酒店', value: 621 },
                  { name: '商场和超市', value: 1021 },
                  { name: '办公室', value: 1421 },
                  { name: '学校和医院', value: 721 },
                  { name: '家庭', value: 721 },
                ],
              },
            ],
          },
        ],
      },
      {
        name: '水力发电厂',
        value: 11337,
        children: [
        {
            name: '变电站',
            value: 4294,
            children: [
              {
                name: '高压电',
                value: 621,
                children: [
                  { name: '电力公司', value: 621 },
                  { name: '钢铁厂', value: 1021 },
                  { name: '化工厂', value: 1421 },
                  { name: '铝厂', value: 721 },
                  { name: '煤矿', value: 721 },
                ],
              },
              {
                name: '低压电',
                value: 621,
                children: [
                  { name: '餐馆和酒店', value: 621 },
                  { name: '商场和超市', value: 1021 },
                  { name: '办公室', value: 1421 },
                  { name: '学校和医院', value: 721 },
                  { name: '家庭', value: 721 },
                ],
              },
            ],
          },
        ],
      },
      {
        name: '风力发电厂',
        value: 11337,
        children: [
        {
            name: '变电站',
            value: 4294,
            children: [
              {
                name: '高压电',
                value: 621,
                children: [
                  { name: '电力公司', value: 621 },
                  { name: '钢铁厂', value: 1021 },
                  { name: '化工厂', value: 1421 },
                  { name: '铝厂', value: 721 },
                  { name: '煤矿', value: 721 },
                ],
              },
              {
                name: '低压电',
                value: 621,
                children: [
                  { name: '餐馆和酒店', value: 621 },
                  { name: '商场和超市', value: 1021 },
                  { name: '办公室', value: 1421 },
                  { name: '学校和医院', value: 721 },
                  { name: '家庭', value: 721 },
                ],
              },
            ],
          },
        ],
      },
      {
        name: '太阳能发电厂',
        value: 11337,
        children: [
        {
            name: '变电站',
            value: 4294,
            children: [
              {
                name: '高压电',
                value: 621,
                children: [
                  { name: '电力公司', value: 621 },
                  { name: '钢铁厂', value: 1021 },
                  { name: '化工厂', value: 1421 },
                  { name: '铝厂', value: 721 },
                  { name: '煤矿', value: 721 },
                ],
              },
              {
                name: '低压电',
                value: 621,
                children: [
                  { name: '餐馆和酒店', value: 621 },
                  { name: '商场和超市', value: 1021 },
                  { name: '办公室', value: 1421 },
                  { name: '学校和医院', value: 721 },
                  { name: '家庭', value: 721 },
                ],
              },
            ],
          },
        ],
      },
    ],
  };
  const option = reactive({
    title: {
      x: 'center',
      text: '碳排放流分析',
    },
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove',
    },
    series: [
      {
        type: 'tree',
        id: 0,
        name: 'tree1',
        data: [dataMei],
        top: '20%',
        left: '10%',
        // bottom: '23%',
        // right: '15%',
        symbolSize: 10,
        edgeShape: 'polyline',
        edgeForkPosition: '53%',
        initialTreeDepth: 3,
        nodePadding: 20,
        lineStyle: {
          width: 3,
        },
        label: {
          backgroundColor: '#fff',
          position: 'left',
          verticalAlign: 'middle',
          align: 'right',
          fontsize: 8,
        },
        leaves: {
          label: {
            position: 'right',
            verticalAlign: 'middle',
            align: 'left',
          },
        },
        emphasis: {
          focus: 'descendant',
          nodeScaleRatio: 0.4,
        },
        expandAndCollapse: true,
        animationDuration: 550,
        animationDurationUpdate: 750,
      },
    ],
  });
</script>
<style scoped></style>

<style lang="scss" scoped></style>
