import api from "@/common/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PropertiesState {
  properties: any[];
}

const initialState: PropertiesState = {
  properties: [],
};

export const getProperties = createAsyncThunk(
  "properties/getProperties",
  async () => {
    const response = await api.getProperties();

    return response.data.properties;
  }
);

const propertiesSlice = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProperties.fulfilled, (state, action) => {
      state.properties = action.payload;
    });
  },
});

export default propertiesSlice.reducer;
