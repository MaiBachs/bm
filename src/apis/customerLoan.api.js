import http from "../utils/http";

const customerApi = {
  getFindcmnd(cmnd) {
    return http.get(`${"/loan/find-by-cmnd?cmnd="}${cmnd}`);
  },
  loanRepaid: (data) => http.post("/loan/customer-repaid", data),
  loanCustomer: (data) => http.post("/loan/customer-loan", data),
  getLoanFind() {
    return http.get("/loan/find-all-interest");
  },
};
export default customerApi;
