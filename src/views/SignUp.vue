<template>
  <div class="home col-5 mx-auto py-5 mt-5 border border-secondary">
    <h1 class="text-center">Sign Up</h1>
    <div class="card">
      <div class="card-body">
        <div class="form-group">
          <label for="name">Name:</label>
          <input
            type="text"
            class="form-control"
            v-model="form.name"
            id="name"
          />
          <span class="text-danger" v-if="errors.name">{{ errors.name[0] }}</span>
        </div>
        <div class="form-group">
          <label for="email">Email address:</label>
          <input
            type="email"
            class="form-control"
            v-model="form.email"
            id="email"
          />
          <span class="text-danger" v-if="errors.email">{{ errors.email[0] }}</span>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input
            type="password"
            class="form-control"
            v-model="form.password"
            id="password"
          />
          <span class="text-danger" v-if="errors.password">{{ errors.password[0] }}</span>
        </div>
        <div class="form-group">
          <label for="password_confirmation">Confirm Password:</label>
          <input
            type="password"
            class="form-control"
            v-model="form.password_confirmation"
            id="password_confirmation"
          />
          <span class="text-danger" v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</span>
        </div>
        <div class="form-group mt-3" style="text-align: right;">
          <button type="submit" class="btn btn-success btn-sm" @click.prevent="signup">Sign Up</button>
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
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
      },
      errors: []
    };
  },

  methods: {
    signup() {
      User.signup(this.form)
        .then(() => {
          this.$router.push({ name: "Login" });
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