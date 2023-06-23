<template>
  <div class="container teststart">
    <p class="teststart-title">나에게 맞는 운동은 무엇일까?</p>
    <div class="teststart-content">
      <p>여러분에게 맞는 운동을 찾아드립니다.</p>
      <p>시작하시겠습니까?</p>
      <img
        src="@/assets/mbti/mbtiimg/ISFJ.png"
        alt=""
      /><br />
      <div class="teststart-content-btn">
        <router-link :to="{ name: 'questionPage' }">
          <button class="teststart-content-btn-start">
            테스트 하러가기
          </button></router-link
        >
        <button
          class="teststart-content-btn-main"
          @click="noRouter()"
        >
          Sportify 바로 가기
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestStart",
  computed() {
    this.$forceUpdate();
  },
  methods: {
    noRouter() {
      alert(
        "서버 연결 후 해당 페이지로 이동하는 버튼입니다. \n현재 프론트만을 배포하여 버튼이 작동하지 않는 점 양해부탁드립니다."
      );
    },
  },
};
</script>

<style scoped>
* {
  background-color: white;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.teststart-title {
  font-family: "RixYeoljeongdo_Regular";
  font-size: 2.5rem;
  font-weight: 500;
  padding: 2rem;
}

.teststart-content {
  width: 100%;
}

.teststart-content p {
  font-size: 1.2rem;
}

.teststart-content-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button {
  border: none;
  width: 20rem;
  height: 4rem;
  border-radius: 5rem;
  font-size: 1.5rem;
  margin: 1rem;
  font-weight: 600;
}
.teststart-content-btn-start {
  background-color: var(--sportify-color-pink-light);
}
.teststart-content-btn-start:hover {
  background-color: var(--sportify-color-pink);
  color: white;
  cursor: pointer;
}

.teststart-content-btn-main {
  background-color: var(--sportify-color-gray);
  color: white;
}

.teststart-content-btn-main:hover {
  background-color: black;
  color: white;
  cursor: pointer;
}

img {
  width: 40%;
}
</style>
