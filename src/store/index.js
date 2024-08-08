// index.js 가 무조건 있어야한다.
import { createStore } from 'vuex';
import practice from './practice'
import cart from './cart'

const store = createStore({
    modules:{
        practice,
        cart
    }
})

export default store;