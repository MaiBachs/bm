import http from "../utils/http";

const customerApi = {
  getFindcmnd(cmnd) {
    return http.get(`${"/loan/find-by-cmnd?cmnd="}${cmnd}`);
  },
};
export default customerApi;
