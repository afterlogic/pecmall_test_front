import { useMemo, useState } from 'react';
import {
  useForm,
  Controller,
  FieldErrors,
  ControllerRenderProps,
} from 'react-hook-form';
import classnames from 'classnames/bind';
import Button from '@src/shared/ui/Button';
import Input from '@src/shared/ui/Input';
import Divider from '@src/shared/ui/Divider';
import Logo from '@src/assets/images/pecmall-testovoe.svg';
import icons from '@src/assets/icons';
import authApi from '@src/app/api/authApi';
import { checkError } from '@src/shared/utils/checkError';
import { notify } from '@src/shared/utils/toast';
import { useNavigate } from 'react-router-dom';

import styles from './ResetPassword.module.scss';

const cn = classnames.bind(styles);

interface FormValues {
  email?: string;
}

const validationRules = {
  email: (values: FormValues, errors: FieldErrors<FormValues>) =>
    !!values.email && !errors.email,
};

const ResetPassword = () => {
  const {
    handleSubmit,
    control,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FormValues, 'email'>,
  ) => {
    field.onChange(e.target.value.replace(/\s+/g, ''));
    clearErrors('email');
  };

  const onSubmit = async (values: FormValues) => {
    console.info('Submitting:', values);
    try {
      setLoading(true);
      await authApi.resetPassword({
        email: values.email,
      });

      notify(
        'Проверьте почту для восстановления доступа к вашему аккаунту.',
        'success',
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const isBadGatewayError = checkError.isBadGatewayError(error);
      if (isBadGatewayError) {
        notify(error.message, 'error');
      } else {
        notify(error.message, 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = () => {
    navigate('/');
  };

  const values = watch();

  const isSubmitEnabled = useMemo(() => {
    const isEmailValid = validationRules.email(values, errors);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return isEmailValid && emailPattern.test(values.email);
  }, [values, errors]);

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

        <form className={cn('reset-password__form')}>
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
            disabled={!isSubmitEnabled}
            onClick={handleSubmit(onSubmit)}
            loading={loading}
          />
        </form>
      </div>

      <div className={cn('reset-password__bottom-text')}>
        <a
          className={cn('reset-password__bottom-text_link')}
          onClick={handleSignIn}
        >
          Войти
        </a>
      </div>
    </div>
  );
};

export default ResetPassword;
