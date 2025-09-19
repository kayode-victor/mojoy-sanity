//redux/mojoySlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { ProductProps } from "../../type";

interface StoreState {
  productData: ProductProps[];
  totalAmount: number;
}

const initialState: StoreState = {
  productData: [],
  totalAmount: 0,
};

export const mojoySlice = createSlice({
  name: "mojoy",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { _id } = action.payload;
      const existingProductIndex = state.productData.findIndex(
        (item) => item._id === _id
      );

      if (
        Array.isArray(state?.productData) &&
        existingProductIndex !== -1 &&
        existingProductIndex < state?.productData?.length &&
        state.productData[existingProductIndex] &&
        typeof state?.productData[existingProductIndex].quantity === "number"
      ) {
        // If product exists and has a quantity, increase it
        state.productData[existingProductIndex].quantity += 1;
      } else {
        const productToAdd = { ...action.payload, quantity: 1 }; // Set quantity to 1
        state.productData.push(productToAdd);
      }

      // Update total amount
      state.totalAmount = calculateTotal(state.productData) + 5000;
    },
    increaseQuantity: (state, action) => {
      const { _id } = action.payload;
      const existingProduct = state.productData.find(
        (item) => item._id === _id
      );
      if (existingProduct && typeof existingProduct.quantity === "number") {
        existingProduct.quantity++;
      }

      // Update total amount
      state.totalAmount = calculateTotal(state.productData) + 5000;
    },
    decreaseQuantity: (state, action) => {
      const { _id } = action.payload;
      const existingProduct = state.productData.find(
        (item) => item._id === _id
      );
      if (existingProduct?.quantity === 1) {
        state.productData = state.productData.filter(
          (item) => item._id !== _id
        );
      } else {
        if (existingProduct && typeof existingProduct.quantity === "number") {
          existingProduct.quantity--;
        }
      }

      // Update total amount
      state.totalAmount = calculateTotal(state.productData) + 5000;
    },
    deleteProduct: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload
      );

      // Update total amount
      state.totalAmount = calculateTotal(state.productData) + 5000;
    },
    resetCart: (state) => {
      state.productData = [];
      state.totalAmount = 0;
    },
  },
});

const calculateTotal = (productData: ProductProps[]): number => {
  return productData.reduce(
    (total, item) => total + (item.price ?? 0) * (item.quantity ?? 0),
    0
  );
};

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  deleteProduct,
  resetCart,
} = mojoySlice.actions;
export default mojoySlice.reducer;
