<template>
  <div>
    <el-header height="50px" style="padding: 0px 5px 0px 5px">
      <div style="display: inline-block; font-size: 16px; margin-right: 15px">
        请选择你要输出的企业:
      </div>
      <el-select
        v-model="inputValue"
        class="m-2"
        placeholder="选择企业"
        size="large"
        style="width: 30%"
        clearable="true"
      >
        <el-option
          v-for="item in Inputoptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </el-header>
    <el-main style="padding: 0px 5px 0px 5px">
      <div v-if="inputValue == ''">
        <el-card class="card-work" style="margin-bottom: 5px">
          <h2>企业碳排放量数据分析</h2>
          <p
            >本模块对企业进行碳排放量动态监测，支持查看碳足迹展示、主要工质消耗量和碳排放量、碳排放总量、全流程碳排放趋势。</p
          >
        </el-card>
        <el-card>
          <el-table :data="tableData" height="750" style="width: 100%; font-size: 17px">
            <el-table-column prop="date" label="企业名称" width="300" />
            <el-table-column prop="value" label="企业介绍 " />
          </el-table>
        </el-card>
      </div>
      <div v-else>
        <el-card class="card-work">
          <h2>宝山钢铁股份有限公司</h2>
          <p
            >宝山钢铁股份有限公司（简称“宝钢股份”）是中国最大、最现代化的钢铁联合企业。《世界钢铁业指南》评定宝钢股份在世界钢铁行业的综合竞争力为前三名。</p
          >
        </el-card>
        <el-row :gutter="10" style="margin-top: 10px; margin-bottom: 10px; height: 500px">
          <el-col :span="6">
            <div>
              <el-row style="height: 250px">
                <el-col :span="24">
                  <div>
                    <chart1
                      :carbon="CarbonOneYearData.carbon"
                      :minHistory="CarbonOneYearData.minHistory"
                    />
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <Echarts :index="1" :style="{ height: '230px' }" :options="options.option1" />
                </el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="10">
            <div style="background-color: white; margin: 0 auto">
              <FlowChart :data="FlowChartData" />
            </div>
          </el-col>
          <el-col :span="8">
            <div>
              <el-row style="margin-bottom: 10px">
                <el-col :span="24">
                  <div>
                    <Echarts :index="2" :style="{ height: '224px' }" :options="options.option2" />
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24">
                  <Echarts :index="3" :style="{ height: '224px' }" :options="options.option3" />
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="6">
            <el-card body-style="padding:0px;height:230px">
              <template #header>
                <div class="card-header">
                  <span>主要工质消耗量和碳排放量</span>
                </div>
              </template>
              <el-table
                :data="OneYearMaterialTable"
                style="width: 100%"
                height="230px"
                :header-cell-style="{ 'text-align': 'center' }"
                :cell-style="{ 'text-align': 'center' }"
              >
                <el-table-column prop="name" label="名称" />
                <el-table-column prop="unit" label="单位" />
                <el-table-column prop="consume" label="消耗量" width="100px">
                  <template #default="scope">{{ ParseFloat2Int(scope.row.consume) }}</template>
                </el-table-column>
                <el-table-column prop="emission" label="CO2排放" width="100px">
                  <template #default="scope">{{ ParseFloat2Int(scope.row.emission) }}</template>
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
          <el-col :span="10">
            <Echarts :index="4" :style="{ height: '247px' }" :options="options.option4" />
          </el-col>
          <el-col :span="8">
            <el-card body-style="padding:0px;height:230px">
              <template #header>
                <div class="card-header">
                  <span>工序碳排放及占比</span>
                </div>
              </template>
              <el-table
                :data="OneYearProcessTable"
                border
                style="width: 100%"
                height="230px"
                :header-cell-style="{ 'text-align': 'center' }"
                :cell-style="{ 'text-align': 'center' }"
              >
                <el-table-column prop="name" label="名称" />
                <el-table-column prop="output" label="产量(t)">
                  <template #default="scope">{{ ParseFloat2Int(scope.row.output) }}</template>
                </el-table-column>
                <el-table-column prop="emission" label="CO2排放(t)" width="100px">
                  <template #default="scope">{{ ParseFloat2Int(scope.row.emission) }}</template>
                </el-table-column>
                <el-table-column prop="proportion" label="占比">
                  <template #default="scope"
                    >{{ ParseFloatFixed2(scope.row.proportion) }}%</template
                  >
                </el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-main>
  </div>
</template>
<script>
  export default {
    name: 'enterpriseAnsnlysis',
  };
</script>
<script setup>
  import { ref, reactive } from 'vue';
  import Echarts from '@/components/Echarts/index.vue';
  import chart1 from './components/page1/Chart1.vue';
  import FlowChart from '@/components/Graph/all.vue';
  const colors = ['#84a2fe', '#22c3aa', '#7bd9a5'];
  const CarbonOneYearData = reactive({
    carbon: 135600,
    minHistory: 103465,
  });
  const FlowChartData = ref([
    23.5, 18.2, 21.4, 19.8, 22.3, 17.6, 20.5, 16.9, 25.1, 23.7, 15.8, 24.6, 18.9, 22.1, 21.3, 20.4,
    19.2, 23.9, 17.4, 24.8, 16.5, 22.7, 15.3, 18.7, 19.6, 21.8, 20.1, 23.2, 22.5, 17.9, 19.4, 16.1,
    24.3, 23.1, 18.4, 20.7, 15.6, 22.9, 21.7, 19.5, 17.8, 16.3, 25.4, 24.1, 22.4, 20.9, 19.1, 18.3,
    17.2, 21.5, 23.8, 20.6, 18.8, 16.7, 19.3, 22.6, 20.6, 21.5, 23.8, 20.6, 18.8, 16.7,
  ]);
  const OneYearMaterialTable = ref([
    {
      id: 1,
      name: '无烟煤',
      category: '化石燃料',
      inorout: '碳输入',
      year: 2017,
      unit: 't',
      consume: 579914.25,
      carbonFactory: 2.522,
      emission: 1462543.7385,
      proportion: 0.13187213366254819,
    },
    {
      id: 2,
      name: '烟煤',
      category: '化石燃料',
      inorout: '碳输入',
      year: 2017,
      unit: 't',
      consume: 450692.16,
      carbonFactory: 1.742,
      emission: 785105.74272,
      proportion: 0.07079006713972952,
    },
    {
      id: 3,
      name: '洗精煤',
      category: '化石燃料',
      inorout: '碳输入',
      year: 2017,
      unit: 't',
      consume: 3361833.45,
      carbonFactory: 2.209,
      emission: 7426290.091050001,
      proportion: 0.6696009792556388,
    },
    {
      id: 4,
      name: '焦炭',
      category: '化石燃料',
      inorout: '碳输入',
      year: 2017,
      unit: 't',
      consume: 24413.5,
      carbonFactory: 2.86,
      emission: 69822.61,
      proportion: 0.0062956452625693386,
    },
    {
      id: 7,
      name: '石灰石',
      category: '生产过程',
      inorout: '碳输入',
      year: 2017,
      unit: 't',
      consume: 959906.64,
      carbonFactory: 0.44,
      emission: 422358.9216,
      proportion: 0.038082534352052076,
    },
    {
      id: 8,
      name: '白云石',
      category: '生产过程',
      inorout: '碳输入',
      year: 2017,
      unit: 't',
      consume: 235288.86,
      carbonFactory: 0.471,
      emission: 110821.05305999999,
      proportion: 0.009992322511148384,
    },
    {
      id: 23,
      name: '电力',
      category: '净购入的电力',
      inorout: '碳输入',
      year: 2017,
      unit: 'MWh',
      consume: 1099743.742,
      carbonFactory: 0.7219,
      emission: 793905.0073498001,
      proportion: 0.07158346413077146,
    },
  ]);
  const OneYearProcessTable = ref([
    {
      id: 1,
      name: '焦化',
      year: 2017,
      output: 2368194.3,
      emission: 1366971.0,
      proportion: 13.37,
    },
    {
      id: 2,
      name: '烧结',
      year: 2017,
      output: 7326198.0,
      emission: 1436579.0,
      proportion: 14.05,
    },
    {
      id: 3,
      name: '球团',
      year: 2017,
      output: 1645797.0,
      emission: 47458.0,
      proportion: 0.46,
    },
    {
      id: 4,
      name: '炼铁',
      year: 2017,
      output: 5242714.89,
      emission: 2683697.0,
      proportion: 26.24,
    },
    {
      id: 5,
      name: '炼钢',
      year: 2017,
      output: 5500353.326,
      emission: 324465.0,
      proportion: 3.17,
    },
    {
      id: 6,
      name: '轧钢',
      year: 2017,
      output: 5635840.823,
      emission: 1543301.0,
      proportion: 15.09,
    },
  ]);
  const inputValue = ref('');
  const tableData = [
    {
      date: '宝山钢铁股份有限公司',
      value:
        '公司专业生产高技术含量、高附加值的钢铁产品。在汽车用钢，造船用钢，油、气开采和输送用钢，家电用钢，电工器材用钢，锅炉和压力容器用钢，食品、饮料等包装用钢，金属制品用钢以及高等级建筑用钢等领域，宝钢股份在成为中国市场主要钢材供应商的同时，产品出口日本、韩国、欧美四十多个国家和地区。',
    },
    {
      date: '东电沈阳热电有限公司',
      value:
        '东电沈阳热电有限责任公司是1998-12-08注册成立的有限责任公司(国有控股)，注册地址位于沈阳经济技术开发区四号街11甲2号。东电沈阳热电有限责任公司的统一社会信用代码/注册号是912101064106189621，企业法人赵成明，目前企业处于开业状态。东电沈阳热电有限责任公司的经营范围是：热力、电力生产、销售；粉煤灰开发与综合利用；检修及调试（依法须经批准的项目，经相关部门批准后方可开展经营活动。）。',
    },
    {
      date: '国家能源集团辽宁电力沈西热电厂',
      value:
        '电力、热力生产与销售；电源、热源项目开发、建设、管理；电能设备及配套设施的施工、检修及技术咨询；与电力相关的环保技术、综合节能技术研发及技术咨询。（依法须经批准的项目，经相关部门批准后方可开展经营活动。）。',
    },
    {
      date: '国能辽宁热力有限公司',
      value:
        '许可项目：水力发电，各类工程建设活动，发电业务、输电业务、供（配）电业务（依法须经批准的项目，经相关部门批准后方可开展经营活动，具体经营项目以审批结果为准） 一般项目：热力生产和供应，通用设备修理，电气设备修理，再生资源销售，建筑材料销售，太阳能热利用装备销售，机动车充电销售，非居住房地产租赁，土地使用权租赁，机械设备租赁，汽车租赁，发电技术服务，风力发电技术服务，太阳能发电技术服务，合同能源管理，电力行业高效节能技术研发，新兴能源技术研发，金属材料销售，住房租赁，物业管理，信息咨询服务（不含许可类信息咨询服务）（除依法须经批准的项目外，凭营业执照依法自主开展经营活动）。',
    },
    {
      date: '沈阳经济技术开发区热电有限公司',
      value:
        '许可经营项目：燃煤及其它供热；发电；一般经营项目：投资开发节能节材热电集中供热项目；承包国内外热电工程建设项目；开发推广节能新技术、新产品；节能设备租赁；节能热电技术咨询服务；经销热电成套设备、建筑材料、金属材料、节能综合产品。（依法须经批准的项目，经相关部门批准后方可开展经营活动。）s。',
    },
    {
      date: '沈阳华润热电有限公司',
      value:
        '沈阳华润热电有限公司始建于1988年，位于沈阳市大东区，前身为沈海热电厂，装机容量为3×200MW燃煤供热机组。1993年7月组建成为全国电力系统第一家合资经营、外资控股的发电企业，2007年7月，成为华润电力下属项目公司，2010年4月更名为沈阳华润热电有限公司。公司经营范围为电力、热力生产销售及能源开发，具有年发电36亿千瓦时、供热600万吉焦的能力，目前供热面积近3200万平方米，担负着沈阳市五分之一的用电量和涉及100多万人口的居民冬季采暖及中华轿车和宝马轿车生产线工业供汽任务。',
    },
  ];
  const Inputoptions = [
    {
      value: '宝山钢铁',
      label: '宝山钢铁股份有限公司',
    },
    {
      value: '东电沈阳热电',
      label: '东电沈阳热电有限责任公司',
    },
    {
      value: '国家能源集团辽宁电力沈西热电厂',
      label: '国家能源集团辽宁电力有限公司沈西热电厂',
    },
    {
      value: '国能辽宁热力',
      label: '国能辽宁热力有限公司',
    },
    {
      value: '沈阳经济技术开发区热电',
      label: '沈阳经济技术开发区热电有限公司',
    },
    {
      value: '沈阳华润热电',
      label: '沈阳华润热电有限公司',
    },
    {
      value: '沈阳皇姑热电',
      label: '沈阳皇姑热电有限公司',
    },
    {
      value: '沈阳华润热电',
      label: '沈阳华润热电有限公司',
    },
    {
      value: '沈阳金山能源金山热电分公司',
      label: '沈阳金山能源股份有限公司金山热电分公司',
    },
    {
      value: '沈阳华润热电',
      label: '沈阳华润热电有限公司',
    },
    {
      value: '国能康平发电',
      label: '国能康平发电有限公司',
    },
    {
      value: '沈阳石蜡化工',
      label: '沈阳石蜡化工有限公司',
    },
    {
      value: '沈阳抗生素工厂',
      label: '沈阳抗生素厂',
    },
    {
      value: '玖龙纸业（沈阳）',
      label: '玖龙纸业（沈阳）有限公司',
    },
  ];
  const options = reactive({
    option1: {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        x: 'right',
      },
      title: {
        text: '主要工质输入碳占比',
        left: 'center',
      },
      grid: {
        top: '10px',
        left: 0,
        right: '1px',
        bottom: 0,
        containLabel: true,
      },
      series: [
        {
          name: '碳占比',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['48%', '55%'],
          avoidLabelOverlap: false,
          labelLine: {
            //设置延长线的长度

            length: 5, //设置延长线的长度
            // length2: 10,//设置第二段延长线的长度
          },
          label: {
            // formatter: '{d}%, {c} \n\n',
            formatter: '{per|{d}%} ', //这里最后另一行设置了一个空数据是为了能让延长线与hr线对接起来
            padding: [0, -10], //取消hr线跟延长线之间的间隙
            rich: {
              a: {
                color: '#999',
                lineHeight: 20, //设置最后一行空数据高度，为了能让延长线与hr线对接起来
                align: 'center',
              },
              hr: {
                //设置hr是为了让中间线能够自适应长度
                borderColor: 'inherit', //hr的颜色为auto时候会主动显示颜色的
                width: '105%',
                borderWidth: 0.5,
                height: 0.5,
              },
              per: {
                //用百分比数据来调整下数字位置，显的好看些。如果不设置，formatter最后一行的空数据就不需要
                padding: [4, 0],
              },
            },
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold',
            },
          },
          data: [
            { value: 1462543.739, name: '无烟煤' },
            { value: 450692.2, name: '烟煤' },
            { value: 3361833, name: '洗精煤' },
            { value: 24413.5, name: '焦炭' },
            { value: 959906.6, name: '石灰石' },
            { value: 236288.9, name: '白云石' },
            { value: 1099744, name: '电力' },
          ],
        },
      ],
    },
    option2: {
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['焦化', '烧结', '球团', '炼铁', '炼钢', '轧钢'],
        top: '10%',
      },
      title: {
        text: '生产工序碳排放趋势',
        left: 'center',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['2017', '2018', '2019', '2020', '2021'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [1366971, 1436579, 47458, 2683697, 324465, 1543301],
          name: '焦化',
          smooth: true,
          type: 'line',
        },
        {
          data: [1816214.312, 1344496.161, 48981.29642, 2382634.665, 328189.6966, 1586418.023],
          name: '烧结',
          smooth: true,
          type: 'line',
        },
        {
          data: [1600305.703, 1386529.509, 46505.6071, 2338902.767, 335773.6222, 1375702.357],
          name: '球团',
          smooth: true,
          type: 'line',
        },
        {
          data: [1878130.181, 1331806.641, 48354.78275, 2121544.289, 272256.8509, 1427880.629],
          name: '炼铁',
          smooth: true,
          type: 'line',
        },
        {
          data: [1727869.6, 1365901.122, 49337.2215, 2461890.851, 377695.6893, 1456664.881],
          name: '炼钢',
          smooth: true,
          type: 'line',
        },
      ],
    },
    option3: {
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      title: {
        text: '工序输入碳占比',
        left: 'center',
      },
      grid: {
        top: '10px',
        left: 0,
        right: '1px',
        bottom: 0,
        containLabel: true,
      },
      series: [
        {
          name: '碳排放',
          type: 'pie',
          radius: '70%',
          center: ['50%', '55%'],
          emphasis: {
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          },
          data: [
            { name: '焦化', value: 1366971 },
            { name: '烧结', value: 1436579 },
            { name: '球团', value: 47458 },
            { name: '炼铁', value: 2683697 },
            { name: '炼钢', value: 324465 },
            { name: '轧钢', value: 1543301 },
          ],
        },
      ],
    },
    option4: {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
        },
      },

      legend: {
        data: ['碳排放(t)', '吨碳排放(t/t)'],
        top: '25px',
      },
      title: {
        text: '全流程碳排放趋势',
        left: 'center',
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '1%',
        top: '50px',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        axisTick: {
          alignWithLabel: true,
        },
        data: [2017, 2018, 2019, 2020, 2021],
      },
      yAxis: [
        {
          type: 'value',
          name: '碳排放',
          position: 'left',
          alignTicks: true,
          min: 10300000,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[0],
            },
          },
          axisLabel: {
            formatter: '{value}',
          },
        },
        {
          type: 'value',
          name: '吨碳排放',
          position: 'right',
          alignTicks: true,
          min: 1.8,
          axisLine: {
            show: true,
            lineStyle: {
              color: colors[2],
            },
          },
          axisLabel: {
            formatter: '{value}',
          },
        },
      ],
      series: [
        {
          name: '碳排放(t)',
          type: 'bar',
          data: [10585696, 10740305, 10497242, 10607339, 10849679],
        },
        {
          name: '吨碳排放(t/t)',
          type: 'line',
          yAxisIndex: 1,
          data: [1224, 1814, 1523, 1430, 1879],
        },
      ],
    },
  });

  const ParseFloat2Int = function (num) {
    return Number.parseInt(num);
  };
  const ParseFloatFixed2 = function (num) {
    return Number.parseFloat(num).toFixed(2);
  };
</script>
<style lang="scss" scoped>
  .el-card :deep(.el-card__header) {
    padding: 10px 10px;
  }
</style>
