import { useMemo, useState } from 'react';
import {
  useForm,
  Controller,
  FieldErrors,
  ControllerRenderProps,
} from 'react-hook-form';
import classnames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import Button from '@src/shared/ui/Button';
import ToggleInput from '@src/shared/ui/ToggleInput';
import Input from '@src/shared/ui/Input';
import Divider from '@src/shared/ui/Divider';
import Logo from '@src/assets/images/pecmall-testovoe.svg';
import icons from '@src/assets/icons';

import styles from './SignUp.module.scss';
import { mockRegions } from './mock-regions';

const cn = classnames.bind(styles);

interface FormValues {
  email?: string;
  userName?: string;
  surname?: string;
  fatherName?: string;
  phone?: string;
  region?: string;
  isAcceptLicense?: boolean;
  isAcceptTerms?: boolean;
}

const validationRules = {
  email: (values: FormValues, errors: FieldErrors<FormValues>) =>
    !!values.email && !errors.email,
  userName: (values: FormValues, errors: FieldErrors<FormValues>) =>
    !!values.userName && !errors.userName,
  surname: (values: FormValues, errors: FieldErrors<FormValues>) =>
    !!values.surname && !errors.surname,
  fatherName: (values: FormValues, errors: FieldErrors<FormValues>) =>
    !!values.fatherName && !errors.fatherName,
  phone: (values: FormValues, errors: FieldErrors<FormValues>) =>
    !!values.phone && !errors.phone,
  region: (values: FormValues, errors: FieldErrors<FormValues>) =>
    !!values.region && !errors.region,
  isAcceptLicense: (values: FormValues, errors: FieldErrors<FormValues>) =>
    !!values.isAcceptLicense && !errors.isAcceptLicense,
  isAcceptTerms: (values: FormValues, errors: FieldErrors<FormValues>) =>
    !!values.isAcceptTerms && !errors.isAcceptTerms,
};

const SignUp = () => {
  const {
    handleSubmit,
    control,
    watch,
    // setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      userName: '',
      surname: '',
      fatherName: '',
      phone: '',
      region: '',
      isAcceptLicense: false,
      isAcceptTerms: false,
    },
  });

  const [isAcceptLicense, setAcceptLicense] = useState(false);
  const [isAcceptTerms, setAcceptTerms] = useState(false);
  const [region, setRegion] = useState('');

  const handleEmailChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FormValues, 'email'>,
  ) => {
    field.onChange(e.target.value.replace(/\s+/g, ''));
    clearErrors('email');
  };

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FormValues, 'userName'>,
  ) => {
    field.onChange(e.target.value.replace(/\s+/g, ''));
    clearErrors('userName');
  };

  const handleSurnameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FormValues, 'surname'>,
  ) => {
    field.onChange(e.target.value.replace(/\s+/g, ''));
    clearErrors('surname');
  };

  const handleFatherNameChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FormValues, 'fatherName'>,
  ) => {
    field.onChange(e.target.value.replace(/\s+/g, ''));
    clearErrors('fatherName');
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<FormValues, 'phone'>,
  ) => {
    field.onChange(e.target.value.replace(/\s+/g, ''));
    clearErrors('phone');
  };

  const handleAcceptTermsChange = () => {
    setAcceptTerms((prev) => !prev);
  };

  const handleAcceptLicenseChange = () => {
    setAcceptLicense((prev) => !prev);
  };

  const [userType, setUserType] = useState<'individual' | 'company'>(
    'individual',
  );

  const handleUserTypeChange = (userType: 'individual' | 'company') => {
    setUserType(userType);
  };

  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/');
  };

  const onSubmit = (values: FormValues) => {
    console.info('Submitting:', values);
  };

  const values = watch();

  const isSubmitEnabled = useMemo(() => {
    const isEmailValid = validationRules.email(values, errors);
    const isUserNameValid = validationRules.userName(values, errors);
    const isSurnameValid = validationRules.surname(values, errors);
    const isFatherNameValid = validationRules.fatherName(values, errors);
    const isPhoneValid = validationRules.phone(values, errors);
    const isRegionValid = validationRules.region(values, errors);
    const isAcceptLicenseValid = validationRules.isAcceptLicense(
      values,
      errors,
    );
    const isAcceptTermsValid = validationRules.isAcceptTerms(values, errors);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^(\+7|8)[0-9]{10}$/;

    return (
      isEmailValid &&
      isUserNameValid &&
      isSurnameValid &&
      isFatherNameValid &&
      isPhoneValid &&
      isRegionValid &&
      isAcceptLicenseValid &&
      isAcceptTermsValid &&
      emailPattern.test(values.email) &&
      phonePattern.test(values.phone)
    );
  }, [values, errors]);

  return (
    <div className={cn('sign-up')}>
      <div className={cn('sign-up__content-wrapper')}>
        <div className={cn('sign-up__logo')}>
          <img
            src={Logo}
            className={cn('sign-up__logo-image')}
            alt="pecmall-logo"
          />
        </div>

        <Divider orientation="horizontal" />

        <span className={cn('sign-up__title')}>Регистрация</span>
        <div className={cn('sign-up__user-info-container')}>
          <span className={cn('sign-up__description')}>Тип регистрации</span>
          <div className={cn('sign-up__user-type-wrapper')}>
            <div className={cn('sign-up__toggle-wrapper')}>
              <ToggleInput
                checked={userType === 'individual'}
                variant="radio"
                name="userType"
                value="individual"
                onChange={() => handleUserTypeChange('individual')}
                containerClass={cn('sign-in__toggle-container')}
              />

              <p>Физическое лицо</p>
            </div>
            <div className={cn('sign-up__toggle-wrapper')}>
              <ToggleInput
                checked={userType === 'company'}
                variant="radio"
                name="userType"
                value="company"
                onChange={() => handleUserTypeChange('company')}
              />

              <p>Юридическое лицо</p>
            </div>
          </div>
        </div>

        <form className={cn('sign-up__form')}>
          <div className={cn('sign-up__input-wrapper')}>
            <div className={cn('sign-up__input-wrapper_columns')}>
              <span className={cn('sign-up__description')}>Личные данные</span>
              <Controller
                name="userName"
                control={control}
                rules={{ required: 'Обязательное поле' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Имя"
                    containerClass={cn('sign-up__input-container')}
                    type="text"
                    error={errors.userName?.message}
                    onChange={(e) => handleNameChange(e, field)}
                    isFullWidth
                  />
                )}
              />

              <Controller
                name="surname"
                control={control}
                rules={{ required: 'Обязательное поле' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    containerClass={cn('sign-up__input-container')}
                    type="text"
                    error={errors.userName?.message}
                    isFullWidth
                    placeholder="Фамилия"
                    onChange={(e) => handleSurnameChange(e, field)}
                  />
                )}
              />

              <Controller
                name="fatherName"
                control={control}
                rules={{ required: 'Обязательное поле' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    containerClass={cn('sign-up__input-container')}
                    type="text"
                    error={errors.userName?.message}
                    onChange={(e) => handleFatherNameChange(e, field)}
                    isFullWidth
                    placeholder="Отчество"
                  />
                )}
              />
            </div>
            <div className={cn('sign-up__input-wrapper_columns')}>
              <span className={cn('sign-up__description')}>
                Контактные данные
              </span>

              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'required',
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
                name="phone"
                control={control}
                rules={{
                  required: 'required',
                  pattern: {
                    value: /^(\+7|8)[0-9]{10}$/,
                    message: 'Введите корректный телефон',
                  },
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="tel"
                    placeholder="Номер телефона"
                    containerClass={cn('sign-in__input-container')}
                    onChange={(e) => handlePhoneChange(e, field)}
                    error={errors.email?.message}
                    isFullWidth
                  />
                )}
              />
            </div>
          </div>

          <div
            className={cn(
              'sign-up__input-wrapper_columns',
              'sign-up__options-container',
            )}
          >
            <span className={cn('sign-up__description')}>Дополнительно</span>
            <Input
              placeholder="Выберите регион"
              type="text"
              options={mockRegions}
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              hasOptionsFilter
            />
          </div>

          <Divider orientation="horizontal" />

          <div className={cn('sign-up__toggle-wrapper')}>
            <ToggleInput
              checked={isAcceptLicense}
              variant="checkbox"
              onChange={handleAcceptLicenseChange}
            />
            <div className={cn('sign-up__license-text')}>
              <a className={cn('sign-up__license-text_link')}>C Условиями</a>
              <span>предоставления услуг ознакомлен и согласен</span>
            </div>
          </div>

          <div className={cn('sign-up__toggle-wrapper')}>
            <ToggleInput
              checked={isAcceptTerms}
              variant="checkbox"
              onChange={handleAcceptTermsChange}
            />
            <div className={cn('sign-up__license-text')}>
              <span>
                Согласен на обработку персональных данных и принимаю условия
              </span>
              <a className={cn('sign-up__license-text_link')}>соглашения</a>
            </div>
          </div>

          <div className={cn('sign-up__actions-wrapper')}>
            <Button
              text="Зарегистрирвоаться"
              variant="primary"
              customClass={cn('sign-up__signup-button')}
              leftIcon={<icons.Login className={cn('sign-up__signup-icon')} />}
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={!isSubmitEnabled}
            />
          </div>
        </form>
      </div>

      <div className={cn('sign-up__bottom-text')}>
        <span>Уже есть аккаунт?</span>
        <a className={cn('sign-up__bottom-text_link')} onClick={handleSignIn}>
          Войти
        </a>
      </div>
    </div>
  );
};

export default SignUp;
