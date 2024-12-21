<template>
  <div style="text-align: center">
    <el-row :gutter="10" style="padding-bottom: 10px">
      <el-col class="chart1" :span="24">
        <el-card shadow="hover" body-style="padding: 18px 0px;">
          <template #header>
            <div class="card-header">
              <span>碳排放总量</span>
            </div>
          </template>
          {{ getWan(carbon) }}万t
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col class="chart1" :span="24">
        <el-card shadow="hover" body-style="padding: 18px 0px;">
          <template #header>
            <div class="card-header">
              <span>历史最低</span>
            </div>
          </template>
          {{ getWan(minHistory) }}万t
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    name: 'chat1',
    props: {
      carbon: {
        default: 0,
      },
      minHistory: {
        default: 0,
      },
    },
    methods: {
      getWan(num) {
        return Number.parseFloat(num / 10000).toFixed(3);
      },
    },
  };
</script>
<style lang="scss" scoped>
  .el-card :deep(.el-card__header) {
    padding: 18px 0px;
  }
  .chart1 {
    font-size: 15px;
    font-weight: 550;
    line-height: 20px;
  }
</style>
