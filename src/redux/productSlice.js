import { createSlice } from '@reduxjs/toolkit'


const productSlice = createSlice({
    name: 'product',
    initialState: {
        product : []
    },
    reducers: {
        addProduct: (state, action) => {
            state.product.push(action.payload);
        },
        deleteProduct: (state, action)  => {
            state.product = action.payload;
        }
    }
})

export const { addProduct, deleteProduct } = productSlice.actions
export default productSlice.reducer;