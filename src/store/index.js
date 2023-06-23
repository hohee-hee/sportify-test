import Vue from "vue";
import Vuex from "vuex";
// import axios from "axios";
import router from "@/router";
import axiosConfig from "@/api/axiosConfig.js";

Vue.use(Vuex);

// const REST_API = `http://localhost:9999/api`;

export default new Vuex.Store({
  state: {
    loginUser: {}, // nickname
    boards: [], // 전체 게시판 목록
    board: {}, //현재 게시판 정보
    REST_API: "http://localhost:9999/api", // rest api 기본 주소
  },
  getters: {},
  mutations: {
    LOGIN_USER(state, payload) {
      state.loginUser = payload;
    },
    LOGOUT_USER(state) {
      state.loginUser = {};
    },
    GET_BOARDS(state, payload) {
      state.boards = payload;
    },
    GET_BOARD(state, payload) {
      state.board = payload;
    },
  },
  actions: {
    loginUser({ commit }, payload) {
      axiosConfig
        .getAxios("user_login", "POST", payload, "")
        .then((res) => {
          commit("LOGIN_USER", res.data);
          alert(this.state.loginUser.nickname + "님, 환영합니다😊");
          router.go(-1);
        })
        .catch(() => {
          alert("아이디 또는 비밀번호가 틀렸습니다😭");
        });
    },
    logoutUser({ commit }) {
      axiosConfig
        .getAxios("user_logout", "GET")
        .then(() => {
          alert(this.state.loginUser.nickname + "님, ㅂㅇㅂㅇ!");
          commit("LOGOUT_USER");
          // router.go(0);
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getBoards({ commit }) {
      axiosConfig
        .getAxios("boardlist_all", "GET")
        .then((res) => {
          commit("GET_BOARDS", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getBoard({ commit }, num) {
      axiosConfig
        .getAxios("boarddetail", "GET", "", num)
        .then((res) => {
          commit("GET_BOARD", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {},
});
