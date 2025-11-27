import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import movieReducer from './slices/movieSlice';
import wishlistReducer from './slices/wishlistSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        movie: movieReducer,
        wishlist: wishlistReducer,
    },
});

export default store;
