<template>
  <div class="container mt-5">
    <div class="card">
    	<div class="card-header">
    		<div class="row">
    		  <div class="col-sm-6"><h5>Edit Product</h5></div>
    		  <div class="col-sm-6" style="text-align:right;">
    		    <router-link class="btn btn-sm btn-primary" to="/products/create"><i class="fas fa-plus-square"></i> Product Create</router-link>
    		  </div>
    		</div>
    	</div>
    	<div class="card-body">
    		<form @submit.prevent="handleSubmit" enctype="multipart/form-data" name="productForm">
    			<div class="form-group">
    			  <label for="productName">Product Name <span class="text-danger">*</span></label>
    			  <input type="text" class="form-control" v-model="product.name" >
    			</div>
    			<div class="form-group">
    			  <label for="productDescription">Description</label>
    			  <textarea class="form-control" v-model="product.description"></textarea>
    			</div>
    			<div class="form-group">
    			  <label for="productPrice">Price <span class="text-danger">*</span></label>
    			  <input type="text" class="form-control" v-model="product.price">
    			</div>
    			<div class="form-group">
    			  <label for="productQty">Quantity <span class="text-danger">*</span></label>
    			  <input type="text" class="form-control" v-model="product.qty">
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
	import config from '@/config'

	export default{
		data(){
			return{
				id: this.$route.params.id,
				product: {},
				name: '',
				description: '',
				price: '',
				qty: '',
				image: null,
        errors: null
			}
		},
		async created(){
		    const response = await axios.get(`${config.apiURL}/api/products/` + this.id);
		    this.product = response.data;
		},
		methods: {
			selectFile(event) {
				this.image = event.target.files[0];
			},

			async handleSubmit(){

				const data = new FormData();
				data.append('name', this.product.name);
				data.append('description', this.product.description);
				data.append('price', this.product.price);
				data.append('qty', this.product.qty);
				data.append('image', this.image);
				data.append('_method', 'PUT');

			  await axios.post(`${config.apiURL}/api/products/` + this.id, data)
			  	.then(response => {
			  		this.$toast.success(response.data.message);
			    }).catch(error => {
			    	// console.log(error.response.data.message);
			      this.$toast.error(error.response.data.message);
			    });
			}

		}
	}
</script>