import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILoginUser, IRegisterUser, IUser } from "./register.type";

export const usersApi = createApi({
  reducerPath: "/articles",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5555" }),
  tagTypes: ["UsersList"],
  endpoints: (builder) => ({
    registerUser: builder.mutation<IUser, IRegisterUser>({
      query: (newUser) => ({
        url: "/auth/register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["UsersList"],
    }),
    loginUser: builder.mutation<IUser, ILoginUser>({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["UsersList"],
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = usersApi;