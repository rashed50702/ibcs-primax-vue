<template>
  <div>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-sm-6"><h5>Order List</h5></div>
            <div class="col-sm-6" style="text-align:right;">
              <div class="form-group row">
                <label class="col-sm-5 col-form-label">Search By Order ID</label>
                <div class="col-sm-7">
                  <input type="text" v-model ="search" class="form-control">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">OrderID</th>
                <th scope="col">Customer</th>
                <th scope="col">Order Date</th>
                <th scope="col">Status</th>
                <th scope="col" class="text-center">Action</th>
                      </tr>
                    </thead>
            <tbody>
              <tr v-for="(order, index) in filteredOrders" :key="index">
                <td class="align-middle">{{index  + 1}}</td>
                <td class="align-middle">{{order.id}}</td>
                <td class="align-middle">{{order.customer.name}}</td>
                <td class="align-middle">{{order.order_date | moment}}</td>
                <td class="align-middle">
                  <span v-if="order.status == 0" class="text-primary">Pending</span>
                  <span v-if="order.status == 1" class="text-success">Delivered</span>
                  <span v-if="order.status == 2" class="text-danger">Cancelled</span>
                </td>
                <td class="align-middle text-center">
                  <a href="javascript:void(0)" class="btn btn-warning btn-sm mr-5" @click="showModal(order.id, order.status)">Edit</a>
                  <a href="javascript:void(0)" class="btn btn-danger btn-sm" @click="handleDelete(order.id)">Delete</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- card body end -->
      </div>
      <!-- card end -->
    </div><!--container end-->


    <b-modal
      v-model="show"
      ref="modal"
      title="Edit Order"
      @ok.prevent="changeOrderStatus">

      <div class="form-check">
        <input class="form-check-input" type="radio" value="0" v-model.number="editStatus">
        <label class="form-check-label">Pending</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" value="1" v-model.number="editStatus">
        <label class="form-check-label">Delivered</label>
      </div>
      <div class="form-check disabled">
        <input class="form-check-input" type="radio" value="2" v-model.number="editStatus">
        <label class="form-check-label">Canceled</label>
      </div>
    </b-modal>
  </div>
</template>

<script>
  import axios from 'axios'
  import config from './config'
  import moment from 'moment'


  export default{
    name: 'Orders',
    computed:{
      filteredOrders(){
        return this.orders.filter((ord) =>{
          return String(ord.id).match(this.search)
        });
      },
    },

    filters: {
      moment: function (date) {
        return moment(date).format('ddd,Do MMM YY h:mm:ss a');
      }
    },

    data(){
      return {
        orders: [],
        show: false,
        editStatusOrderId:'',
        editStatus:'',
        search: ''
      }
    },
    async created(){
      this.loadOrders();
    },
    methods:{
      async loadOrders(){
        const response = await axios.get(`${config.baseURL}/api/orders`);
        this.orders = response.data;
      },


      showModal(id, status){
        this.show = true;
        this.editStatus = status;
        this.editStatusOrderId = id;
      },


      async changeOrderStatus(){
        let data = {
          order_id: this.editStatusOrderId,
          new_status: this.editStatus,
        }

        await axios.post(`${config.baseURL}/api/change-order-status`, data)
        .then(response => {
          this.$toast.success(response.data.message);
          this.show = false;
          this.loadOrders();
        })
        .catch(error => {
          this.$toast.error(error.response.data.message);
        });
      },

        async handleDelete(id){
          if(confirm("Do you really want to delete?")){
            await axios.delete(`${config.baseURL}/api/orders/`+id);
              this.$toast.success("Deleted successfully");
              this.loadOrders();
          }
        }
    }
  }
</script>