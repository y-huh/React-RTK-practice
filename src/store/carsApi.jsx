import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"


const baseUrl = "http://localhost:3000"

export const carsApi = createApi({
  reducerPath: "carsApi",
  tagTypes: ["cars"],
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getAllCars: builder.query({
      query: () => "/cars",
      providesTags: ["cars"],
    }),

    getCar: builder.query({
      query: (id) => `/cars/${id}`,
      providesTags: (result, error, id) => [{ type: "cars", id }],
    }),

    addCar: builder.mutation({
      query: (car) => ({
        url: "/cars",
        method: "POST",
        body: car,
      }),
      invalidatesTags: ["cars"],
    }),

    updateCar: builder.mutation({
      query: ({ id, ...car }) => ({
        url: `/cars/${id}`,
        method: "PUT",
        body: car,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "cars", id }],
    }),

    deleteCar: builder.mutation({
      query: (id) => ({
        url: `/cars/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["cars"],
    }),

    toggleLike: builder.mutation({
      query: ({ id, isLiked }) => ({
        url: `/cars/${id}`,
        method: "PATCH",
        body: { isLiked },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "cars", id }],
    }),
  }),
})

export const {
  useGetAllCarsQuery,
  useGetCarQuery,
  useAddCarMutation,
  useUpdateCarMutation,
  useDeleteCarMutation,
  useToggleLikeMutation,
} = carsApi

