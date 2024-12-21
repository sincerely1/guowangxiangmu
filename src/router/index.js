import * as VueRouter from 'vue-router';
import Layout from '@/layouts/index.vue';
import i18n from '@/locales';
const { global } = i18n;
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录',
    },
    hidden: true,
  },
  {
    path: '/401',
    name: '401',
    component: () => import('@/views/errorPage/401.vue'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/errorPage/404.vue'),
    hidden: true,
  },
];

export const asyncRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    name: 'Root',
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('../views/index/index.vue'),
        // component: () => import('@/views/2d-graph/index.vue'),
        meta: {
          title: global.t('route.home'),
          icon: 'icon-home',
          affix: true,
          noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/upload',
    component: Layout,
    name: 'upload',
    children: [
      {
        path: '/upload-page',
        name: 'upload-page',
        component: () => import('@/views/upload/index.vue'),
        meta: {
          title: global.t('route.upload'),
          icon: 'icon-figma-flatten-selection',
        },
      },
    ],
  },
  {
    path: '/carbon',
    component: Layout,
    name: 'carbon',
    children: [
      {
        path: '/carbon-page',
        name: 'carbon-page',
        component: () => import('@/views/carbon/index.vue'),
        meta: {
          title: global.t('route.carbon'),
          icon: 'icon-cycle',
          // affix: true,
          // noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/enterprise',
    component: Layout,
    name: 'enterprise',
    meta: { title: global.t('route.enterprise'), icon: 'icon-sales-report' },
    children: [
      {
        path: '/enterpriseCarbonSystem',
        name: '/enterpriseCarbonSystem',
        component: () => import('@/views/enterprise-manage/enterpriseCarbonSystem.vue'),
        meta: {
          title: global.t('route.enterpriseManage'),
          icon: 'icon-chart-histogram-two',
        },
      },
      {
        path: '/AllenterpriseCarbon',
        name: '/AllenterpriseCarbon',
        component: () => import('@/views/enterprise-manage/AllenterpriseCarbon.vue'),
        meta: {
          title: global.t('route.AllenterpriseManage'),
          icon: 'icon-analysis',
        },
      },
    ],
  },
  // {
  //   path: '/3d-graph',
  //   component: Layout,
  //   name: '3d-graph',
  //   children: [
  //     {
  //       path: '/3d-graph-page',
  //       name: '3d-graph-page',
  //       component: () => import('@/views/3d-graph/nodeTxt.vue'),
  //       meta: {
  //         title: global.t('route.graph'),
  //         icon: 'icon-graphic-design-two',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/graph-get',
  //   component: Layout,
  //   name: 'graph-get',
  //   children: [
  //     {
  //       path: '/graph-get-page',
  //       name: 'graph-get-page',
  //       component: () => import('@/views/graph-get/index.vue'),
  //       meta: {
  //         title: global.t('route.graphGet'),
  //         icon: 'icon-new-afferent',
  //       },
  //     },
  //   ],
  // },
  {
    path: '/graph',
    component: Layout,
    name: 'graph',
    meta: { title: global.t('route.KnowledgeGraph'), icon: 'icon-activity-source' },
    children: [
      {
        path: '/2d-graph',
        name: '/2d-graph',
        component: () => import('@/views/2d-graph/index.vue'),
        meta: {
          title: global.t('route.graph2D'),
          icon: 'icon-graphic-design',
        },
      },
      {
        path: '/3d-graph',
        name: '3d-graph',
        component: () => import('@/views/3d-graph/nodeTxt.vue'),
        meta: {
          title: global.t('route.graph'),
          icon: 'icon-graphic-design-two',
        },
      },
      {
        path: '/search-page',
        name: 'search-page',
        component: () => import('@/views/search/index.vue'),
        meta: {
          title: global.t('route.search'),
          icon: 'icon-search',
          // affix: true,
          // noKeepAlive: true,
        },
      },
      {
        path: '/graph-get',
        name: 'graph-get',
        component: () => import('@/views/graph-get/index.vue'),
        meta: {
          title: global.t('route.graphGet'),
          icon: 'icon-new-afferent',
        },
      },
    ],
  },
  // {
  //   path: '/search',
  //   component: Layout,
  //   name: 'search',
  //   children: [
  //     {
  //       path: '/search-page',
  //       name: 'search-page',
  //       component: () => import('@/views/search/index.vue'),
  //       meta: {
  //         title: global.t('route.search'),
  //         icon: 'icon-search',
  //         // affix: true,
  //         // noKeepAlive: true,
  //       },
  //     },
  //   ],
  // },
  {
    path: '/KGQA',
    component: Layout,
    name: 'KGQA',
    children: [
      {
        path: '/KGQA-page',
        name: 'KGQA-page',
        component: () => import('@/views/KGQA/index.vue'),
        meta: {
          title: global.t('route.KGQA'),
          icon: 'icon-robot-one',
          // affix: true,
          // noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/prediction',
    component: Layout,
    name: 'prediction',
    children: [
      {
        path: '/prediction-page',
        name: 'prediction-page',
        component: () => import('@/views/prediction/index.vue'),
        meta: {
          title: global.t('route.prediction'),
          icon: 'icon-internal-data',
          // affix: true,
          // noKeepAlive: true,
        },
      },
    ],
  },
  {
    path: '/chat',
    component: Layout,
    name: 'chat',
    children: [
      {
        path: '/chat-page',
        name: 'chat-page',
        component: () => import('@/views/chat/index.vue'),
        meta: {
          title: global.t('route.chat'),
          icon: 'icon-thinking-problem',
          // affix: true,
          // noKeepAlive: true,
        },
      },
    ],
  },
  // {
  //   path: '/generative',
  //   component: Layout,
  //   name: 'generative',
  //   children: [
  //     {
  //       path: '/generative-page',
  //       name: 'generative-page',
  //       component: () => import('@/views/generative/index.vue'),
  //       meta: {
  //         title: global.t('route.generative'),
  //         icon: 'icon-customer',
  //         // affix: true,
  //         // noKeepAlive: true,
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '/comp',
  //   component: Layout,
  //   name: 'Comp',
  //   meta: { title: global.t('route.components'), icon: 'icon-code' },
  //   children: [
  //     {
  //       path: '/element',
  //       name: 'ElementComp',
  //       component: () => import('@/views/element/index.vue'),
  //       meta: {
  //         title: global.t('route.eleComponents'),
  //         icon: 'icon-code',
  //       },
  //     },
  //     {
  //       path: '/iconPark',
  //       name: 'IconPark',
  //       component: () => import('@/views/icon/index.vue'),
  //       meta: {
  //         title: global.t('route.icons'),
  //         icon: 'icon-like',
  //       },
  //     },
  //     {
  //       path: '/chart',
  //       name: 'Chart',
  //       component: () => import('@/views/echarts/index.vue'),
  //       meta: {
  //         title: global.t('route.charts'),
  //         icon: 'icon-chart-line',
  //       },
  //       children: [
  //         {
  //           path: '/line',
  //           name: 'Line',
  //           component: () => import('@/views/echarts/line.vue'),
  //           meta: {
  //             title: global.t('route.lineChart'),
  //           },
  //         },
  //         {
  //           path: '/bar',
  //           name: 'Bar',
  //           component: () => import('@/views/echarts/bar.vue'),
  //           meta: {
  //             title: global.t('route.barChart'),
  //           },
  //         },
  //         {
  //           path: '/otherChart',
  //           name: 'OtherChart',
  //           component: () => import('@/views/echarts/other.vue'),
  //           meta: {
  //             title: global.t('route.mixedChart'),
  //           },
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   path: '/errorPage',
  //   name: 'ErrorPage',
  //   component: Layout,
  //   meta: {
  //     title: global.t('route.errorPages'),
  //     icon: 'icon-link-cloud-faild',
  //   },
  //   children: [
  //     {
  //       path: '/404Page',
  //       name: '404Page',
  //       component: () => import('@/views/errorPage/404.vue'),
  //       meta: {
  //         title: global.t('route.page404'),
  //         icon: 'icon-link-cloud-faild',
  //       },
  //     },
  //     {
  //       path: '/401Page',
  //       name: '401Page',
  //       component: () => import('@/views/errorPage/401.vue'),
  //       meta: {
  //         title: global.t('route.page401'),
  //         icon: 'icon-link-interrupt',
  //       },
  //     },
  //   ],
  // },
  // {
  //   path: '*',
  //   redirect: '/404',
  //   hidden: true,
  // },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes: constantRoutes,
});

// reset router
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

export default router;
