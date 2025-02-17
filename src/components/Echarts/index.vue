<template>
  <el-card class="echart-card" shadow="hover" body-style="padding: 10px 0px;">
    <div class="echarts" :id="`echarts${index}`" :style="style"> </div>
  </el-card>
</template>

<script setup>
  import debounce from 'lodash/debounce';
  import { onMounted, ref, reactive, computed, watch, onBeforeUnmount } from 'vue';
  import { useStore } from 'vuex';
  // 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
  import * as echarts from 'echarts/core';
  // 引入柱状图图表，图表后缀都为 Chart
  import theme from './theme.json';
  import {
    BarChart,
    CandlestickChart,
    FunnelChart,
    GaugeChart,
    LineChart,
    PieChart,
    RadarChart,
    ScatterChart,
    GraphChart,
    TreeChart,
  } from 'echarts/charts';
  // 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
  import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    ToolboxComponent,
    MarkPointComponent,
    MarkLineComponent,
    VisualMapComponent,
    MarkAreaComponent,
    DataZoomComponent,
  } from 'echarts/components';
  // 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
  import { CanvasRenderer } from 'echarts/renderers';

  // 注册必须的组件
  echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    BarChart,
    LineChart,
    PieChart,
    RadarChart,
    GaugeChart,
    CandlestickChart,
    ScatterChart,
    CanvasRenderer,
    LegendComponent,
    ToolboxComponent,
    MarkPointComponent,
    MarkLineComponent,
    FunnelChart,
    GraphChart,
    VisualMapComponent,
    MarkAreaComponent,
    TreeChart,
    DataZoomComponent,
  ]);

  const props = defineProps({
    // 图表下标 同个页面有多个图表时，必填
    index: {
      type: Number,
      default: 0,
    },
    style: {
      type: Object,
      default: () => {
        return {
          width: '100%',
          height: '230px',
        };
      },
    },
    options: {
      type: Object,
      default: () => {
        return {};
      },
    },
  });
  const store = useStore();

  const isCollapse = computed(() => {
    return store.getters.collapse;
  });

  let chart = reactive({});
  let timer = ref(null);

  watch(
    () => isCollapse,
    () => {
      timer = setTimeout(() => {
        chart.resize(); //页面大小变化后Echarts也更改大小
        clearTimeout(timer);
        timer = null;
      }, 300);
    },
    {
      deep: true,
    }
  );
  watch(
    () => props.options,
    (newdata) => {
      console.log(newdata)
      chart.clear();
      chart.setOption(newdata, true);
    },
    { deep: true }
  );
  onMounted(() => {
    initChart();
    window.addEventListener(
      'resize',
      debounce(() => {
        chart.resize(); //页面大小变化后Echarts也更改大小
      }, 200)
    );
  });

  onBeforeUnmount(() => {
    clearTimeout(timer);
    timer = null;
  });

  const initChart = () => {
    echarts.registerTheme('wonderland', theme);
    chart = echarts.init(document.getElementById('echarts' + props.index), theme);
    // 绘制图表
    chart.setOption({ ...props.options }, true);
  };
</script>
<style lang="scss" scoped>
  .echart-card {
    .card-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &-title {
        display: flex;
        align-content: center;
        align-items: center;
        color: $base-font-color;

        .icon {
          display: flex;
          padding-right: 5px;
        }
      }
    }

    .echarts {
      margin: 0 auto;
      background-color: $base-color-white;
    }
  }
</style>
<style></style>
