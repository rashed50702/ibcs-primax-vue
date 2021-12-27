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
          <table class="table table-striped">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">OrderID</th>
                  <th scope="col">Order Date</th>
                  <th scope="col">Delivery Date</th>
                  <th scope="col" class="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(od, index) in filteredOrderDeliveries" :key="index">
                  <td class="align-middle">{{index  + 1}}</td>
                  <td class="align-middle">{{od.order_id}}</td>
                  <td class="align-middle">{{od.order.order_date | moment}}</td>
                  <td class="align-middle">{{od.created_at | moment}}</td>
                  
                  <td class="align-middle text-center">
                    
                  </td>
                </tr>
              </tbody>
          </table>
        </div>
        <!-- card body end -->
      </div>
      <!-- card end -->
    </div><!--container end-->
  </div>
</template>

<script>
  import axios from 'axios'
  import config from './config'
  import moment from 'moment'


  export default{
    name: 'Orders',
    computed:{
      filteredOrderDeliveries(){
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
        search: ''
      }
    },
    async created(){
      this.loadOrderDeliveries();
    },
    methods:{
      async loadOrderDeliveries(){
        const response = await axios.get(`${config.baseURL}/api/order-deliveries`);
        this.orders = response.data;
      },

      async handleDelete(id){
          if(confirm("Do you really want to delete?")){
            await axios.delete(`${config.baseURL}/api/order-deliveries/`+id);
              this.$toast.success("Deleted successfully");
              this.loadOrderDeliveries();
          }
      }
    }
  }
</script>