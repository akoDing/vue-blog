import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      component: resolve => require(["./components/page/login.vue"], resolve)
    },
    {
      path: "/",
      component: resolve => require(["./components/common/Home.vue"], resolve),
      meta: { title: "自述文件" },
      children: [
        {
          path: "/dashboard",
          component: resolve =>
            require(["./components/page/Dashboard.vue"], resolve),
          meta: { title: "系统首页" }
        },
        {
          path: "/form",
          component: resolve =>
            require(["./components/page/BaseForm.vue"], resolve),
          meta: { title: "基本表单" }
        },
        {
          path: "/table",
          component: resolve =>
            require(["./components/page/BaseTable.vue"], resolve),
          meta: { title: "基础表格" }
        },
        {
          path: "/blogList",
          component: resolve =>
            require(["./components/page/BlogList.vue"], resolve),
          meta: { title: "博客列表" },
        },
        {
          path: "/blogDetail/:id",
          component: resolve =>
            require(["./components/page/BlogDetail.vue"], resolve),
          meta: { title: "博客详情" }
        }
      ]
    }
  ]
});
