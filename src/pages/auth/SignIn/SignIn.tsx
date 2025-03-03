import classnames from 'classnames/bind';
import Button from '@src/shared/ui/Button';
import Loader from '@src/shared/ui/Loader/Loader';

import styles from './SignIn.module.scss';

const cn = classnames.bind(styles);

const SignIn = () => {
  return (
    <div className={cn('sign-in')}>
      <div className={cn('sign-in__title')}>login</div>

      <Button
        text="Login"
        variant="primary"
        customClass={cn('sign-in__login-button')}
      />
      <Loader />
    </div>
  );
};

export default SignIn;
