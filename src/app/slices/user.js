import { createAsyncThunk } from "@reduxjs/toolkit";
import { postJWT } from "app/apis";

export const authUser = createAsyncThunk("user/authUser", async (payload) => {
  const resp = await postJWT(payload);
  return resp.data;
});

export const reducers = {
  setAccessToken(state, action) {
    const { accessToken } = action.payload;
    return {
      ...state,
      accessToken,
    };
  },
};

export const extraReducers = {
  [authUser.fulfilled.type]: (state, action) => {
    const { user, accessToken } = action.payload;

    return {
      ...state,
      user,
      accessToken,
    };
  },
};
