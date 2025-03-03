import { toast } from 'react-toastify';

import ToastMessage from '@src/shared/ui/ToastMessage';

export const notify = (
  message?: string,
  type?: 'success' | 'error' | 'info' | 'warning',
  onClose?: () => void,
) => {
  if (onClose) {
    toast(ToastMessage, {
      data: { message, type },
      onClose,
    });
    return;
  } else {
    toast(ToastMessage, {
      data: { message, type },
    });
  }
};
