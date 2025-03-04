import classnames from 'classnames/bind';
import Button from '@src/shared/ui/Button';
import Loader from '@src/shared/ui/Loader/Loader';
import icons from '@src/assets/icons';
import { ToggleInput } from '@src/shared/ui/ToggleInput';
import { useState } from 'react';

import styles from './SignIn.module.scss';

const cn = classnames.bind(styles);

const SignIn = () => {
  const [userType, setUserType] = useState<'individual' | 'company'>(
    'individual',
  );

  const handleUserTypeChange = (userType: 'individual' | 'company') => {
    setUserType(userType);
  };
  return (
    <div className={cn('sign-in')}>
      <div className={cn('sign-in__title')}>Авторизация</div>

      <Button
        text="Войти"
        variant="primary"
        customClass={cn('sign-in__login-button')}
        leftIcon={<icons.Login className={cn('sign-in__login-icon')} />}
      />
      <Loader inline />

      <ToggleInput
        checked={userType === 'individual'}
        variant="radio"
        name="userType"
        value="individual"
        onChange={() => handleUserTypeChange('individual')}
        containerClass={cn('sign-in__toggle-container')}
      />

      <ToggleInput
        checked={userType === 'company'}
        variant="radio"
        name="userType"
        value="company"
        onChange={() => handleUserTypeChange('company')}
      />
    </div>
  );
};

export default SignIn;
