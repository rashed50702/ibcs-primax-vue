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
              <h5>Hello, {{ user.name }}</h5>
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
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>Otto</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>Thornton</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td colspan="2">Larry the Bird</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import User from "../apis/User";

export default {
  data() {
    return {
      user: null
    };
  },

  mounted() {
    User.auth().then(response => {
      this.user = response.data;
    });
  }
};
</script>