<template>
  <div class="container">
    <div class="card mt-5" v-if="user && user.is_admin == 1">
      <div class="card-header"><h4>Admin Dashboard</h4></div>
      <div class="card-body">
        <h5>Hello, {{ user.name }}</h5>
        <span>{{ user.email }}</span>
      </div>
    </div>

    <div class="card mt-5" v-if="user && user.is_admin == 0">
      <div class="card-header"><h4>Dashboard</h4></div>
      <div class="card-body">
        <div class="row">
          <div class="col-sm-4">
            <div>
              <h5 id="hello">Hello, {{ user.name }}</h5>
              <span>{{ user.email }}</span>
            </div>
            <hr>
            <div>
              <form>
                <div class="form-group">
                  <label for="address">Address</label>
                  <textarea class="form-control" placeholder="Your address to deliver the products"></textarea>
                </div>
                <div class="form-group">
                  <label for="">Phone</label>
                  <input type="text" class="form-control" placeholder="+880XXXXXXXXXX">
                </div>
                <button type="button" class="btn btn-primary mt-5">Save</button>
              </form>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="card">
              <div class="card-header"><h6>My Orders</h6></div>
              <div class="card-body">
                <table class="table table-sm">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Order ID</th>
                      <th scope="col">Order Date</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(order, index) in my_orders" :key="index">
                      <td class="align-middle">{{index  + 1}}</td>
                      <td class="align-middle">{{order.id}}</td>
                      <td class="align-middle">{{order.order_date | moment}}</td>
                      <td class="align-middle">
                        <span v-if="order.status == 0" class="text-primary">Pending</span>
                        <span v-if="order.status == 1" class="text-success">Delivered</span>
                        <span v-if="order.status == 2" class="text-danger">Cancelled</span>
                      </td>
                      <td class="align-middle text-center">
                        <a href="javascript:void(0)" class="btn btn-warning btn-sm mr-5"
                          @click="showModal(order.id)"
                          >Show Details</a>
                        <a href="javascript:void(0)" class="btn btn-danger btn-sm mt-1"
                          v-if="order.status !=1"
                          >Edit</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> <!--End card-->

    <b-modal
      v-model="show"
      ref="modal"
      title="Order Details">

      <table class="table">
        <tbody>
          <tr>
            <th>#</th>
            <th>Product</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
          <tr v-for="(prod, index) in my_products" :key="index">
            <td class="align-middle">{{index  + 1}}</td>
            <td class="align-middle">{{prod.product.name}}</td>
            <td class="align-middle">{{prod.quantity}}</td>
            <td class="align-middle">{{prod.price}}</td>
          </tr>
        </tbody>
      </table>
    </b-modal>
  </div>
</template>

<script>
import User from "../apis/User"
import axios from 'axios'
import config from '@/config'
import moment from 'moment'

export default {
  filters: {
    moment: function (date) {
      return moment(date).format('ddd,Do MMM YY h:mm:ss a');
    }
  },

  data() {
    return {
      user: null,
      my_orders:[],
      show: false,
      my_products: [],
    };
  },

  mounted() {
    User.auth().then(response => {
      this.user = response.data;
      this.myOrders(this.user.id);
    });
  },

  methods: {
    async myOrders(id){
      const response = await axios.get(`${config.apiURL}/api/my-orders/`+id);
      this.my_orders = response.data;
    },
    async showModal(orderid){
      this.show = true;
      const response =  await axios.get(`${config.apiURL}/api/order-details/`+orderid);
      this.my_products = response.data;
    },
  }
};
</script>