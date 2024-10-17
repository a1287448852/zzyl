import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'
import router, { asyncRouterList } from '@/router'
import { store, useUserStore } from '@/store'
import { routerFormat } from '@/utils'
import fixRouter from '@/router/modules/fixRouter'

function filterPermissionsRouters(
  routes: Array<RouteRecordRaw>,
  roles: Array<unknown>
) {
  const res = []
  const removeRoutes = []
  routes.forEach((route) => {
    const children = []
    route.children?.forEach((childRouter) => {
      const roleCode = childRouter.meta?.roleCode || childRouter.name
      if (roles.indexOf(roleCode) !== -1) {
        children.push(childRouter)
      } else {
        removeRoutes.push(childRouter)
      }
    })
    if (children.length > 0) {
      route.children = children
      res.push(route)
    }
  })
  return { accessedRouters: res, removeRoutes }
}

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    whiteListRouters: ['/login'],
    isDynamic: false, // 是否使用动态路由
    routers: [], // 静态路由
    dynamic: [], // 动态路由
    removeRoutes: [],
    childrenRoutes: [] // 左侧子菜单路由
  }),
  actions: {
    // 用于style风格中的tooMany当页面刷新时， 左侧菜单数据保存,并且将路由的二级路由带parent字段的整合到parent对应的二级路由中作为三级路由
    initCurrentRoutes() {
      const routeArr = this.isDynamic
        ? this.dynamic.concat(fixRouter) // 给动态路由添加不需要配置的固定路由
        : this.routers
      console.log(routeArr, 'routeArr')
      // 动态路由(动态路由配置时需要保证菜单路径和本地路由路径统一)
      const childrenRoutes = routeArr.filter((item) =>
        window.location.hash.includes(item.path)
      )
      const currentRoutes = childrenRoutes.length
        ? childrenRoutes[0].children
        : []
      this.childrenRoutes = currentRoutes
    },
    // 根据roles的角色权限动态处理路由
    async initRoutes(roles: Array<unknown>) {
      // 从后端拿到的动态路由信息
      const routeStore = useUserStore()
      const baseRouter = routerFormat(routeStore.$state.trendsRoute)

      let accessedRouters = []
      let removeRoutes = []
      if (roles.includes('all')) {
        accessedRouters = asyncRouterList // 这里是控制权限菜单 默
      } else {
        const res = filterPermissionsRouters(baseRouter, roles)
        accessedRouters = res.accessedRouters
        removeRoutes = res.removeRoutes
      }
      this.routers = accessedRouters
      this.removeRoutes = removeRoutes

      removeRoutes.forEach((item: RouteRecordRaw) => {
        if (router.hasRoute(item.name)) {
          router.removeRoute(item.name)
        }
      })
    },
    async restore() {
      this.removeRoutes.forEach((item: RouteRecordRaw) => {
        router.addRoute(item)
      })
    },
    setRouters(data: any) {
      this.dynamic = data
    }
  },
  persist: true
})

export function getPermissionStore() {
  return usePermissionStore(store)
}
