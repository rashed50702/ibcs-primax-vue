import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login.vue"
import SignUp from "../views/SignUp.vue"
import Dashboard from "../views/Dashboard.vue"
import Products from "../views/Products.vue"
import ProductCreate from "../views/ProductCreate.vue"
import ProductEdit from "../views/ProductEdit.vue"
import Orders from "../views/Orders.vue"
import OrderDeliveries from "../views/OrderDeliveries.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guestOnly: true }
  },
  {
    path: "/sign-up",
    name: "SignUp",
    component: SignUp,
    meta: { guestOnly: true }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: { authOnly: true }
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
    meta: { guestOnly: true }
  },
  {
    path: '/products/create',
    name: 'ProductCreate',
    component: ProductCreate,
    meta: { guestOnly: true }
  },
  {
    path: '/products/:id/edit',
    name: 'ProductEdit',
    component: ProductEdit,
    meta: { guestOnly: true }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: { guestOnly: true }
  },
  {
    path: '/delivered-orders',
    name: 'OrderDeliveries',
    component: OrderDeliveries,
    meta: { guestOnly: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

function isLoggedIn() {
  return localStorage.getItem("token");
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!isLoggedIn()) {
      next({
        path: "/login",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guestOnly)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (isLoggedIn()) {
      next({
        path: "/dashboard",
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router
