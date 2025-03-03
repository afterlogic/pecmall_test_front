import { CloseButton } from '@src/shared/ui/ToastMessage';
import { ToastContainer } from 'react-toastify';

const ToastProvider = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar
      newestOnTop
      pauseOnFocusLoss
      draggable
      pauseOnHover
      closeButton={CloseButton}
    />
  );
};

export default ToastProvider;
