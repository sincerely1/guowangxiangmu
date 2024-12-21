<template>
  <div class="index-conntainer">
    <div class="content">
      <el-row :gutter="10">
        <el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
          <!-- 全部结点 -->
          <div class="KGQA">
            <el-input
              v-model="KGQAKey"
              placeholder="请输入你的问题"
              class="input-with-select"
              @keyup.enter.native="handleKGQAData"
            >
              <template #append>
                <el-button :icon="Search" @click="handleKGQAData" />
              </template>
            </el-input>
          </div>
          <el-divider></el-divider>
          <h3>{{ title }}</h3>
          <div> </div>
          <el-card body-style="height:600px;width:100%">
            <el-scrollbar height="600px">
              <div class="QuestionAnser" v-for="item in questionList" :key="item.id">
                <div class="question">
                  <el-avatar
                    shape="square"
                    :size="33"
                    :src="user"
                    style="margin-right: 10px; background-color: white"
                  ></el-avatar>
                  <div class="question-text">
                    {{ item.question }}
                  </div>
                </div>
                <div class="answer">
                  <div class="answer-text">
                    {{ item.answer }}
                  </div>
                  <el-avatar
                    shape="square"
                    :size="33"
                    :src="picture"
                    style="margin-left: 10px"
                  ></el-avatar>
                </div>
              </div>
            </el-scrollbar>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
          <el-card class="card" shadow="hover">
            <template #header>
              <h3 class="title">知识服务介绍</h3>
            </template>
            <span style="font-size: 16px; white-space: pre-wrap">{{ introduce }}</span>
            <span style="white-space: pre-wrap">{{ wrap }}</span>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <span style="font-size: 15px; white-space: pre-wrap">{{ sentence_1 }}</span>
            <span style="white-space: pre-wrap">{{ wrap }}</span>
            <el-button type="success" icon="el-icon-check" circle></el-button>
            <span style="font-size: 15px; white-space: pre-wrap"> {{ sentence_2 }}</span>
            <span style="white-space: pre-wrap">{{ wrap }}</span>
            <el-button type="primary" icon="el-icon-edit" circle></el-button>
            <span style="font-size: 15px; white-space: pre-wrap">{{ sentence_3 }}</span>
            <span style="white-space: pre-wrap">{{ wrap }}</span>
            <el-button type="success" icon="el-icon-check" circle></el-button>
            <span style="font-size: 15px; white-space: pre-wrap"> {{ sentence_4 }}</span>
          </el-card>
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
  import { ref, computed, reactive, onBeforeMount } from 'vue';

  import Echarts from '@/components/Echarts/index.vue';
  import { KGQAresponse } from '@/api/KGQA';
  import { Search } from '@element-plus/icons-vue';
  import picture from '@/assets/image/State_Grid_1.png';
  import user from '@/assets/user.png';
  const KGQAKey = ref('');

  const title = '智能回复';

  const questionList = ref([]);

  const introduce = '知识服务提供对双碳问题的智能分析与回复，具体可参照下方事例。\n';
  const sentence_1 = '  双碳的概念是什么？\n';
  const wrap = '  \n';
  const sentence_2 = '  概念是2030年前实现碳达峰、2060年前实现碳中和\n';
  const sentence_3 = '  碳达峰碳中和标准体系建设的主要目标是什么？\n';
  const sentence_4 = '  围绕基础通用标准基本建成碳达峰碳中和标准体系建设\n';

  const handleKGQAData = async () => {
    const { data } = await KGQAresponse({ key: KGQAKey.value });
    questionList.value.push({
      id: questionList.value.length,
      question: KGQAKey.value,
      answer: data,
    });
  };
  const KGQA = reactive({});
</script>

<style lang="scss" scoped>
  .QuestionAnser {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .question {
    display: flex;
    margin-bottom: 10px;
    max-width: 50%;
  }
  .question-text {
    background-color: #409eff;
    border-radius: 10px;
    padding: 10px;
  }
  .answer {
    display: flex;
    margin-bottom: 10px;
    transform: translate(-40px);
    align-self: flex-end;
    justify-content: flex-end;
    max-width: 60%;
  }
  .answer-text {
    background-color: #f1f2f2;
    border-radius: 10px;
    padding: 10px;
  }
</style>
