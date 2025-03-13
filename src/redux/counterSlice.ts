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
        removeProduct: (state) => {
            state.cart = state.cart.filter(product => product.id !== action.payload);
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
                state.count = action.payload;
            })
            .addCase(fetchCounter.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { increment, decrement, incrementByAmount } = cartSlice.actions;
export default cartSlice.reducer;