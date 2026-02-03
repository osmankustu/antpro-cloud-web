// src/core/utilities/error/errorHandler.ts

import { ResponseError } from '../types/error/errorResponse';

export function handleError(error: any): ResponseError {
  // 🔹 RTK Query error (FetchBaseQueryError)
  if (error?.data) {
    const data = error.data;

    return {
      statusCode: error.status,
      title: data.title || 'Sunucu Hatası',
      detail: data.detail || data.message,
      type: data.type,
      traceId: data.traceId,
      Errors: data.Errors,
    };
  }

  // 🔹 Axios Error
  if (error?.response) {
    const data = error.response.data || {};

    return {
      statusCode: error.response.status,
      title: data.title || 'Sunucu Hatası',
      detail: data.detail || data.message || 'Sunucudan beklenmeyen bir hata yanıtı alındı.',
      type: data.type,
      traceId: data.traceId,
      Errors: data.Errors,
    };
  }

  // 🔹 JS / Network Error
  return {
    title: 'Bağlantı hatası',
    statusCode: 503,
    detail: 'OOPS! Sunucuya erişilemedi, internet bağlantınızı kontrol edin.',
  };
}
