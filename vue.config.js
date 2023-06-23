const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  outputDir: "./docs",
  publicPath: "/sportify-test/",
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:9999",
        changeOrigin: true,
      },
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
  },
});
