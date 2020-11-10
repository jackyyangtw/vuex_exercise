import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

import productsModules from './products'
import cartsModules from './carts'
Vue.use(Vuex);

export default new Vuex.Store({
  //嚴謹模式，出現不符合規範的語法就跳錯
  strict: true,
  state:{
    isLoading: false,
  },
  //操作行為，不操作資料狀態
  actions: {
    //context是固定參數，status 是 payload(載荷)
    updateLoading(context,status){
      context.commit('LOADING',status)
    },
    // getCart(context) {
    //   context.commit('LOADING',true)
    //   const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
    //   axios.get(url).then((response) => {
    //     if (response.data.data.carts) {
    //       context.commit('CART',response.data.data)
    //     }
    //     context.commit('LOADING',false)
    //     console.log('取得購物車', response.data.data);
    //   });
    // },
    // removeCart(context,id) {
    //   const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
    //   context.commit('LOADING',true)
    //   axios.delete(url).then((response) => {
    //     context.commit('LOADING',false)
    //     //調用
    //     context.dispatch('getCart')
    //     console.log('刪除購物車項目', response);
    //   });
    // },
    // //{id, qty} 預設只能傳兩個參數，如果要傳三個，必須用物件包起來
    // addtoCart(context,{id, qty}) {
    //   const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
    //   context.commit('LOADING',true)
    //   const item = {
    //     product_id: id,
    //     qty,
    //   };
    //   axios.post(url, { data: item }).then((response) => {
    //     context.commit('LOADING',false)
    //     context.dispatch('getCart')
    //     console.log('加入購物車:', response);
    //   });
    // },
  },
  //寫入資料
  //操作狀態，可用常數命名(大寫)，state是上方的state
  //不可執行非同步狀態(ajax、settimeout等等)，會造成state和payload不相等，造成除錯困難
  mutations: {
    LOADING(state,status){
      state.isLoading = status;
      console.log("這是status",status)
    },
  },
  modules:{
    productsModules,
    cartsModules
  }
})