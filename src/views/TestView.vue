<template>
  <div class="forcolor">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "TestView",
};
</script>

<style scoped>
html {
  background-color: var(--sportify-color-main-light);
}

.forcolor {
  background-color: var(--sportify-color-main-light);
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  height: 100vh;
  background-color: white;
}
</style>
