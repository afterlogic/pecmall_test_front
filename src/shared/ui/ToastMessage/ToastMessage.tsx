import { ToastContentProps } from 'react-toastify';
import classNames from 'classnames/bind';
import icons from '@src/assets/icons';

import styles from './ToastMessage.module.scss';
import './ToastMessageGlobal.scss';

export const CloseButton = ({ closeToast }: { closeToast: () => void }) => (
  <icons.Close
    className={styles['toast-message__close-icon']}
    onClick={closeToast}
  />
);

const cn = classNames.bind(styles);

type ToastMessageProps = ToastContentProps<{
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
}>;

const ToastMessage = ({ data }: ToastMessageProps) => {
  const { message = 'Something went wrong', type = 'warning' } = data || {};
  return (
    <div className={cn('toast-message__container', `toast-message__${type}`)}>
      {type === 'success' ? (
        <icons.Success className={cn('toast-message__icon')} />
      ) : (
        <icons.Note className={cn('toast-message__icon')} />
      )}

      <p className={cn('toast-message__message')}>{message}</p>
    </div>
  );
};

export default ToastMessage;
