import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice"
import placeReducer from "../features/places/placeSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    places: placeReducer,
  },
})
