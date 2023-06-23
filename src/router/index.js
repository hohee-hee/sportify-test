import Vue from "vue";
import VueRouter from "vue-router";

import TestView from "../views/TestView.vue";

import TestStart from "../components/MbtiTest/TestStart.vue";
import QuestionPage from "../components/MbtiTest/QuestionPage.vue";
import TestResult from "../components/MbtiTest/TestResult.vue";

Vue.use(VueRouter);

const routes = [
  // mbti test view
  {
    path: "",
    name: "testView",
    component: TestView,
    children: [
      {
        path: "",
        name: "testStart",
        component: TestStart,
      },
      {
        path: "question",
        name: "questionPage",
        component: QuestionPage,
      },
      {
        path: "result",
        name: "testResult",
        component: TestResult,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
