import http from "../utils/http";
const authApi = {
  registerAccount: (userName, password) =>
    http.post("/login/register", userName, password),
  loginAccount: (userName, password) =>
    http.post("/login/login", userName, password),
};

export default authApi;
