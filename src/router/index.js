import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/** note: submenu only apppear when children.length>=1
*   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
**/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [{
  path: '/baseManager',
  component: Layout,
  name: '基础配置管理',
  icon: 'setting',
  authority: 'baseManager',
  children: [{
    path: 'userManager',
    icon: 'fa-user',
    component: _import('admin/user/index'),
    name: '用户管理',
    authority: 'userManager'
  }, {
    path: 'menuManager',
    icon: 'category',
    component: _import('admin/menu/index'),
    name: '菜单管理',
    authority: 'menuManager'
  }, {
    path: 'groupManager',
    icon: 'group_fill',
    component: _import('admin/group/index'),
    name: '角色权限管理',
    authority: 'groupManager'
  }, {
    path: 'groupTypeManager',
    icon: 'fa-users',
    component: _import('admin/groupType/index'),
    name: '角色类型管理',
    authority: 'groupTypeManager'
  }, {
    path: 'gateLogManager',
    icon: 'viewlist',
    component: _import('admin/gateLog/index'),
    name: '操作日志管理',
    authority: 'gateLogManager'
  }, {
    path: 'dictManager',
    icon: 'viewlist',
    component: _import('dict/index'),
    name: '数据字典',
    authority: 'dictManager'
  }, {
    path: 'tenantManager',
    icon: 'tenant',
    component: _import('admin/tenant/index'),
    name: '租户管理',
    authority: 'tenantManager'
  }, {
    path: 'jobManager',
    icon: 'tenant',
    component: _import('admin/job/index'),
    name: '定时任务管理',
    authority: 'jobManager'
  }]
}, {
  path: '/orgManager',
  component: Layout,
  name: '部门组织管理',
  icon: 'setting',
  authority: 'orgManager',
  children: [{
    path: 'departManager',
    component: _import('org/depart/index'),
    name: '服务权限管理',
    authority: 'departManager'
  }]
}, {
  path: '/authManager',
  component: Layout,
  name: '服务管理',
  icon: 'setting',
  authority: 'authManager',
  children: [{
    path: 'serviceManager',
    component: _import('auth/service/index'),
    name: '服务权限管理',
    authority: 'serviceManager'
  }, {
    path: 'apiManager',
    component: _import('auth/api/index'),
    name: '服务接口管理',
    authority: 'apiManager'
  }, {
    path: 'gatewayManager',
    component: _import('auth/gatewayRoute/index'),
    name: '网关路由管理',
    authority: 'gatewayManager'
  }, {
    path: 'oauthClientDetailsManager',
    component: _import('auth/oauthClientDetails/index'),
    name: 'OAuth客户端管理',
    authority: 'oauthClientDetailsManager'
  }]
}, {
  path: '/monitorManager',
  component: Layout,
  name: '监控模块管理',
  icon: 'setting',
  authority: 'monitorManager',
  children: [{
    path: 'serviceEurekaManager',
    component: _import('monitor/eureka/index'),
    name: 'Eureka注册中心',
    authority: 'serviceEurekaManager'
  }, {
    path: 'serviceMonitorManager',
    component: _import('monitor/service/index'),
    name: '服务状态监控',
    authority: 'serviceMonitorManager'
  }, {
    path: 'serviceZipkinManager',
    component: _import('monitor/zipkin/index'),
    name: '服务链路监控',
    authority: 'serviceZipkinManager'
  }]
}, {
  path: '/appManager',
  component: Layout,
  name: '会员管理模块',
  icon: 'setting',
  authority: 'appManager',
  children: [{
    path: 'appUserManager',
    component: _import('app/appUser/index'),
    name: '会员账户管理',
    authority: 'appUserManager'
  }]
}]
