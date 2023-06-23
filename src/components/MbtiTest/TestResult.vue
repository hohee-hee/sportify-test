<template>
  <div class="container">
    <h2>나에게 어울리는 운동은...</h2>
    <p></p>
    <div class="res-title">
      <div class="res-typesum">
        {{ result.typesum }}
      </div>
      <div class="res-typename">
        {{ result.typename }}
      </div>
    </div>
    <br /><br />
    <div class="res-content">
      <img
        :src="imgsrc"
        alt=""
      />
      <div class="res-typedes">
        {{ result.typedes }}
      </div>
    </div>
    <div class="deco">
      <img
        class="deco-tri"
        src="@/assets/mbti/deco/triangle.png"
        alt=""
      />
      <img
        class="deco-tri"
        src="@/assets/mbti/deco/triangle.png"
        alt=""
      />
      <img
        class="deco-tri"
        src="@/assets/mbti/deco/triangle.png"
        alt=""
      />
    </div>

    <!-- 게시판 정보 받아오기 -->
    <div class="board-btn">
      <!-- 게시판 하나 띄워주기 -->
      <button
        class="board-main-btn"
        @click="noRouter"
      >
        <p class="board-main-btn-title">나에게 맞는 운동 게시판</p>
        <br />
        <br />
        <p class="board-main-btn-name">{{ result.typename }} 게시판</p>
      </button>

      <!-- 랜덤 게시판 연결 -->
      <button
        class="board-random-btn"
        @click="noRouter"
      >
        <p class="board-random-btn-title">
          나에게 맞는<br />
          또 다른 운동 게시판
        </p>
        <br />
        <p class="board-random-btn-name">랜덤 게시판</p>
      </button>
    </div>
    <div class="go-btn">
      <button
        class="go-main-btn"
        @click="noRouter"
      >
        Sportify <br />
        바로가기
      </button>
      <router-link to="/">
        <button class="test-retry-btn">
          테스트<br />
          다시하기
        </button></router-link
      >
      <!-- <button class="test-retry-btn" @click="goTest">테스트 다시하기</button> -->
    </div>
    <br /><br />
    <img
      class="logo"
      src="@/assets/logo.png"
      alt=""
    />
  </div>
</template>

<script>
import reslist from "@/assets/mbti/testdata/mbtitestresults.json";
import axios from "axios";

export default {
  name: "testResult",
  data() {
    return {
      type: "", // MBTI
      result: {},
      imgsrc: "",
      no: "",
    };
  },
  watch: {
    type() {
      this.getResult();
    },
  },
  created() {
    // question에서 보낸 파라미터 가져오기
    const answerlist = this.$route.params.answerlist;

    // MBTI 도출해내기
    /*
     * 0-2 : I/E
     * 3-5 : N/S
     * 6-8 : T/F
     * 9-11 : P/J
     */

    // I or E
    let cnt = 0;
    for (let i = 0; i < 3; i++) {
      if (answerlist[i] === 0) cnt++;
    }
    if (cnt > 1) this.type += "I";
    else this.type += "E";

    // N or S
    cnt = 0;
    for (let i = 3; i < 6; i++) {
      if (answerlist[i] === 0) cnt++;
    }
    if (cnt > 1) this.type += "N";
    else this.type += "S";

    // T or F
    cnt = 0;
    for (let i = 6; i < 9; i++) {
      if (answerlist[i] === 0) cnt++;
    }
    if (cnt > 1) this.type += "T";
    else this.type += "F";

    // P or J
    cnt = 0;
    for (let i = 9; i < 12; i++) {
      if (answerlist[i] === 0) cnt++;
    }
    if (cnt > 1) this.type += "P";
    else this.type += "J";

    // 결과 가져오기
    this.getResult();
    // reslist.forEach((res) => {
    //   if (res.mbtitype === this.type) {
    //     this.result = res;
    //     this.imgsrc = require(`@/assets/mbti/img/${this.type}.png`);
    //   }
    // });
  },
  methods: {
    getResult() {
      reslist.forEach((res, index) => {
        if (res.mbtitype === this.type) {
          this.result = res;
          this.imgsrc = require(`@/assets/mbti/mbtiimg/${this.type}.png`);
          this.no = index + 1;
        }
      });
    },
    goBoard() {
      const num = this.no;
      this.$router.push(`/boards/${num}`);
    },
    goRandom() {
      axios({
        url: `http://localhost:9999/api/boards/mbti/${this.type}`,
        method: "GET",
        params: "",
      }).then((res) => {
        const arr = res.data;
        const random = arr[Math.floor(Math.random() * arr.length)];
        this.$router.push(`/boards/${random}`);
      });
    },
    goMain() {
      this.$router.push("/");
    },
    noRouter() {
      alert(
        "서버 연결 후 해당 페이지로 이동하는 버튼입니다. \n현재 프론트만을 배포하여 버튼이 작동하지 않는 점 양해부탁드립니다."
      );
    },
    // goTest() {
    //   if (this.$route.name !== "testStart") {
    //     this.$router.push({ name: "testStart" });
    //   }
    // },
  },
};
</script>

<style scoped>
/* css import */
@import url("@/assets/css/root.css");

.container {
  display: flex;
  flex-direction: column;
  background-color: white;
  /* justify-content: center; */
  align-items: center;
  height: 100vh;
  overflow-y: auto;
}
.container::-webkit-scrollbar {
  display: none;
}

h2 {
  font-family: "RixYeoljeongdo_Regular";
  font-size: 2rem;
  font-weight: 500;
  padding: 2rem;
}

.res-title {
  background-color: var(--sportify-color-main);
  color: white;
  text-align: center;
  padding: 1rem;
  width: 80%;
  border-radius: 1.5rem;
}

.res-typesum {
  padding: 0rem 0rem 1rem 0rem;
  text-shadow: 2px 2px 4px var(--sportify-color-gray);
}

.res-typename {
  font-family: "RixYeoljeongdo_Regular";
  font-size: 2.5rem;
  font-weight: 500;
  text-shadow: 2px 2px 4px black;
}

.res-content {
  text-align: center;
  width: 80%;
  border-radius: 1.5rem;
  border: 5px solid rgba(59, 233, 219, 0.5);
}

.res-typedes {
  margin: 0px 20px 20px 20px;
  text-align: justify;
}

img {
  width: 40%;
  margin: 2rem 0rem 0rem 0rem;
}

.deco {
  display: flex;
  flex-direction: column;
  margin: 2rem;
}

.deco-tri {
  width: 20px;
  margin: 0px;
  transform: rotate(90deg);
}

.board-btn button {
  border: none;
  border-radius: 1.5rem;
  width: 10rem;
  height: 10rem;
  margin: 10px;
  box-shadow: 0px 1px 3px 1px var(--sportify-color-gray-light);
}
.board-btn {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.board-btn button:hover {
  background-color: var(--sportify-color-pink);
  color: white;
  font-weight: 700;
}
.board-btn-main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.board-btn button:hover .board-main-btn-name,
.board-btn button:hover .board-random-btn-name {
  -webkit-text-stroke: 1.5px var(--sportify-color-pink-light);
}

.board-main-btn-name,
.board-random-btn-name {
  /* font-family: "RixYeoljeongdo_Regular"; */
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  -webkit-text-stroke: 1.5px var(--sportify-color-gray);
}

.go-btn {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 80%;
}
.go-btn button {
  border: none;
  border-radius: 1.5rem;
  width: 5rem;
  height: 8rem;
  margin: 10px;
}
.go-btn button:hover {
  background-color: var(--sportify-color-main);
  color: white;
  font-weight: 700;
}

.logo {
  margin: 0px 0px 20px 0px;
}
</style>
