import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: JSON.parse(localStorage.getItem('cart')) || [],
    total: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const exists = state.items.find(item => item._id === action.payload._id);
            if (!exists) {
                state.items.push(action.payload);
                localStorage.setItem('cart', JSON.stringify(state.items));
            }
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item._id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state.items));
        },
        clearCart: (state) => {
            state.items = [];
            state.total = 0;
            localStorage.removeItem('cart');
        },
        calculateTotal: (state) => {
            state.total = state.items.reduce((sum, item) => sum + (item.offerPrice || item.price), 0);
        },
    },
});

export const { addToCart, removeFromCart, clearCart, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;
