import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import QuizLevel1 from "../views/Level1View.vue";
import QuizLevel2 from "../views/Level2View.vue";
import QuizLevel3 from "../views/Level3View.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/quiz-level1",
    name: "level1",
    component: QuizLevel1,
  },
  {
    path: "/quiz-level2",
    name: "level2",
    component: QuizLevel2,
  },
  {
    path: "/quiz-level3",
    name: "level3",
    component: QuizLevel3,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
