import axios from "axios";
import apiUrls from "@/api/apiUrls.js";

const axiosConfig = {
  getAxios(key, method, param, data) {
    let url = "";
    if (
      data !== undefined &&
      (key === "board_search" || key === "post_search")
    ) {
      url = apiUrls[key] + data;
    } else if (data !== undefined) {
      url = apiUrls[key] + "/" + data;
    } else {
      url = apiUrls[key];
    }
    return axios({
      url: url,
      method: method,
      params: param,
    });
  },
};

export default axiosConfig;
