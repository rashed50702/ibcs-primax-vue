import Api from "./Api";

export default {
  signup(form) {
    return Api().post("/signup", form);
  },

  login(form) {
    return Api().post("/login", form);
  },

  logout() {
    return Api().post("/logout");
  },

  newOrdersCounter() {
    return Api().get("/new-orders-count");
  },

  auth() {
    return Api().get("/user");
  }
};