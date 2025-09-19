// app/store/wishlistSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductProps } from "../../type";

interface WishlistState {
  items: ProductProps[];
}

const initialState: WishlistState = {
  items: [],
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<ProductProps>) => {
      const product = action.payload;
      const exists = state.items.find((item) => item._id === product._id);
      if (!exists) {
        state.items.push(product);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    setWishlist: (state, action: PayloadAction<ProductProps[]>) => {
      state.items = action.payload;
    },
    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export const { addToWishlist, removeFromWishlist, setWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
