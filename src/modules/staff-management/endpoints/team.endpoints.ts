import { Paginated } from '@/core/connection/types/response/paginated';
import { DynamicQuery } from '@/core/model/dynamicQuery';
import { staffManagementApi } from '../api/staffManagement.api';
import { TeamAddModel, TeamModel, TeamUpdateModel } from '../types/team.types';

export const TeamEndpoints = staffManagementApi.injectEndpoints({
  endpoints: builder => ({
    getTeams: builder.query<Paginated<TeamModel>, { pageIndex?: number; pageSize?: number }>({
      query: ({ pageIndex = 0, pageSize = 10 }) => ({
        url: 'teams',
        method: 'GET',
        params: { pageIndex, pageSize },
      }),
      providesTags: ['team'],
    }),

    getTeamsByDynamic: builder.query<
      Paginated<TeamModel>,
      { pageIndex: number; pageSize: number; query: DynamicQuery }
    >({
      query: ({ pageIndex = 0, pageSize = 10, query }) => ({
        url: 'teams/get-list/by-dynamic',
        method: 'POST',
        params: { pageIndex, pageSize },
        data: query,
      }),
      providesTags: ['team'],
    }),
    getTeamById: builder.query<TeamModel, string>({
      query: id => ({
        url: `teams/${id}`,
        method: 'GET',
      }),
      providesTags: ['team'],
    }),

    addTeam: builder.mutation<TeamModel, TeamAddModel>({
      query: body => ({
        url: 'teams',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['team', 'shared'],
    }),

    updateTeam: builder.mutation<TeamModel, TeamUpdateModel>({
      query: body => ({
        url: 'teams',
        method: 'PUT',
        data: body,
      }),
      invalidatesTags: ['team', 'shared'],
    }),

    deleteTeam: builder.mutation<any, string>({
      query: id => ({
        url: `teams/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['team', 'shared'],
    }),
  }),
});

export const {
  useGetTeamsQuery,
  useGetTeamsByDynamicQuery,
  useGetTeamByIdQuery,
  useDeleteTeamMutation,
  useAddTeamMutation,
  useUpdateTeamMutation,
} = TeamEndpoints;
