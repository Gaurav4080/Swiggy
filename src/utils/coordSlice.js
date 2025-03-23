import { createSlice } from "@reduxjs/toolkit";

const coordSlice = createSlice({
  name: "coordSlice",
  initialState: { lat: 28.5355161, lng: 77.3910265 },
  reducers: {
    updateCoord: (state, action) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});

export const { updateCoord } = coordSlice.actions;
export default coordSlice.reducer;
