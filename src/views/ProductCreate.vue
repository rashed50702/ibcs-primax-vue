<template>
  <div class="container mt-5">
    <div class="card">
    	<div class="card-header">
    		<div class="row">
    		  <div class="col-sm-6"><h5>Create Product</h5></div>
    		  <div class="col-sm-6" style="text-align:right;">
    		    <router-link class="btn btn-sm btn-primary" to="/products"><i class="fas fa-plus-square"></i> Product List</router-link>
    		  </div>
    		</div>
    	</div>
    	<div class="card-body">
    		<form @submit.prevent="handleSubmit" enctype="multipart/form-data" name="productForm">
    			<div class="form-group">
    			  <label for="productName">Product Name <span class="text-danger">*</span></label>
    			  <input type="text" class="form-control" v-model="name" >
    			</div>
    			<div class="form-group">
    			  <label for="productDescription">Description</label>
    			  <textarea class="form-control" v-model="description"></textarea>
    			</div>
    			<div class="form-group">
    			  <label for="productPrice">Price <span class="text-danger">*</span></label>
    			  <input type="text" class="form-control" v-model="price">
    			</div>
    			<div class="form-group">
    			  <label for="productQty">Quantity <span class="text-danger">*</span></label>
    			  <input type="text" class="form-control" v-model="qty">
    			</div>
    			<div class="form-group">
    			  <label for="productImage">Image</label>
    			  <input type="file" class="form-control" @change="selectFile">
    			</div>
    			<div class="form-group text-right mt-5">
    				<button type="submit" class="btn btn-success btn-sm"><i class="fas fa-check-square"></i> Save Product</button>
    			</div>
    		</form>
    	</div>
    </div>
  </div>
</template>

<script>
	import axios from 'axios'
	import config from './config'

	export default{
		name: 'ProductCreate',
        computed:{
        },
		data(){
			return{
				name: '',
				description: '',
				price: '',
				qty: '',
				image: null,
        errors: null
			}
		},
        
		methods: {

			selectFile(event) {
				this.image = event.target.files[0];
			},

			async handleSubmit(){
				const data = new FormData();
				data.append('name', this.name);
				data.append('description', this.description);
				data.append('price', this.price);
				data.append('qty', this.qty);
				data.append('image', this.image);

      	await axios.post(`${config.baseURL}/api/products`, data)
      		.then(response => {
      			this.$toast.success(response.data.message);
        		this.name = "";
        		this.description = "";
        		this.price = "";
        		this.qty = "";
        		this.image = "";
      		}).catch(error => {
        		// console.log(error.response.data.message);
        		this.$toast.error(error.response.data.message);
        	});
			}
		}
	}
</script>