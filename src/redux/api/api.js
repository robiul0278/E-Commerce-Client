import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/v1',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('access-token');

      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ["Product", "FlashSale", "User"],
  // =========================
  // USER SECTION
  // =========================
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: (options) => {
        console.log(options);
        return {
          url: `/user`,
          method: "GET",
          params:{
            searchTerm: options.searchTerm,
            limit: options.limit,
            page: options.page,
          }
        }
      },
      providesTags: ["User"],
    }),
    getMyUserData: builder.query({
      query: (email) => {
        return {
          url: `/user/${email}`,
          method: "GET",
        }
      },
      invalidatesTags: ["User"],
    }),
    updateUserRole: builder.mutation({
      query: (options) => {
        return {
          url: `/user/role/${options.id}`,
          method: "PATCH",
          body: { role: options.role }
        }
      },
      invalidatesTags: ["User"],
    }),
    deleteUser: builder.mutation({
      query: (id) => {
        console.log(id);
        return {
          url: `/user/delete/${id}`,
          method: "DELETE",
        }
      },
      invalidatesTags: ["User"],
    }),
    // =========================
    // PRODUCT SECTION
    // =========================
    getProducts: builder.query({
      query: (options) => {
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
    updateProduct: builder.mutation({
      query: (options) => {
        return {
          url: `/products/update/${options._id}`,
          method: "PATCH",
          body: { options }
        }
      },
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
     // =========================
    // FLASH PRODUCT SECTION
    // =========================
    getFlashProducts: builder.query({
      query: () => ({
        url: `/flash-sale`,
        method: "GET",
      }),
      providesTags: ["FlashSale"],
    }),
    removeFlashProduct: builder.mutation({
      query: (id) => ({
        url: `/flash-sale/remove/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["FlashSale"],
    }),
    createFlashSale: builder.mutation({
      query: (options) => {
        console.log(options);
     return {
      url: `/flash-sale/create`,
      method: "POST",
      body: {
        name: options.name,
        role: options.role,
        discount: options.discount,
        products: options.products,
        startTime: options.startTime,
        endTime: options.endTime,
        status: options.status,
      }
     }
      },
      invalidatesTags: ["FlashSale"],
    }),
    updateFlashSale: builder.mutation({
      query: (options) => ({
        url: `/flash-sale/update`,
        method: "PATCH",
        body: { 
          id: options.id,
          discount: options.discount,
          startTime: options.startTime,
          endTime: options.endTime,
        }
      }),
      invalidatesTags: ["FlashSale"],
    }),
    // =========================
    // ORDER PRODUCT SECTION
    // =========================
    createOrder: builder.mutation({
      query: (options) => ({
        url: `/order/create`,
        method: "POST",
        body: { options }
      }),
      invalidatesTags: ["Order"],
    }),
    getAllOrder: builder.query({
      query: (options) => ({
        url: `/order`,
        method: "GET",
        params: {
          searchTerm: options.searchTerm,
          limit: options.limit,
          page: options.page,
          status: options.status,
        }
      }),
      providesTags: ["Order"],
    }),
    changeOrderStatus: builder.mutation({
      query: (options) => {
        console.log(options);
        return {
          url: `/order/status/${options.id}`,
          method: "PATCH",
          body: { status: options.status }
        }
      },
      invalidatesTags: ["Order"],
    }),
  }),
});


export const { useGetAllUserQuery, useGetMyUserDataQuery, useUpdateUserRoleMutation, useDeleteUserMutation, useGetProductsQuery, useUpdateProductMutation, useDeleteProductMutation, useGetFlashProductsQuery, useRemoveFlashProductMutation,useCreateFlashSaleMutation,useUpdateFlashSaleMutation, useCreateOrderMutation,useGetAllOrderQuery, useChangeOrderStatusMutation } = baseApi;