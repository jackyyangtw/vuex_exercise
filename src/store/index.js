import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  //嚴謹模式，出現不符合規範的語法就跳錯
  strict: true,
  state:{
    isLoading: false,
    products: [],
    categories: [],
  },
  //操作行為，不操作資料狀態
  actions: {
    //context是固定參數，status 是 payload(載荷)
    updateLoading(context,status){
      context.commit('LOADING',status)
    },
    getProducts(context) {
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/products/all`;
      context.commit('LOADING',true)
      axios.get(url).then((response) => {
        context.commit('PRODUCTS',response.data.products)
        context.commit('CATEGORIES',response.data.products)
        console.log('取得產品列表:', response);
        context.commit('LOADING',false)
      });
    },
  },
  //操作狀態，可用常數命名(大寫)，state是上方的state
  //不可執行非同步狀態(ajax、settimeout等等)，會造成state和payload不相等，造成除錯困難
  mutations: {
    LOADING(state,status){
      state.isLoading = status;
    },
    PRODUCTS(state,payload){
      state.products = payload;
    },
    CATEGORIES(state,payload){
      const categories = new Set();
      payload.forEach((item) => {
        categories.add(item.category);
      });
      state.categories = Array.from(categories);
    }
  }
})