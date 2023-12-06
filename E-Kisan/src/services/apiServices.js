import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

// Replace 'your_login_api_endpoint' with the actual login API endpoint
// const BASE_URL = BASE_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "ekisan/user/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    register: builder.mutation({
      query: ({
        firstName,
        lastName,
        email,
        password,
        contactNo,
        role,
        roleName,
      }) => ({
        url: "ekisan/user/register",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
          contactNo: contactNo,
          roles: [
            {
              roleId: role,
              roleName: roleName,
            },
          ],
        }),
      }),
    }),
    createProduct: builder.mutation({
      query: ({ prodName, price, quantity, email }) => ({
        url: "products",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prodName: prodName,
          price: price,
          quantity: quantity,
          catId: {
            catId: 1,
          },
          email: email,
        }),
      }),
    }),
    getProducts: builder.query({
      query: (email) => ({
        url: `products/getProduct/${email}`,
      }),
      providesTags: ["Products"],
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: "products",
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ prodId, isActive }) => ({
        url: `products/updateFlag/${isActive}/${prodId}`,
        method: "PUT",
        responseHandler: (response) => response.text(),
      }),
      invalidatesTags: ["Products"],
    }),
    fulfilled: (result) => {
      return result;
    },
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useCreateProductMutation,
  useGetProductsQuery,
  useGetAllProductsQuery,
  useUpdateProductMutation,
  /*, useOtherEndpointQuery*/
} = api;
