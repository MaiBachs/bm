import http from "../utils/http";

const cardApi = {
  getCardList: (data) => http.post("/credit-card/get-card-by-page", data),

  getCardLockDetail(id) {
    return http.get(`${"/credit-card/lock-card?id="}${id}`);
  },
  getCardUnLockDetail(id) {
    return http.get(`${"/credit-card/unlock-card?id="}${id}`);
  },
};
export default cardApi;
