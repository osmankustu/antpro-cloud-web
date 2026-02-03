import { Listed } from '@/core/connection/types/response/listed';
import { BaseEmployee } from '@/core/model/baseEmployee';
import { staffManagementApi } from '../api/staffManagement.api';

export const staffSharedEndpoints = staffManagementApi.injectEndpoints({
  endpoints: builder => ({
    getAllEmployees: builder.query<Listed<BaseEmployee>, void>({
      query: () => ({
        url: '/employees/get-list/for-select',
        method: 'GET',
      }),
      providesTags: ['shared'],
    }),
    getAllTeams: builder.query<Listed<BaseEmployee>, void>({
      query: () => ({
        url: '/teams/get-list/for-select',
        method: 'GET',
      }),
      providesTags: ['shared'],
    }),
  }),
});

export const { useGetAllEmployeesQuery, useGetAllTeamsQuery } = staffSharedEndpoints;
