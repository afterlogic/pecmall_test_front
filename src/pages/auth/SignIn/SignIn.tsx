import { useMemo, useState } from 'react';
import {
  useForm,
  SubmitHandler,
  Controller,
  FieldErrors,
  ControllerRenderProps,
} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames/bind';
import Button from '@src/shared/ui/Button';
import Input from '@src/shared/ui/Input';
import Divider from '@src/shared/ui/Divider';
import Logo from '@src/assets/images/pecmall-testovoe.svg';
import icons from '@src/assets/icons';
import auth from '@src/app/api/authApi';
import { notify } from '@src/shared/utils/toast';
import { checkError } from '@src/shared/utils/checkError';
import { useAppDispatch } from '@src/store/store';
import { mainSliceActions } from '@src/store/mainSlice/mainSlice.reducer';

import styles from './SignIn.module.scss';

const cn = classnames.bind(styles);

interface FormValues {
  email?: string;
  password?: string;
}

const validationRules = {
  email: (values: FormValues, errors: FieldErrors<FormValues>) =>
    !!values.email && !errors.email,
  password: (values: FormValues, errors: FieldErrors<FormValues>) =>
    !!values.password && !errors.password,
};

const SignIn = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    control,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const values = watch();

  const isSubmitEnabled = useMemo(() => {
    const isEmailValid = validationRules.email(values, errors);
    const isPasswordValid = validationRules.password(values, errors);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return isEmailValid && isPasswordValid && emailPattern.test(values.email);
  }, [values, errors]);

  const [loading, setLoading] = useState(false);

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FormValues, 'password'>,
  ) => {
    const value = e.target.value;
    field.onChange(value.replace(/\s+/g, ''));
    clearErrors('email');
    clearErrors('password');
  };

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FormValues, 'email'>,
  ) => {
    const value = e.target.value;
    field.onChange(value.replace(/\s+/g, ''));
    clearErrors('email');
    clearErrors('password');
  };

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    console.info('Submitting:', values);
    setLoading(true);
    try {
      await auth.login({
        email: values.email,
        password: values.password,
      });

      dispatch(
        mainSliceActions.setUser({
          email: values.email,
        }),
      );

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const isBadGatewayError = checkError.isBadGatewayError(error);
      if (isBadGatewayError) {
        notify(error.message, 'error');
      } else {
        setError('email', { message: 'Неверные данные' });
        setError('password', { message: 'Неверные данные' });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate('/sign-up');
  };

  const handleResetPassword = () => {
    navigate('/reset-password');
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

        <form className={cn('sign-in__form')}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email обязателен',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Введите корректный email',
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="email"
                placeholder="Электронная почта"
                containerClass={cn('sign-in__input-container')}
                autoComplete="username"
                onChange={(e) => handleEmailChange(e, field)}
                error={errors.email?.message}
                isFullWidth
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            rules={{ required: 'Пароль обязателен' }}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Пароль"
                type="password"
                containerClass={cn('sign-in__input-container')}
                autoComplete="current-password"
                error={errors.password?.message}
                onChange={(e) => handlePasswordChange(e, field)}
                isFullWidth
              />
            )}
          />

          <div className={cn('sign-in__actions-wrapper')}>
            <Button
              text="Войти"
              variant="primary"
              customClass={cn('sign-in__login-button')}
              leftIcon={<icons.Login className={cn('sign-in__login-icon')} />}
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={!isSubmitEnabled}
              loading={loading}
            />
            <div className={cn('sign-in__forgot-text')}>
              <span>Забыли пароль?</span>
              <a
                className={cn('sign-in__forgot-text_link')}
                onClick={handleResetPassword}
              >
                Восстановить
              </a>
            </div>
          </div>
        </form>
      </div>

      <div className={cn('sign-in__bottom-text')}>
        <span>Нет аккаунта?</span>
        <a className={cn('sign-in__bottom-text_link')} onClick={handleSignUp}>
          Зарегистрироваться
        </a>
      </div>
    </div>
  );
};

export default SignIn;
