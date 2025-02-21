import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const carsApi = createApi({
  reducerPath: "carsApi",
  tagTypes: ["cars"],
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: () => "/cars",
    }),
    addCars: builder.mutation({
      query: (data) => ({
        url: "/cars",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllCarsQuery, useAddCarsMutation } = carsApi;
