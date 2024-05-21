import { createRouter, createWebHistory } from "vue-router";
// ---------------------------UseCases Stores----------------------------------------
import screenLocked from "../views/LockScreen.vue";
import MainMenu from "../views/MainMenu.vue";
import Teller from "../views/Teller.vue";
///EndImports///

const routes = [
  {
    path: "/screenLocked",
    name: "screenLocked",
    component: screenLocked,
    meta: {
      hideNavbar: true,
    },
  },
  {
    path: "/",
    name: "MainMenu",
    component: MainMenu,
    meta: {
      hide: "true",
      hideBaseBtn: true,
      title: "Main Menu",
      activeNav: "1",
      hideSideNavMenu: false,
    },
  },
  {
    path: "/Teller",
    name: "Teller",
    component: Teller,
    meta: {
      hide: "true",
      title: "Teller",
      hideSideNavMenu: false,
      activeNav: "5-1",
    },
  },
  ///EndRoutes///
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    let main = document.querySelector('.el-main')
    if (main) {
      main.scrollTop = 0
    }
    return {
      top: 0
    }
  }
});

export default router;
