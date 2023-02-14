import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import placeService from "./placeService"

const initialState = {
  places: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

// Add new place
export const createPlace = createAsyncThunk(
  "places/create",
  async (placeData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await placeService.createPlace(placeData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get list of places
export const getPlaces = createAsyncThunk(
  "places/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await placeService.getPlaces(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// update place
export const updatePlace = createAsyncThunk(
  "places/update",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await placeService.updatePlace(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete place
export const deletePlace = createAsyncThunk(
  "places/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await placeService.deletePlace(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPlace.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createPlace.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.places.push(action.payload)
      })
      .addCase(createPlace.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getPlaces.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getPlaces.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.places = action.payload
      })
      .addCase(getPlaces.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(updatePlace.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updatePlace.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.places = state.places.filter(
          (place) => place._id !== action.payload.id
        )
      })
      .addCase(updatePlace.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deletePlace.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deletePlace.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.places = state.places.filter(
          (place) => place._id !== action.payload.id
        )
      })
      .addCase(deletePlace.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = placeSlice.actions
export default placeSlice.reducer
