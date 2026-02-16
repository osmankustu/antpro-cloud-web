import { Listed } from '@/core/connection/types/response/listed';
import { serviceManagementApi } from '../api/serviceMangement.api';
import {
  DocumentAddModel,
  DocumentModel,
  SignedDocument,
  SignedDocumentRequest,
} from '../types/document.types';

const documentEndpoints = serviceManagementApi.injectEndpoints({
  endpoints: builder => ({
    getDocumentsSignedUrl: builder.query<SignedDocument, SignedDocumentRequest>({
      query: body => ({
        url: 'serviceDocuments/signedUrl',
        method: 'POST',
        data: body,
      }),
      providesTags: ['service-document'],
    }),

    getDocumentByServiceId: builder.query<Listed<DocumentModel>, string>({
      query: id => ({
        url: `serviceDocuments/get-list/by-service-id/${id}`,
        method: 'GET',
      }),
      providesTags: ['service-document'],
    }),

    getDocumentByActivityId: builder.query<Listed<DocumentModel>, string>({
      query: id => ({
        url: `serviceDocuments/get-list/by-activity-id/${id}`,
        method: 'GET',
      }),
      providesTags: ['service-document'],
    }),

    getDocumentById: builder.query<DocumentModel, string>({
      query: id => ({
        url: ``,
        method: 'GET',
      }),
    }),

    deleteDocument: builder.mutation<DocumentModel, string>({
      query: id => ({
        url: `serviceDocuments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['service-document', 'service-activity'],
    }),

    addDocument: builder.mutation<DocumentModel, DocumentAddModel>({
      query: body => {
        const formData = new FormData();

        formData.append('activityId', body.activityId);
        formData.append('serviceId', body.serviceId);

        body.files.forEach(file => {
          console.log(file);
          formData.append('files', file);
        });

        return {
          url: 'ServiceDocuments',
          method: 'POST',
          data: formData,
          onUploadProgress: progress => {
            console.log('Upload %', progress);
          },
        };
      },
      invalidatesTags: ['service-document'],
    }),
  }),
});

export const {
  //Queries
  useGetDocumentByServiceIdQuery,
  useGetDocumentByActivityIdQuery,
  useGetDocumentByIdQuery,
  useGetDocumentsSignedUrlQuery,
  //Mutations
  useAddDocumentMutation,
  useDeleteDocumentMutation,
} = documentEndpoints;
