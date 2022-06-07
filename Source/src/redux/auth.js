import { createSlice } from "@reduxjs/toolkit";
import Utils from "config/utils";
import storageKeys from "config/storageKeys";
import routes from "config/routes";
const initialState = {
  user: null,
  token: null,
  tokenExpireTime: null,
  refreshToken: null,
  refreshTokenExpiretime: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const {
        accessToken,
        accesTokenExpireTime,
        refreshToken,
        refreshTokenExpiretime,
        user,
        //nav,
      } = action.payload;
      console.log("credentials", {
        accessToken,
        accesTokenExpireTime,
        refreshToken,
        refreshTokenExpiretime,
        user,
        //nav,
      });
      localStorage.setItem(storageKeys.token, Utils.encrypt(accessToken));
      localStorage.setItem(
        storageKeys.tokenExpiretime,
        Utils.encrypt(accesTokenExpireTime)
      );
      localStorage.setItem(
        storageKeys.refreshToken,
        Utils.encrypt(refreshToken)
      );
      localStorage.setItem(
        storageKeys.refreshTokenExpiretime,
        Utils.encrypt(refreshTokenExpiretime)
      );
      state.token = accessToken;
      state.tokenExpireTime = accesTokenExpireTime;
      state.refreshToken = accessToken;
      state.refreshTokenExpiretime = accessToken;
      state.user = user;
      //nav(`/${routes.home}`);
    },
    setCurrentUser: (state, action) => {
      let token = localStorage.getItem(storageKeys.token);
      let tokenExpireTime = localStorage.getItem(storageKeys.tokenExpiretime);
      let refreshToken = localStorage.getItem(storageKeys.refreshToken);
      let refreshTokenExpiretime = localStorage.getItem(
        storageKeys.refreshTokenExpiretime
      );
      state.user = action.payload;
      state.token = token;
      state.tokenExpireTime = tokenExpireTime;
      state.refreshToken = refreshToken;
      state.refreshTokenExpiretime = refreshTokenExpiretime;
    },
    logOut: (state, action) => {
      state.user = null;
      state.token = null;
    },
  },
  // extraReducers:{

  // }
});

export const { setCredentials, setCurrentUser, logOut } = authSlice.actions;

export default authSlice.reducer;
