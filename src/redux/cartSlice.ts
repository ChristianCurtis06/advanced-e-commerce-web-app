import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCounter } from './asyncActions';
import { Product } from '../queries/Products';

interface CartState {
   cart: Product[];
   loading: boolean;
   error: string | null;
}

const initialState: CartState = {
   cart: [],
   loading: false,
   error: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.cart.push(action.payload);
        },
        removeProduct: (state, action: PayloadAction<number>) => {
            state.cart = state.cart.filter(product => product.id !== action.payload);
        },
        updateProduct: (state, action: PayloadAction<Product>) => {
            const index = state.cart.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.cart[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCounter.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCounter.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
            })
            .addCase(fetchCounter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { addProduct, removeProduct, updateProduct } = cartSlice.actions;
export default cartSlice.reducer;