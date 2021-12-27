<template>
  <div>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          <div class="row">
            <div class="col-sm-6"><h5>Product List</h5></div>
            <div class="col-sm-6" style="text-align:right;">
              <router-link class="btn btn-sm btn-primary" to="/products/create"><i class="fas fa-plus-square"></i> Create Product</router-link>
            </div>
          </div>
        </div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Qty</th>
                <th scope="col" class="text-center">Image</th>
                <th scope="col" class="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product, index) in products" :key="index">
                <td class="align-middle">{{index  + 1}}</td>
                <td class="align-middle">{{product.name}}</td>
                <td class="align-middle">{{product.description}}</td>
                <td class="align-middle">{{product.price}}</td>
                <td class="align-middle">{{product.qty}}</td>
                <td class="align-middle">
                  <img src="../assets/default-product.jpg" alt="Image" v-if="product.image == null" class="rounded mx-auto d-block">
                  <img :src="image_src+'/'+product.image" alt="Image" v-if="product.image != null" class="rounded mx-auto d-block">
                </td>
                <td class="align-middle text-center">
                  <router-link class="btn btn-warning btn-sm mr-5" :to="'/products/'+product.id+'/edit'">Edit</router-link>
                  <a href="javascript:void(0)" class="btn btn-danger btn-sm" @click="handleDelete(product.id)">Delete</a>
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

  export default{
    computed:{
    },

    data(){
      return {
        products: [],
        image_src: `${config.baseURL}/images/products`
      }
    },
    async created(){
      this.loadProducts();
    },
    methods:{
      async loadProducts(){
        const response = await axios.get(`${config.baseURL}/api/products`);
        this.products = response.data;
      },

      async  handleDelete(id){
        if(confirm("Do you really want to delete?")){
            await axios.delete(`${config.baseURL}/api/products/`+id);
            this.$toast.success("Deleted successfully");
            this.loadProducts();
        }
      }

      
    }
  }
</script>
<style scoped>
td img{
  width: 80px;
  height: 70px;
}
</style>