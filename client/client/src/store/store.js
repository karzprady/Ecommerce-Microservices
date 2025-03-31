import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import AdminProductsSlice from "./product-slice/index"
import shopProductsSlice from "./shop-product/index"
import cartSliceReducer from "./cart-slice/index"
import addressSlice from "./shop-product/address-slice"
import shopOrders from "./order-slice/index"
import searchs from "./search/index"
import Review from "./reviews-slice/index"

const store = configureStore({
    reducer : {
        auth : authReducer,
        adminproducts : AdminProductsSlice,
        shopSlice : shopProductsSlice,
        cartSlice : cartSliceReducer,
        addSlice : addressSlice,
        orderSlice  : shopOrders,
        searchSlice : searchs,
        reviewSlice : Review,

    }
})

export default store