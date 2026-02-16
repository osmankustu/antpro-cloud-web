import { ResponseError } from '@/core/connection/types/error/errorResponse';
import { Listed } from '@/core/connection/types/response/listed';
import { BaseEmployee } from '@/core/model/baseEmployee';
import { BaseAddress } from '@/modules/customer-management/types/base/baseAddress';
import { BaseCustomer } from '@/modules/customer-management/types/base/baseCustomer';
import {
  ServiceAddModel,
  ServiceModel,
  ServiceUpdateModel,
} from '@/modules/service-management/types/service.types';

export interface ServicesHookResponse {
  data: {
    services?: ServiceModel[];
    pagination?: {
      pageCount?: number;
      currentPage?: number;
    };
  };
  state: {
    servicesState: {
      isLoading: boolean;
      isFetching: Boolean;
      isSuccess: boolean;
      isError: boolean;
    };
  };
  errors: {
    error?: ResponseError;
  };

  actions: {
    goToPage: (page: number) => void;
    loadMore: () => void;
    retry: () => void;
    refresh: () => Promise<void>;
    applyFilters: (query: any) => void;
  };
}

export interface ServiceDetailHookResponse {
  data: {
    service?: ServiceModel;
    assignedName?: string;
    customerName?: string;
    customerId?: string;
  };
  state: {
    serviceState: {
      isLoading: boolean;
      isFetching: Boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    customerState: {
      isLoading: boolean;
      isFetching: Boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    employeesState: {
      isLoading: boolean;
      isFetching: Boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    teamsState: {
      isLoading: boolean;
      isFetching: Boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    deleteState: {
      isLoading: boolean;
      isSuccess: boolean;
      isError: boolean;
    };
  };
  errors: {
    error?: ResponseError;
  };
  actions: {
    delete: () => Promise<void>;
    refetch: () => Promise<void>;
  };
}

export interface ServiceAddHookResponse {
  data: {
    corporateCustomers?: Listed<BaseCustomer>;
    individualCustomers?: Listed<BaseCustomer>;
    employees?: Listed<BaseEmployee>;
    teams?: Listed<BaseEmployee>;
    customerAddress?: Listed<BaseAddress>;
  };
  state: {
    customerState: {
      isLoading: boolean;
      isFetching: Boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    employeesState: {
      isLoading: boolean;
      isFetching: Boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    teamsState: {
      isLoading: boolean;
      isFetching: Boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    addressState: {
      isLoading: boolean;
      isFetching: Boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    addState: {
      isLoading: boolean;
      isSuccess: boolean;
      isError: boolean;
    };
  };
  errors: {
    error?: ResponseError;
    fieldErrors: Partial<Record<keyof ServiceAddModel, string>>;
    fetchError?: ResponseError;
  };
  actions: {
    add: (payload: ServiceAddModel) => Promise<void>;
  };
}

export interface ServiceUpdateHookResponse {
  data: {
    corporateCustomers?: Listed<BaseCustomer>;
    individualCustomers?: Listed<BaseCustomer>;
    employees?: Listed<BaseEmployee>;
    teams?: Listed<BaseEmployee>;
    customerAddress?: Listed<BaseAddress>;
  };
  state: {
    customerState: {
      isLoading: boolean;
      isFetching: Boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    employeesState: {
      isLoading: boolean;
      isFetching: Boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    teamsState: {
      isLoading: boolean;
      isFetching: Boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    addressState: {
      isLoading: boolean;
      isFetching: Boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    updateState: {
      isLoading: boolean;
      isSuccess: boolean;
      isError: boolean;
    };
  };
  errors: {
    error?: ResponseError;
    fieldErrors: Partial<Record<keyof ServiceUpdateModel, string>>;
    fetchError?: ResponseError;
  };
  actions: {
    update: (payload: ServiceUpdateModel) => Promise<void>;
  };
}
