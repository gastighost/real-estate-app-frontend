import api from "@/common/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface PropertiesState {
  properties: any[];
  property: any;
}

const initialState: PropertiesState = {
  properties: [],
  property: {},
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
  reducers: {
    selectProperty: (state, action) => {
      const index = state.properties.findIndex(
        (prop) => action.payload.id === prop.id
      );

      state.properties[index] = action.payload;
      state.property = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProperties.fulfilled, (state, action) => {
      state.properties = action.payload;
    });
  },
});

export const { selectProperty } = propertiesSlice.actions;

export default propertiesSlice.reducer;
