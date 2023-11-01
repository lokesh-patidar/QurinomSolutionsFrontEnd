import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allProducts: [],
    isProductsLoading: false,
    isProductsError: false,

    productById: [],
    isProductByIdLoading: false,
    isProductByIdError: false,
};

const ProductsSlice = createSlice({
    name: 'Products',
    initialState,
    reducers: {
        getProductRequest(state) {
            state.isProductsLoading = true;
            state.isProductsError = false;
        },
        getProductSuccess(state, action) {
            state.allProducts = action.payload ? action.payload : [];
            state.isProductsLoading = false;
            state.isProductsError = false;
        },
        getProductFailure(state, action) {
            state.allProducts = [];
            state.isProductsLoading = false;
            state.isProductsError = true;
        },

        getProductByIdRequest(state) {
            state.isProductByIdLoading = true;
            state.isProductByIdError = false;
        },
        getProductByIdSuccess(state, action) {
            state.productById = action.payload ? action.payload : {};
            state.isProductByIdLoading = false;
            state.isProductByIdError = false;
        },
        getProductByIdFailure(state, action) {
            state.productById = [];
            state.isProductByIdLoading = false;
            state.isProductByIdError = true;
        },
    },
});


export const {

    getProductRequest,
    getProductSuccess,
    getProductFailure,

    getProductByIdRequest,
    getProductByIdSuccess,
    getProductByIdFailure,

} = ProductsSlice.actions;

export default ProductsSlice.reducer;
