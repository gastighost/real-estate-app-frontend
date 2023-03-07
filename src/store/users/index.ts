import api from "@/common/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UsersState {
  loggedInUser: {
    id: string;
    username: string;
  } | null;
}

const initialState: UsersState = {
  loggedInUser: null,
};

export const getLoggedInUser = createAsyncThunk(
  "users/getLoggedInUser",
  async () => {
    const response = await api.getProfile();

    return response.data.user;
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    removeLoggedInUser: (state) => {
      state.loggedInUser = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLoggedInUser.fulfilled, (state, action) => {
      state.loggedInUser = action.payload;
    });
  },
});

export const { removeLoggedInUser } = usersSlice.actions;

export default usersSlice.reducer;
