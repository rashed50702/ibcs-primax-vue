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
import AccessDenied from "../views/AccessDenied.vue"
import AccessTwoDenied from "../views/AccessTwoDenied.vue"

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
    path: "/access-denied",
    name: "AccessDenied",
    component: AccessDenied,
    meta: { authOnly: true }
  },
  {
    path: "/access-two-denied",
    name: "AccessTwoDenied",
    component: AccessTwoDenied,
    meta: { authOnly: true }
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
    meta: { authOnly: true, is_admin: 1}
  },
  {
    path: "/products",
    name: "Products",
    component: Products,
    meta: { authOnly: true}
  },
  {
    path: '/products/create',
    name: 'ProductCreate',
    component: ProductCreate,
    meta: { authOnly: true}
  },
  {
    path: '/products/:id/edit',
    name: 'ProductEdit',
    component: ProductEdit,
    meta: { authOnly: true}
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders,
    meta: { authOnly: true}
  },
  {
    path: '/delivered-orders',
    name: 'OrderDeliveries',
    component: OrderDeliveries,
    meta: { authOnly: true}
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

// let is_admin = JSON.parse(localStorage.getItem('is_admin'))
// Meta Handling
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.authOnly)) {
//     if (localStorage.getItem('token') == null) {
//       next({
//         path: '/login',
//         params: { nextUrl: to.fullPath }
//       })
//     } else {
//       let is_admin = JSON.parse(localStorage.getItem('is_admin'))
//       // console.log(is_admin);
//       if (to.matched.some(record => record.meta.is_admin)) {
//         if (is_admin == 1) {
//           next()
//         } else {
//           next({
//             path: "/access-denied",
//             params: { nextUrl: to.fullPath }
//           })
//         }

//       } else {
//         next()
//       }
//     }
//   } else if (to.matched.some(record => record.meta.guestOnly)) {
//     if (localStorage.getItem('token') == null) {
//       next()
//     } else {
//       next({ name: 'userboard2' })
//     }
//   } else {
//     next()
//   }
// })

export default router
