import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./constants";

// Replace 'your_login_api_endpoint' with the actual login API endpoint
// const BASE_URL = BASE_URL;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/ekisan/user/login",
        method: "POST",
        body: { email, password },
      }),
    }),
    // Add more endpoints here for different API requests based on pages
    // For example:
    // otherEndpoint: builder.query({
    //   query: (params) => ({ url: '/other-endpoint', params }),
    // }),
    fulfilled: (result) => {
      return result;
    },
  }),
});

export const { useLoginMutation /*, useOtherEndpointQuery*/ } = api;
