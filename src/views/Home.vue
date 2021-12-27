<template>
  <div class="home">
    <div>
      <div class="container">
        <div class="card mt-5">
          <div class="card-header">
            <div class="row">
              <div class="col-sm-6"><h5>Featured Products</h5></div>
              <div class="col-sm-6" style="text-align:right;">
                <b-button v-b-modal.modal-1>{{totalItems}} Cart</b-button>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-sm-4">
                
                <div class="form-group row">
                  <label class="col-sm-5 col-form-label">Search By Name</label>
                  <div class="col-sm-7">
                    <input type="text" v-model ="search" class="form-control">
                  </div>
                </div>
              </div>
              <div class="col-sm-4 offset-sm-4">
                <div class="form-group row">
                  <label class="col-sm-5 col-form-label">Sort By Price</label>
                  <div class="col-sm-7">
                    <div class="form-group">
                        <select class="form-control" v-model="sortBy">
                          <option value="highestprice" selected>Highest Price</option>
                          <option value="lowestprice">Lowest Price</option>
                        </select>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            <hr>
            <div class="row">
              <div class="col-sm-3 mb-5" v-for="(product, index) in filteredProducts" :key="index">
                <div class="card">
                  <div class="image-container">
                    <img src="../assets/default-product.jpg" class="img-fluid rounded thumbnail-image" v-if="product.image == null">
                    <img :src="image_src+'/'+product.image" class="img-fluid rounded thumbnail-image" v-if="product.image != null">
                  </div>
                  <div class="product-detail-container p-2">
                    <div class="d-flex justify-content-between">
                      <h5 class="item-name">{{ product.name }}</h5>
                      <div class="d-flex flex-column mb-2"> <span class="new-price">${{ product.price }}</span></div>
                    </div>
                    <div class="d-flex justify-content-between pt-1">
                      <p>{{ product.description }}</p>
                    </div>
                    <button class="btn btn-success btn-sm" style="width:100%;" v-if="product.qty > 0" @click="addToCart(product)">Add To Cart</button>
                    <button class="btn btn-secondery btn-sm" style="width:100%;" v-else>Out Of Stock</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- card body end -->
        </div>
        <!-- card end -->
      </div><!--container end-->

      <b-modal id="modal-1" title="Your Cart"
      @ok.prevent="submitOrder"
      >
        <table class="table">
          <tr v-for="(cartproduct, index) in productsInCart" :key="index">
            <td class="align-middle">{{index + 1}}</td>
            <td class="align-middle">{{cartproduct.pname}}</td>
            <td class="align-middle">{{cartproduct.pqty}}</td>
            <td class="align-middle">{{cartproduct.pprice}}</td>
            <td class="text-danger"><button type="button" aria-label="Close" class="close text-danger" @click="removeItem(index)">×</button></td>
          </tr>
          <tr v-show="productsInCart.length === 0">
            <td class="align-middle">Cart is empty!</td>
          </tr>
          <tr v-show="productsInCart.length > 0">
            <td class="align-middle text-right" colspan="3">Total = </td>
            <td class="align-middle">{{total}}</td>
          </tr>
        </table>
      </b-modal>

    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { BootstrapVue } from 'bootstrap-vue'
  import axios from 'axios'
  import BaseApi from '../apis/Api'
  import config from './config'

  Vue.use(BootstrapVue)

  export default {
    name: 'Home',
    computed:{
      filteredProducts(){
        return this.products.filter((prod) =>{
          return prod.name.toLowerCase().match(this.search.toLowerCase())
        }).sort((a, b) =>{
          if (this.sortBy =='highestprice'){
            return b.price-a.price;
          }else if (this.sortBy =='lowestprice'){
            return a.price-b.price;
          }
        });
      },
      
      total() {
        let total = 0;
        this.productsInCart.forEach(item => {
          total += (item.pprice * item.pqty);
        });
        return total;
      },

      totalItems(){
        return this.productsInCart.reduce((accumulator , item) => {
          return accumulator  + item.pqty;
        }, 0);
      }
    },

    data(){
      return {
        products: [],
        image_src: `${config.baseURL}/images/products`,
        search: '',
        sortBy: 'highestprice',
        productsInCart: [],
        pid: '',
        pname: '',
        pqty: 1,
        pprice: '',
      }
    },
    async created(){
      this.loadProducts();
    },
    methods:{
      async loadProducts(){
        const response = await axios.get(`${config.baseURL}/api/products-for-sale`);
        this.products = response.data;
      },

      addToCart(pro){
        // Add the item or increase qty
        let itemInCart = this.productsInCart.filter(item => item.pid===pro.id);
        let isItemInCart = itemInCart.length > 0;

        if (isItemInCart === false) {
          this.productsInCart.push({pid: pro.id,pname: pro.name, pqty: 1, pprice: pro.price});
        } else {
          itemInCart[0].pqty += pro.qty;
        }
              
        pro.qty = 1;
      },

      // Remove item by its index
      removeItem(index) {
        this.productsInCart.splice(index, 1)
      },

      async submitOrder(){
        let data = {
                    customer_id: 1,
                    cart_items: this.productsInCart,
                  }
                  
        await axios.post('orders', data)
        .then(response => {
          // console.log(response.data.message);
            this.$toast.success(response.data.message);
            this.productsInCart = [];
        })
        .catch(error => {
            // console.log(error.response.data.message);
            this.$toast.error(error.response.data.message);

        });
      }

    }      
  }
</script>
<style scoped>
  body {
      background-color: #eee
  }

  .card {
      background-color: #fff;
      border: none;
      border-radius: 10px;
      box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
  }

  .image-container {
      position: relative
  }

  .thumbnail-image {
    max-height: 300px;
  }

 
  .item-name {
      font-size: 15px;
      font-weight: bold;
      width: 75%
  }
</style>