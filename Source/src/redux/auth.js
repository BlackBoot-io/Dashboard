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
      Utils.storedData(storageKeys.token, accessToken);
      Utils.storedData(storageKeys.tokenExpiretime, accesTokenExpireTime);
      if (refreshToken) {
        Utils.storedData(storageKeys.refreshToken, refreshToken);
        state.refreshToken = accessToken;
      }
      Utils.storedData(
        storageKeys.refreshTokenExpiretime,
        refreshTokenExpiretime
      );
      state.token = accessToken;
      state.tokenExpireTime = accesTokenExpireTime;
      state.refreshTokenExpiretime = accessToken;
      state.user = user;
      //nav(`/${routes.home}`);
    },
    setCurrentUser: (state, action) => {
      let token = Utils.getStoredData(storageKeys.token);
      let tokenExpireTime = Utils.getStoredData(storageKeys.tokenExpiretime);
      let refreshToken = Utils.getStoredData(storageKeys.refreshToken);
      let refreshTokenExpiretime = Utils.getStoredData(
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
      Utils.removeStoredData(storageKeys.token);
      Utils.removeStoredData(storageKeys.tokenExpiretime);
      Utils.removeStoredData(storageKeys.refreshToken);
      Utils.removeStoredData(storageKeys.refreshTokenExpiretime);
    },
  },
  // extraReducers:{

  // }
});

export const { setCredentials, setCurrentUser, logOut } = authSlice.actions;

export default authSlice.reducer;
