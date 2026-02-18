import { User } from '@/core/auth/types/user';
import { ResponseError } from '@/core/connection/types/error/errorResponse';
import {
  ActivityAddModel,
  ActivityModel,
  ActivityUpdateModel,
} from '@/modules/service-management/types/activity.types';

export interface ActivitiesHookResponse {
  data: {
    activities?: ActivityModel[];
  };
  state: {
    activityState: {
      isLoading: boolean;
      isFetching: Boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    employeeState: {
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
    fetchError?: ResponseError;
  };
  actions: {
    delete: (id: string) => Promise<void>;
    refetch: () => Promise<void>;
  };
}

export interface ActivitiyDetailHookResponse {
  data: {
    activity?: ActivityModel;
    employeeName: string | null;
  };
  state: {
    activityState: {
      isLoading: boolean;
      isFetching: Boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    employeeState: {
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
    fetchError?: ResponseError;
  };
  actions: {
    delete: () => Promise<void>;
    refetch: () => Promise<void>;
  };
}
export interface ActivityAddHookResponse {
  data: {
    currentUser: User | null;
  };
  state: {
    activitySubmitState: {
      isLoading: boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    documentSubmitState: {
      isLoading: boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    documentProgress: number | null;
  };
  errors: {
    error?: ResponseError;
    fieldErrors: Partial<Record<keyof ActivityAddModel, string>>;
  };
  actions: {
    add: (payload: ActivityAddModel, files: File[]) => Promise<void>;
  };
}

export interface ActivityUpdateHookResponse {
  data: {
    currentUser: User | null;
  };
  state: {
    activitySubmitState: {
      isLoading: boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    documentSubmitState: {
      isLoading: boolean;
      isSuccess: boolean;
      isError: boolean;
    };
    documentProgress: number | null;
  };
  errors: {
    error?: ResponseError;
    fieldErrors: Partial<Record<keyof ActivityUpdateModel, string>>;
  };
  actions: {
    update: (payload: ActivityUpdateModel, files: File[]) => Promise<void>;
  };
}
