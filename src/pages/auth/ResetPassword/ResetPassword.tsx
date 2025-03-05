import { useState } from 'react';
import classnames from 'classnames/bind';
import Button from '@src/shared/ui/Button';
import Input from '@src/shared/ui/Input';
import Divider from '@src/shared/ui/Divider';
import Logo from '@src/assets/images/pecmall-testovoe.svg';
import icons from '@src/assets/icons';

import styles from './ResetPassword.module.scss';

const cn = classnames.bind(styles);

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.info('Submitting:', { email });
  };

  return (
    <div className={cn('reset-password')}>
      <div className={cn('reset-password__content-wrapper')}>
        <div className={cn('reset-password__logo')}>
          <img
            src={Logo}
            className={cn('reset-password__logo-image')}
            alt="pecmall-logo"
          />
        </div>

        <Divider orientation="horizontal" />

        <span className={cn('reset-password__title')}>
          Восстановление пароля
        </span>

        <form onSubmit={handleSubmit} className={cn('reset-password__form')}>
          <Input
            placeholder="Электронная почта"
            containerClass={cn('reset-password__input-container')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button
            text="Восстановить"
            variant="primary"
            customClass={cn('reset-password__login-button')}
            leftIcon={
              <icons.ResetPassword
                className={cn('reset-password__reset-icon')}
              />
            }
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
