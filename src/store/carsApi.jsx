import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const carsApi = createApi({
  reducerPath: "carsApi",
  tagTypes: ["cars"],
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com/" }),
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: () => "/products",
      providesTags: ["cars"],
    }),

    getCar: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [{ type: "cars", id }],
    }),

    addCar: builder.mutation({
      query: (car) => ({
        url: "/products/add",
        method: "POST",
        body: car,
      }),
      invalidatesTags: ["cars"],
    }),

    updateCar: builder.mutation({
      query: ({ id, ...car }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: car,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "cars", id }],
    }),

    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cars"],
    }),
  }),
})

export const { useGetAllCarsQuery, useGetCarQuery, useAddCarMutation, useUpdateCarMutation, useDeleteCarMutation } =
  carsApi

