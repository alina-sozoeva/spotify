import { configureStore } from "@reduxjs/toolkit";
import { usersApi } from "./register/register.api";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat
      //   productApi.middleware,
      //   favoritesApi.middleware
      (),
});

export type TypeRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
