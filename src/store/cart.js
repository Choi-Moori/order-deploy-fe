function initState(){
    return {
        productsInCart: JSON.parse(localStorage.getItem('productsInCart')) || [],
        totalQuantity: localStorage.getItem('totalQuantity') || 0,
    }
}
const cart = {
    state: initState,
    mutations:{
        addCart(state, product){
            const existProduct = state.productsInCart.find(p => p.id == product.id);
            if(existProduct){
                existProduct.quantity += product.quantity;
            }
            else{
                state.productsInCart.push(product);
            }

            state.totalQuantity = parseInt(state.totalQuantity) + product.quantity;

            // 로컬스토리지에 데이터직렬화 
            localStorage.setItem('productsInCart', JSON.stringify(state.productsInCart));
            localStorage.setItem('totalQuantity', state.totalQuantity);
            
        },
        clearCart(state){
            state.productsInCart = [];
            state.totalQuantity = 0;
            localStorage.removeItem('productsInCart');
            localStorage.removeItem('totalQuantity');
        }
    },
    actions:{
        addCart(context, product){
            context.commit('addCart', product);
        },
        clearCart(context){
            context.commit('clearCart');
        }
    },
    getters:{
        getTotalQuantity: state => state.totalQuantity,
        getProductsInCart: state => state.productsInCart,
    }
}

export default cart