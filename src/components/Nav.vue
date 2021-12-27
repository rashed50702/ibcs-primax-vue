<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container">
      <div class="navbar-header">
        <router-link class="navbar-brand" to="/">IBCS-PRIMAX</router-link>
      </div>
      <ul class="nav navbar-nav">
        <router-link
          class="nav-item nav-link"
          v-if="!isLoggedIn"
          :to="{ name: 'Products' }"
        >
          Products
        </router-link>

        <router-link
          class="nav-item nav-link"
          v-if="!isLoggedIn"
          :to="{ name: 'Orders' }"
        >
          Orders <span class="badge badge-success" v-if="newOrderNum > 0">{{newOrderNum}}</span>
        </router-link>

        <router-link
          class="nav-item nav-link"
          v-if="!isLoggedIn"
          :to="{ name: 'OrderDeliveries' }"
        >
          Order Deliveries
        </router-link>

        <router-link
          class="nav-item nav-link"
          v-if="!isLoggedIn"
          :to="{ name: 'Login' }"
        >
          Login
        </router-link>
        <router-link
          class="nav-item nav-link"
          v-if="!isLoggedIn"
          :to="{ name: 'SignUp' }"
        >
          SignUp
        </router-link>
        <router-link
          class="nav-item nav-link"
          v-if="isLoggedIn"
          :to="{ name: 'Dashboard' }"
        >
          Dashboard
        </router-link>

        <a class="nav-item nav-link" href="#" v-if="isLoggedIn" @click.prevent="logout">Logout</a>
      </ul>
    </div>
  </nav>
</template>

<script>
import User from "../apis/User";

export default {
  data() {
    return {
      isLoggedIn: false,
      newOrderNum: 0,
    };
  },

  mounted() {
    this.$root.$on("login", () => {
      this.isLoggedIn = true;
    });

    this.isLoggedIn = !!localStorage.getItem("token");
    // console.log("Ok");
    this.newOrdersCount();
  },

  methods: {
    logout() {
      User.logout().then(() => {
        localStorage.removeItem("token");
        this.isLoggedIn = false;
        this.$router.push({ name: "Home" });
      });
    },
    async newOrdersCount(){
      await User.newOrdersCounter().then(response => {
        this.newOrderNum = response.data;
        // console.log(response.data);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .router-link-exact-active {
    color: #ffffff !important;
    transition: all 0.25s;
  }
</style>
