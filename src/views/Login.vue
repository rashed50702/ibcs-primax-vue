<template>
  <div class="home col-5 mx-auto py-5 mt-5 border border-secondary">
    <h1 class="text-center">Login</h1>
    <div class="card">
      <div class="card-body">
        <div class="form-group">
          <label for="email">Email address:</label>
          <input
            type="email"
            v-model="form.email"
            class="form-control"
            id="email"
          />
          <span class="text-danger" v-if="errors.email">{{ errors.email[0] }}</span>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            v-model="form.password"
            class="form-control"
            id="password"
          />
          <span class="text-danger" v-if="errors.password">{{ errors.password[0] }}</span>
        </div>

        <div class="form-group mt-3" style="text-align: right;">
          <button class="btn btn-success btn-sm"  @click.prevent="login">Login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";

export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
        device_name: "browser"
      },
      errors: []
    };
  },

  methods: {
    login() {
      User.login(this.form)
        .then(response => {
          this.$root.$emit("login", true);
          // localStorage.setItem("token", response.data);
          localStorage.setItem("token", response.data.textToken);
          localStorage.setItem('is_admin',JSON.stringify(response.data.is_admin))
          if (response.data.is_admin == 1) {
            this.$router.push({ name: "Dashboard" });
          }else{
            this.$router.push({ name: "BuyerDashboard" });
          }
          // this.$router.push({ name: "Dashboard" });
          // console.log(response.data);
        })
        .catch(error => {
          if (error.response.status === 422) {
            this.errors = error.response.data.errors;
          }
        });
    }
  }
};
</script>