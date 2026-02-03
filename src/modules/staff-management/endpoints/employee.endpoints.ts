import { Paginated } from '@/core/connection/types/response/paginated';
import { DynamicQuery } from '@/core/model/dynamicQuery';
import { staffManagementApi } from '../api/staffManagement.api';
import { EmployeeAddModel, EmployeeModel, EmployeeUpdateModel } from '../types/employee.types';

export const employeeEndpoints = staffManagementApi.injectEndpoints({
  endpoints: builder => ({
    getEmployees: builder.query<
      Paginated<EmployeeModel>,
      { pageIndex?: number; pageSize?: number }
    >({
      query: ({ pageIndex = 0, pageSize = 10 }) => ({
        url: '/employees',
        method: 'GET',
        params: { pageIndex, pageSize },
      }),

      providesTags: ['employee'],
    }),

    getEmployeesByDynamic: builder.query<
      Paginated<EmployeeModel>,
      { pageIndex: number; pageSize: number; query: DynamicQuery }
    >({
      query: ({ pageIndex = 0, pageSize = 10, query }) => ({
        url: '/employees/get-list/by-dynamic',
        method: 'POST',
        params: { pageIndex, pageSize },
        query,
      }),
      providesTags: ['employee'],
    }),

    getEmployeeById: builder.query<EmployeeModel, string>({
      query: id => ({
        url: `/employees/${id}`,
        method: 'GET',
      }),
      providesTags: ['employee'],
    }),

    addEmployee: builder.mutation<EmployeeModel, EmployeeAddModel>({
      query: body => ({
        url: '/employees',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['employee', 'shared'],
    }),

    updateEmployee: builder.mutation<any, EmployeeUpdateModel>({
      query: body => ({
        url: '/employees',
        method: 'PUT',
        data: body,
      }),
      invalidatesTags: ['employee', 'shared'],
    }),

    deleteEmployee: builder.mutation<any, string>({
      query: id => ({
        url: `/employees/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['employee', 'shared'],
    }),
  }),
});

export const {
  //Queries
  useGetEmployeesQuery,
  useGetEmployeesByDynamicQuery,
  useGetEmployeeByIdQuery,
  //Mutations
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeEndpoints;
