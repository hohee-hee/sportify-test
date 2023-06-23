const REST_API = "http://localhost:9999/api";
const API_boards = REST_API + "/boards";
const API_posts = REST_API + "/posts";
const API_users = REST_API + "/users";
const API_comments = REST_API + "/comments";

const apiUrls = {
  // 게시글
  post: API_posts,
  post_all: API_posts + "/all",
  post_list: API_posts + "/board",
  post_bookmark: API_posts + "/bookmark",
  post_like: API_posts + "/like",
  post_pop: API_posts + "/popular/5",
  post_search: API_posts + "/search?q=",

  // 덧글
  comment: API_comments,
  comment_list: API_comments + "/post",

  // 게시판
  boarddetail: API_boards,
  boardlist_all: API_boards + "/all",
  boardlist_favorite: API_boards + "/favorite",
  boadlist_mbti: API_boards + "/mbti",
  board_search: API_boards + "/search?q=",

  // 유저
  user: API_users,
  user_login: API_users + "/login",
  user_logout: API_users + "/logout",
  user_signup: API_users + "/signup",
};

export default apiUrls;
