<template>
  <div class="container">
    <div class="name">
      <br /><br />
      <p>나와 어울리는 운동 찾기</p>
    </div>
    <div class="bararea">
      <p id="myBar-num">1 / 12</p>
      <div
        id="myProgress"
        class="progressbar"
      >
        <div id="myBar"></div>
      </div>
      <br />
      <p>질문영역</p>
    </div>
    <div class="questionarea">
      <div
        v-for="(item, index) in qlist"
        :key="index"
        :class="'question no-' + index"
      >
        <!-- <p class="question-num">{{ item.questionNo }}</p> -->
        <p class="question-question">{{ item.question }}</p>

        <div
          class="questionarea-answer"
          id="answer"
        >
          <button
            class="questionarea-answer-btn"
            @click="choose(0, $event)"
          >
            {{ item.answer[0] }}
          </button>
          <button
            class="questionarea-answer-btn"
            @click="choose(1, $event)"
          >
            {{ item.answer[1] }}
          </button>
        </div>
        <br />
        <div
          class="questionbtn"
          :class="{
            btnloc: currno !== 1,
            'btnloc-first': currno === 1,
          }"
        >
          <!-- <div v-show="currno === 1"></div> -->
          <button
            @click="goPrev"
            v-show="currno !== 1"
          >
            이전
          </button>
          <button
            @click="goNext"
            v-show="currno < 12"
          >
            다음
          </button>
          <button
            class="questionbtn-result"
            @click="goResult"
            v-show="currno === 12 && isResultVisible"
          >
            결과보기
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//문제 리스트 import
import qlist from "@/assets/mbti/testdata/mbtitestquestions.json";

export default {
  name: "QuestionPage",

  data() {
    return {
      answerlist: [], // 선택한 번호 리스트
      qlist: [], // 문제 리스트
      currno: "", // 현재 번호
      width: 0, // bar에 사용할 width
      isResultVisible: false,
    };
  },

  created() {
    // 문제 리스트 갖고 오기
    this.qlist = qlist;

    // 문제 번호 지정하기
    this.currno = 1;
  },

  methods: {
    // 선택했을 때 선택한 번호를 저장하기

    choose(num, event) {
      event;
      this.answerlist[this.currno - 1] = num;

      // 마지막 문항이 아니면 다음으로 자동로 넘어가기
      if (this.currno !== 12) this.goNext();
      // 마지막 문항이면 색만 변경해주기
      else {
        this.removechecked(this.currno - 1);
        this.addchecked(this.currno - 1);
        this.isResultVisible = true;
      }
    },

    // 다음으로 넘어가는 이벤트
    goNext() {
      // 답안선택이 되지 않았는데 다음 버튼을 누르면 알림창을 띄우기
      if (this.answerlist.length < this.currno) {
        alert("답안을 선택해주세요!");
      }

      // 선택이 되었다면 다음으로 넘어가기
      else {
        this.addlslide();
        this.currno++;
        this.move();
        this.removechecked(this.currno - 1);
        this.addchecked(this.currno - 1);
      }
    },

    //이전 문항으로 넘어가는 이벤트
    goPrev() {
      this.addrslide();
      this.currno--;
      this.move();
      this.removechecked(this.currno - 1);
      this.addchecked(this.currno - 1);
    },

    //결과보기
    goResult() {
      this.$router.push({
        name: "testResult",
        params: { answerlist: this.answerlist },
      });
    },

    addchecked(index) {
      let chosen = this.answerlist[this.currno - 1];
      const question = document.querySelectorAll(".question")[index];
      const buttons = question.querySelectorAll(".questionarea-answer-btn");

      buttons.forEach((button, buttonIndex) => {
        if (buttonIndex === chosen) {
          button.classList.add("checked");
        }
      });
    },

    // 문항이 넘어갔을 때 checked를 지우기
    removechecked(index) {
      const question = document.querySelectorAll(".question")[index];

      const buttons = question.querySelectorAll(".questionarea-answer-btn");

      buttons.forEach((button) => button.classList.remove("checked"));
    },

    // 진행바 움직이기
    move() {
      var bar = document.getElementById("myBar");
      this.width = (100 / 12) * this.currno;
      bar.style.width = this.width + "%";
      var num = document.getElementById("myBar-num");
      num.innerHTML = this.currno + " / 12";
    },

    // 슬라이딩 시키기
    addlslide() {
      const questions = document.querySelectorAll(".question");
      const currwidth = document.querySelector(".questionarea").clientWidth;
      questions.forEach((question) => {
        question.style.transform = `translateX(-${currwidth * this.currno}px)`;
      });
    },

    addrslide() {
      const questions = document.querySelectorAll(".question");
      const currwidth = document.querySelector(".questionarea").clientWidth;
      questions.forEach((question) => {
        question.style.transform = `translateX(-${
          currwidth * (this.currno - 2)
        }px)`;
      });
    },
  },
};
</script>

<style scoped>
/* css import */
@import url("@/assets/css/root.css");
* {
  background-color: white;
  font-family: "Noto Sans KR", sans-serif;
  font-size: 0.8rem;
}

.name {
  text-align: center;
  padding: 3px;
}

.name p {
  margin: 5px;
  font-family: "RixYeoljeongdo_Regular";
  font-size: 1.3rem;
}
.bararea {
  padding: 1rem 3rem 0rem 3rem;
  text-align: center;
}

#myProgress {
  width: 80%;
  background-color: var(--sportify-color-gray-light);
  margin: 0 auto;
  border-radius: 5rem;
}

#myBar {
  width: 8.33%;
  height: 10px;
  background-color: var(--sportify-color-pink);
  /* background-color: var(--sportify-color-main); */
  transition: 0.5s ease-out;
  border-radius: 5rem;
}

#myBar-num {
  padding: 0rem 0rem 1.5rem 0rem;
  font-size: 1.3rem;
  /* font-weight: 500; */
}
.questionarea {
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  position: relative;
  /* width: 30rem; */
  margin: 0 auto;
  padding: 0rem 0rem 3rem 0rem;
}

.question {
  float: left;
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  width: 100%;
  flex-shrink: 0;
  transition: 0.5s ease-out;
}

.question-num {
  font-size: 1.3rem;
  /* font-weight: 500; */
}

.question-question {
  height: 12rem;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 3rem;
  letter-spacing: -1.5px;
  margin: 3rem;
}

.questionarea-answer button {
  border: none;
  width: 25rem;
  height: 5rem;
  border-radius: 1rem;
  font-size: 1rem;
  margin: 1rem;
  padding: 1rem;
  font-weight: 600;
}
.questionarea-answer-btn {
  background-color: var(--sportify-color-gray-light);
}

.questionarea-answer-btn:hover {
  background-color: var(--sportify-color-pink-light);
  cursor: pointer;
  border: none;
}

.questionarea-answer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
}

/* 선택한 요소에 대한 색상 변경 */
.checked {
  background-color: var(--sportify-color-main-light);
  border: none;
}
.btnloc {
  width: 25rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.btnloc-first {
  width: 25rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.questionbtn button {
  /* 텍스트 정렬 */
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  /* 모양 설정 */
  background-color: var(--sportify-color-gray);
  color: white;
  font-weight: 500;
  border: none;
  width: 6rem;
  height: 2.5rem;
  border-radius: 2rem;
  font-size: 1.2rem;
}

.questionbtn button:hover {
  background-color: var(--sportify-color-main);
  color: black;
}

.questionbtn-result {
  font-size: 1rem !important;
}
</style>
