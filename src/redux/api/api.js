import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1' }),
  //   baseQuery: fetchBaseQuery({ baseUrl: 'https://todo-app-server-eta.vercel.app'}),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (options) => {
        console.log({ options });
        return {
          url: `/products`,
          method: "GET",
          params: {
            searchTerm: options.searchTerm,
            sort: options.sort,
            limit: options.limit,
            page: options.page,
            category: options.category
          }
        }
      },
      providesTags: ['Product'],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    getFlashProducts: builder.query({
      query: () => ({
        url: `/flash-sale`,
        method: "GET",
      })
    }),
  }),
});


export const { useGetProductsQuery, useDeleteProductMutation, useGetFlashProductsQuery } = baseApi;