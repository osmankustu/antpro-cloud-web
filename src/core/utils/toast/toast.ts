// src/core/ui/toast.ts
import { toast, ToastOptions } from 'react-toastify';

const baseConfig: ToastOptions = {
  position: 'bottom-right',
  autoClose: 3500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'colored',
};

export const Toast = {
  success(message?: string, options?: ToastOptions) {
    toast.success(message, { ...baseConfig, ...options });
  },

  error(message?: string, options?: ToastOptions) {
    toast.error(message, { ...baseConfig, ...options });
  },

  info(message?: string, options?: ToastOptions) {
    toast.info(message, { ...baseConfig, ...options });
  },

  warning(message?: string, options?: ToastOptions) {
    toast.warning(message, { ...baseConfig, ...options });
  },
};
