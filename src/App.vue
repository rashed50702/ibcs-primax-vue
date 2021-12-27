<template>
  <div id="app">
    <Nav/>
    <router-view/>
  </div>
</template>


<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'
// @ is an alias to /src
import Nav from '@/components/Nav.vue'

export default {
  components: {
    Nav
  }
}
</script>