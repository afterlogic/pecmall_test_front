import { useState } from 'react';
import classnames from 'classnames/bind';
import Button from '@src/shared/ui/Button';
import icons from '@src/assets/icons';
import { ToggleInput } from '@src/shared/ui/ToggleInput';
import { Input } from '@src/shared/ui/Input';
import Logo from '@src/assets/images/pecmall-testovoe.svg';
import Divider from '@src/shared/ui/Divider';

import styles from './SignIn.module.scss';

const cn = classnames.bind(styles);

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRemember, setRemember] = useState(false);

  const handleRememberChange = () => {
    setRemember((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.info('Submitting:', { email, password, isRemember });
  };

  return (
    <div className={cn('sign-in')}>
      <div className={cn('sign-in__content-wrapper')}>
        <div className={cn('sign-in__logo')}>
          <img
            src={Logo}
            className={cn('sign-in__logo-image')}
            alt="pecmall-logo"
          />
        </div>

        <Divider orientation="horizontal" />

        <span className={cn('sign-in__title')}>Авторизация</span>

        <form onSubmit={handleSubmit} className={cn('sign-in__form')}>
          <Input
            placeholder="Электронная почта"
            containerClass={cn('sign-in__input-container')}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            placeholder="Пароль"
            containerClass={cn('sign-in__input-container')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className={cn('sign-in__remember-wrapper')}>
            <ToggleInput
              checked={isRemember}
              variant="checkbox"
              onChange={handleRememberChange}
            />
            <p>Запомнить меня</p>
          </div>

          <div className={cn('sign-in__actions-wrapper')}>
            <Button
              text="Войти"
              variant="primary"
              customClass={cn('sign-in__login-button')}
              leftIcon={<icons.Login className={cn('sign-in__login-icon')} />}
              type="submit"
            />
            <div className={cn('sign-in__forgot-text')}>
              <span>Забыли пароль?</span>
              <a className={cn('sign-in__forgot-text_link')}>Восстановить</a>
            </div>
          </div>
        </form>
      </div>

      <div className={cn('sign-in__bottom-text')}>
        <span>Нет аккаунта?</span>
        <a className={cn('sign-in__bottom-text_link')}>Зарегистрироваться</a>
      </div>
    </div>
  );
};

export default SignIn;
