import Layout from '@/layouts/index.vue'
import DashboardIcon from '@/assets/test-img/icon_menu_zaizhu.svg'

export default [
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/base',
    name: 'dashboard',
    meta: { title: '工作台', icon: DashboardIcon, single: true },
    children: [
      {
        path: 'base',
        name: 'DashboardBase',
        component: () => import('@/pages/dashboard/base/index.vue'),
        meta: { title: '工作台', icon: DashboardIcon }
      }
    ]
  }
]
