import http from "../utils/http";

const cardApi = {
  getCardList(params) {
    return http.post("/credit-card/get-card-by-page", {
      params,
    });
  },
  getCardLockDetail(id) {
    return http.get(`${"/credit-card/lock-card"}/${id}`);
  },
  getCardUnLockDetail(id) {
    return http.get(`${"/credit-card/unlock-card"}/${id}`);
  },
};
export default cardApi;
