import { Listed } from '@/core/connection/types/response/listed';
import { serviceManagementApi } from '../api/serviceMangement.api';
import { ActivityAddModel, ActivityModel, ActivityUpdateModel } from '../types/activity.types';

export const activityEndpoints = serviceManagementApi.injectEndpoints({
  endpoints: builder => ({
    getActivitiesByPoolId: builder.query<Listed<ActivityModel>, string>({
      query: (poolId: string) => ({
        url: `activities/get-list/by-pool-id/${poolId}`,
        method: 'GET',
      }),
      providesTags: ['service-activity'],
    }),

    getActivityById: builder.query<ActivityModel, string>({
      query: id => ({
        url: `activities/${id}`,
        method: 'GET',
      }),
      providesTags: ['service-activity'],
    }),

    addActivity: builder.mutation<ActivityModel, ActivityAddModel>({
      query: body => ({
        url: 'activities',
        method: 'POST',
        data: body,
      }),
      invalidatesTags: ['service-activity', 'service-activity', 'service-document'],
    }),

    updateActivity: builder.mutation<ActivityModel, ActivityUpdateModel>({
      query: body => ({
        url: 'activities',
        method: 'PUT',
        data: body,
      }),
      invalidatesTags: ['service-activity', 'service-activity', 'service-document'],
    }),

    deleteActivity: builder.mutation<ActivityModel, string>({
      query: id => ({
        url: `activities/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['service-activity', 'service-activity', 'service-document'],
    }),
  }),
});

export const {
  //Queries
  useGetActivityByIdQuery,
  useGetActivitiesByPoolIdQuery,
  //Mutations
  useAddActivityMutation,
  useUpdateActivityMutation,
  useDeleteActivityMutation,
} = activityEndpoints;
