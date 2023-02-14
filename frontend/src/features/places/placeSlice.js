import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import placeService from "./placeService";

const initialState = {
  places: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Add new place
export const createPlace = createAsyncThunk(
  "places/create",
  async (placeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await placeService.createPlace(placeData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(createPlace.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPlace.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.places.push(action.payload);
      })
      .addCase(createPlace.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = placeSlice.actions;
export default placeSlice.reducer;
