import { createSlice } from "@reduxjs/toolkit";

const savedFavorites =
  JSON.parse(localStorage.getItem("favorites")) || [];

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: savedFavorites,

  reducers: {
    addFavorite: (state, action) => {
      const exists = state.find(
        (food) => food.id === action.payload.id
      );

      if (!exists) {
        state.push(action.payload);
        localStorage.setItem(
          "favorites",
          JSON.stringify(state)
        );
      }
    },

    removeFavorite: (state, action) => {
      const updatedFavorites = state.filter(
        (food) => food.id !== action.payload
      );

      localStorage.setItem(
        "favorites",
        JSON.stringify(updatedFavorites)
      );

      return updatedFavorites;
    }
  }
});

export const {
  addFavorite,
  removeFavorite
} = favoriteSlice.actions;

export default favoriteSlice.reducer;