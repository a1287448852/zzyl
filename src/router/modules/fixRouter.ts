import Layout from '@/layouts/index.vue'
import liveInIcon from '@/assets/test-img/icon_menu_zaizhu.svg'

export default [
  {
    path: '/userCenter',
    component: Layout,
    name: 'consumerIndex',
    redirect: '/userCenter/index',
    meta: {
      title: '个人中心'
    },
    children: [
      {
        path: '/userCenter/index',
        name: 'index',
        component: () => import('@/pages/user/personal/index.vue'),
        meta: {
          title: '个人中心'
        }
      }
    ]
  },
  {
    path: '/news',
    name: 'news',
    component: Layout,
    redirect: '/news/newlist',
    meta: {
      title: '消息中心'
    },
    children: [
      {
        path: '/news/newlist',
        name: 'newlist',
        component: () => import('@/pages/news/index.vue'),
        meta: {
          title: '消息通知'
        }
      }
    ]
  }
]
