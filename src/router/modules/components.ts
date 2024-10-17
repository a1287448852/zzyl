import Layout from '@/layouts/index.vue'
import htIcon from '@/assets/test-img/icon-ht.svg'
import FormIcon from '@/assets/test-img/icon_menu_cheliang.svg'
import GrzxIcon from '@/assets/test-img/icon-cwgl.svg'
import liveInIcon from '@/assets/test-img/icon_menu_zaizhu.svg'

const normalRouter = [
  {
    path: '/appointment',
    name: 'appointment',
    component: Layout,
    redirect: '/appointment/subscribe',
    meta: {
      title: '来访管理',
      icon: liveInIcon,
      single: true
    },
    children: [
      {
        path: 'subscribe',
        name: 'subscribe',
        component: () => import('@/pages/appointment/subscribe/index.vue'),
        meta: {
          title: '预约登记'
        }
      },
      {
        path: 'comeVisit',
        name: 'comeVisit',
        component: () => import('@/pages/appointment/comeVisit/index.vue'),
        meta: {
          title: '来访登记'
        }
      }
    ]
  },
  {
    path: '/enterQuit',
    name: 'enterQuit',
    component: Layout,
    redirect: '/enterQuit/enterManage',
    meta: {
      title: '入退管理',
      single: true
    },
    children: [
      {
        path: 'enterManage',
        name: 'enterManage',
        component: () => import('@/pages/enterQuitV2/enter/index.vue'),
        meta: {
          title: '入住办理'
        }
      },
      {
        path: 'enterDetails',
        name: 'enterDetails',
        component: () => import('@/pages/enterQuitV2/enter/details.vue'),
        meta: {
          title: '入住申请',
          hidden: true
        }
      },
      {
        path: 'quitManage',
        name: 'quitManage',
        component: () => import('@/pages/enterQuitV2/quit/index.vue'),
        meta: {
          title: '退住办理'
        }
      },
      {
        path: 'quitDetails',
        name: 'quitDetails',
        component: () => import('@/pages/enterQuitV2/quit/details.vue'),
        meta: {
          title: '退住申请',
          hidden: true
        }
      }
    ]
  },

  {
    path: '/liveIn',
    name: 'liveIn',
    component: Layout,
    redirect: '/liveIn/trackAfter',
    meta: {
      title: '在住管理',
      icon: liveInIcon,
      single: true
    },
    children: [
      {
        path: 'trackAfter',
        name: 'trackAfter',
        component: () => import('@/pages/liveIn/contract/index.vue'),
        meta: {
          title: '合同跟踪'
        }
      },
      {
        path: 'trackDetails',
        name: 'trackDetails',
        component: () => import('@/pages/liveIn/contract/details.vue'),
        meta: {
          title: '合同详情',
          hidden: true,
          fmeta: { path: '/liveIn/track', title: '合同跟踪' }
        }
      },
      {
        path: 'houseType',
        name: 'houseType',
        component: () => import('@/pages/liveIn/bed/houseType/index.vue'),
        meta: {
          title: '床位房型'
        }
      },
      {
        path: 'houseSet',
        name: 'houseSet',
        component: () => import('@/pages/liveIn/bed/houseSet/index.vue'),
        meta: {
          title: '房型设置'
        }
      },
      {
        path: 'smartBed',
        name: 'smartBed',
        component: () => import('@/pages/liveIn/bed/smartBed/index.vue'),
        meta: {
          title: '智能床位'
        }
      }
    ]
  },
  {
    path: '/serve',
    name: 'serve',
    component: Layout,
    redirect: '/serve/grade',
    meta: {
      title: '服务管理',
      icon: liveInIcon,
      single: true
    },
    children: [
      {
        path: 'grade',
        name: 'grade',
        component: () => import('@/pages/serve/plan/grade/index.vue'),
        meta: {
          title: '护理等级'
        }
      },
      {
        path: 'nurseProject',
        name: 'nurseProject',
        component: () => import('@/pages/serve/plan/project/index.vue'),
        meta: {
          title: '护理项目'
        }
      },
      {
        path: 'nursePlan',
        name: 'nursePlan',
        component: () => import('@/pages/serve/plan/nurse/index.vue'),
        meta: {
          title: '护理计划'
        }
      },
      {
        path: 'arrange',
        name: 'arrange',
        component: () => import('@/pages/serve/task/index.vue'),
        meta: {
          title: '任务安排'
        }
      },
      {
        path: 'oldPeople',
        name: 'oldPeople',
        component: () => import('@/pages/serve/task/oldPeople/index.vue'),
        meta: {
          title: '负责老人'
        }
      },
      {
        path: 'serveDetails',
        name: 'serveDetails',
        component: () => import('@/pages/serve/task/details.vue'),
        meta: {
          title: '任务详情',
          hidden: true,
          fmeta: { path: '/serve/arrange', title: '任务安排' }
        }
      }
    ]
  },
  {
    path: '/order',
    name: 'order',
    component: Layout,
    redirect: '/order/olist',
    meta: {
      title: '订单管理',
      icon: liveInIcon,
      single: true
    },
    children: [
      {
        path: 'olist',
        name: 'olist',
        component: () => import('@/pages/order/order/index.vue'),
        meta: {
          title: '订单管理'
        }
      },
      {
        path: 'refund',
        name: 'refund',
        component: () => import('@/pages/order/refund/index.vue'),
        meta: {
          title: '退款管理'
        }
      },
      {
        path: 'orderDetails',
        name: 'orderDetails',
        component: () => import('@/pages/order/order/details.vue'),
        meta: {
          title: '订单详情',
          hidden: true
        }
      }
    ]
  },
  {
    path: '/finance',
    name: 'finance',
    component: Layout,
    redirect: '/finance/enterAccount',
    meta: { title: '财务管理', single: true },
    children: [
      {
        path: 'enterAccount',
        name: 'enterAccount',
        component: () => import('@/pages/financing/bill/index.vue'),
        meta: {
          title: '入账列表'
        }
      },
      {
        path: 'arrearage',
        name: 'arrearage',
        component: () => import('@/pages/financing/arrearage/index.vue'),
        meta: {
          title: '欠费老人'
        }
      },
      {
        path: 'topUp',
        name: 'topUp',
        component: () => import('@/pages/financing/prestore/index.vue'),
        meta: {
          title: '预缴款充值'
        }
      },
      {
        path: 'balance',
        name: 'balance',
        component: () => import('@/pages/financing/balance/index.vue'),
        meta: {
          title: '余额查询'
        }
      },
      {
        path: 'billDetails',
        name: 'details',
        component: () => import('@/pages/financing/bill/details.vue'),
        meta: {
          title: '账单详情',
          hidden: true,
          fmeta: { path: '/finance/enterAccount', title: '账单列表' }
        }
      }
    ]
  },
  {
    path: '/client',
    name: 'client',
    component: Layout,
    redirect: '/client/list',
    meta: {
      title: '客户管理',
      icon: liveInIcon,
      single: true
    },
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import('@/pages/client/index.vue'),
        meta: {
          title: '客户信息'
        }
      }
    ]
  },
  {
    path: '/permission',
    name: 'permission',
    component: Layout,
    redirect: '/permission/user',
    meta: { title: '权限管理', icon: GrzxIcon, single: true },
    children: [
      {
        path: 'role',
        name: 'role',
        component: () => import('@/pages/permission/role/index.vue'),
        meta: {
          title: '角色管理'
        }
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('@/pages/permission/menu/index.vue'),
        meta: {
          title: '资源管理'
        }
      },
      {
        path: 'dept',
        name: 'dept',
        component: () => import('@/pages/permission/dept/index.vue'),
        meta: {
          title: '部门管理'
        }
      },
      {
        path: 'post',
        name: 'post',
        component: () => import('@/pages/permission/post/index.vue'),
        meta: {
          title: '职位管理'
        }
      },
      {
        path: 'user',
        name: 'user',
        component: () => import('@/pages/permission/user/index.vue'),
        meta: {
          title: '用户信息'
        }
      }
    ]
  },
  {
    path: '/active',
    name: 'active',
    component: Layout,
    redirect: '/active/backlogAfter',
    meta: {
      title: '协同工作',
      single: true
    },
    children: [
      {
        path: 'backlogAfter',
        name: 'backlogAfter',
        component: () => import('@/pages/synergy/backlog/index.vue'),
        meta: {
          title: '我的待办'
        }
      },
      {
        path: 'apply',
        name: 'applyParent',
        component: () => import('@/pages/synergy/apply/index.vue'),
        meta: {
          title: '我的申请'
        }
      },
      {
        path: 'applyDetails',
        name: 'applyDetails',
        component: () => import('@/pages/synergy/apply/details.vue'),
        meta: {
          title: '退住申请',
          hidden: true,
          fmeta: { path: '/active/backlog', title: '协同工作' }
        }
      },
      {
        path: 'selectHouse',
        name: 'selectHouse',
        component: () => import('@/pages/liveIn/bed/houseType/index.vue'),
        meta: {
          title: '床位房型',
          hidden: true,
          fmeta: { path: '/active/backlog', title: '协同工作' }
        }
      }
    ]
  },
  {
    path: '/intelligence',
    name: 'intelligence',
    component: Layout,
    redirect: '/intelligence/equipment',
    meta: { title: '智能监测', single: true },
    children: [
      {
        path: 'equipment',
        name: 'equipment',
        component: () => import('@/pages/intelligence/equipment/index.vue'),
        meta: {
          title: '设备管理'
        }
      },
      {
        path: 'equiDetails',
        name: 'equiDetails',
        component: () => import('@/pages/intelligence/equipment/details.vue'),
        meta: {
          title: '设备详情',
          hidden: true,
          fmeta: { path: '/intelligence/equipment', title: '设备管理' }
        }
      },
      {
        path: 'facility',
        name: 'facility',
        component: () => import('@/pages/intelligence/facility/index.vue'),
        meta: {
          title: '报警数据'
        }
      },
      {
        path: 'rule',
        name: 'rule',
        component: () => import('@/pages/intelligence/warn/index.vue'),
        meta: {
          title: '报警规则'
        }
      },
      {
        path: 'ruleDetails',
        name: 'ruleDetails',
        component: () => import('@/pages/intelligence/warn/details.vue'),
        meta: {
          title: '报警规则详情',
          hidden: true
        }
      }
    ]
  }
  // {
  //   path: '/userCenter',
  //   component: Layout,
  //   name: 'consumerIndex',
  //   redirect: '/userCenter/index',
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'index',
  //       component: () => import('@/pages/user/personal/index.vue'),
  //       meta: {
  //         title: '个人中心'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/news',
  //   name: 'news',
  //   component: Layout,
  //   redirect: '/news/newlist',
  //   meta: {
  //     title: '消息中心'
  //   },
  //   children: [
  //     {
  //       path: 'newlist',
  //       name: 'newlist',
  //       component: () => import('@/pages/news/index.vue'),
  //       meta: {
  //         title: '消息中心'
  //       }
  //     }
  //   ]
  // }
]

export default normalRouter
