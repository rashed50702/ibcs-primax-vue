import User from "./apis/User";

export const func = {


   // newOrdersCount: (data) => {
   //    return something  
   //  }
   async newOrdersCount(){
     await User.newOrdersCounter().then(response => {
      // return response.data;
       console.log(response.data);
       // this.xyz =response.data;
     });
   }
}