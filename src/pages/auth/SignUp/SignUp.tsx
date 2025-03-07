import { useMemo, useState } from 'react';
import { useForm, Controller, FieldErrors } from 'react-hook-form';
import classnames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import InputMask from 'react-input-mask';
import Button from '@src/shared/ui/Button';
import ToggleInput from '@src/shared/ui/ToggleInput';
import Input from '@src/shared/ui/Input';
import Divider from '@src/shared/ui/Divider';
import Logo from '@src/assets/images/pecmall-testovoe.svg';
import icons from '@src/assets/icons';
import authApi from '@src/app/api/authApi';
import { checkError } from '@src/shared/utils/checkError';
import { notify } from '@src/shared/utils/toast';

import { mockRegions } from './mock-regions';
import styles from './SignUp.module.scss';

const cn = classnames.bind(styles);

interface FormValues {
  email?: string;
  firstName?: string;
  lastName?: string;
  patronimicName?: string;
  phone?: string;
  region?: string;
  isAcceptLicense?: boolean;
  isAcceptTerms?: boolean;
  companyData?: {
    companyName: string;
    inn: string;
    kpp: string;
    bank: string;
    bankCity: string;
    bik: string;
    account: string;
    corrAccount: string;
    ogrn: string;
    okpo: string;
  };
  legalAddress?: {
    postalCode: string;
    country: string;
    region: string;
    city: string;
    street: string;
    houseNumber: string;
    building: string;
    apartment: string;
  };
}

const validationRules = {
  email: (values: FormValues, errors: FieldErrors<FormValues>) =>
    !!values.email && !errors.email,
  firstName: (values: FormValues, errors: FieldErrors<FormValues>) =>
    !!values.firstName && !errors.firstName,
  lastName: (values: FormValues, errors: FieldErrors<FormValues>) =>
    !!values.lastName && !errors.lastName,
  patronimicName: (values: FormValues, errors: FieldErrors<FormValues>) =>
    !!values.patronimicName && !errors.patronimicName,
  phone: (values: FormValues, errors: FieldErrors<FormValues>) =>
    !!values.phone && !errors.phone,
};

const SignUp = () => {
  const {
    handleSubmit,
    control,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      patronimicName: '',
      phone: '',
      companyData: {
        companyName: '',
        inn: '',
        kpp: '',
        bank: '',
        bankCity: '',
        bik: '',
        account: '',
        corrAccount: '',
        ogrn: '',
        okpo: '',
      },
      legalAddress: {
        postalCode: '',
        country: '',
        region: '',
        city: '',
        street: '',
        houseNumber: '',
        building: '',
        apartment: '',
      },
    },
  });

  const [userType, setUserType] = useState(false);
  const [isAcceptLicense, setAcceptLicense] = useState(false);
  const [isAcceptTerms, setAcceptTerms] = useState(false);
  const [region, setRegion] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (field: any, e: React.ChangeEvent<HTMLInputElement>) => {
    field.onChange(e.target.value.trim());
    clearErrors(field.name);
  };

  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/');
  };

  const normalizePhone = (phone: string) => phone.replace(/\D/g, '');

  const onSubmit = async (values: FormValues) => {
    console.info('Submitting:', values, {
      region,
      userType,
      isAcceptLicense,
      isAcceptTerms,
    });
    try {
      const payload = {
        userType,
        region,
        email: values.email,
        firstName: values.firstName,
        lastName: values.lastName,
        patronimicName: values.patronimicName,
        phone: normalizePhone(values.phone),
        ...(userType !== false && {
          companyData: values.companyData,
          legalAddress: values.legalAddress,
        }),
      };

      await authApi.signUp(payload);
      notify('Регистрация прошла успешно', 'success');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const isBadGatewayError = checkError.isBadGatewayError(error);
      if (isBadGatewayError) {
        notify('Connection error', 'error');
      } else {
        if (checkError.isUserExist(error)) {
          notify('Пользователь с таким email уже существует', 'error');
        } else {
          notify(error.message, 'error');
        }
      }
    }
  };

  const values = watch();

  const isSubmitEnabled = useMemo(() => {
    const isEmailValid = validationRules.email(values, errors);
    const isUserNameValid = validationRules.firstName(values, errors);
    const isSurnameValid = validationRules.lastName(values, errors);
    const isFatherNameValid = validationRules.patronimicName(values, errors);
    const isPhoneValid = validationRules.phone(values, errors);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[78][0-9]{10}$/;

    const needExtendData =
      userType === true
        ? values.companyData.companyName &&
          values.companyData.inn &&
          values.companyData.kpp &&
          values.companyData.bank &&
          values.companyData.bankCity &&
          values.companyData.bik &&
          values.companyData.account &&
          values.companyData.corrAccount &&
          values.companyData.ogrn &&
          values.companyData.okpo &&
          values.legalAddress.postalCode &&
          values.legalAddress.country &&
          values.legalAddress.region &&
          values.legalAddress.city &&
          values.legalAddress.street &&
          values.legalAddress.houseNumber &&
          values.legalAddress.building &&
          values.legalAddress.apartment
        : true;

    return (
      isEmailValid &&
      isUserNameValid &&
      isSurnameValid &&
      isFatherNameValid &&
      isPhoneValid &&
      isAcceptLicense &&
      isAcceptTerms &&
      emailPattern.test(values.email) &&
      phonePattern.test(normalizePhone(values.phone)) &&
      needExtendData
    );
  }, [values, errors, userType, isAcceptLicense, isAcceptTerms]);

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
                containerClass={cn('sign-in__toggle-container')}
                variant="checkbox"
                checked={userType === false}
                onChange={() => setUserType(false)}
              />
              <p>Физическое лицо</p>
            </div>
            <div className={cn('sign-up__toggle-wrapper')}>
              <ToggleInput
                containerClass={cn('sign-in__toggle-container')}
                variant="checkbox"
                checked={userType === true}
                onChange={() => setUserType(true)}
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
                name="firstName"
                control={control}
                rules={{ required: 'Обязательное поле' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Имя"
                    containerClass={cn('sign-up__input-container')}
                    type="text"
                    error={errors.firstName?.message}
                    onChange={(e) => handleChange(field, e)}
                    isFullWidth
                  />
                )}
              />

              <Controller
                name="lastName"
                control={control}
                rules={{ required: 'Обязательное поле' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    containerClass={cn('sign-up__input-container')}
                    type="text"
                    error={errors.firstName?.message}
                    isFullWidth
                    placeholder="Фамилия"
                    onChange={(e) => handleChange(field, e)}
                  />
                )}
              />

              <Controller
                name="patronimicName"
                control={control}
                rules={{ required: 'Обязательное поле' }}
                render={({ field }) => (
                  <Input
                    {...field}
                    containerClass={cn('sign-up__input-container')}
                    type="text"
                    error={errors.firstName?.message}
                    onChange={(e) => handleChange(field, e)}
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
                    autoComplete="firstName"
                    onChange={(e) => handleChange(field, e)}
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
                  validate: (value) => {
                    const rawValue = normalizePhone(value);
                    return (
                      /^[78][0-9]{10}$/.test(rawValue) ||
                      'Введите корректный телефон'
                    );
                  },
                }}
                render={({ field }) => (
                  <InputMask
                    mask="+7 (999) 999-99-99"
                    {...field}
                    onChange={(e) => {
                      const rawValue = normalizePhone(e.target.value);
                      field.onChange(rawValue);
                    }}
                  >
                    {(inputProps) => (
                      <Input
                        {...inputProps}
                        type="tel"
                        placeholder="Номер телефона"
                        containerClass={cn('sign-in__input-container')}
                        error={errors.email?.message}
                        isFullWidth
                      />
                    )}
                  </InputMask>
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
              onSelected={setRegion}
              onChange={(e) => setRegion(e.target.value)}
              hasOptionsFilter
            />
          </div>
          <div className={cn('sign-up__input-wrapper')}>
            {userType === true && (
              <div className={cn('sign-up__input-wrapper_columns')}>
                <span className={cn('sign-up__description')}>
                  Данные о компании
                </span>
                <Controller
                  name="companyData.companyName"
                  control={control}
                  rules={{ required: 'Обязательное поле' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      containerClass={cn('sign-up__input-container')}
                      type="text"
                      isFullWidth
                      placeholder="Название компании"
                    />
                  )}
                />
                <Controller
                  name="companyData.account"
                  control={control}
                  rules={{ required: 'Обязательное поле' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      containerClass={cn('sign-up__input-container')}
                      type="text"
                      isFullWidth
                      placeholder="Номер счета"
                    />
                  )}
                />
                <Controller
                  name="companyData.bank"
                  control={control}
                  rules={{ required: 'Обязательное поле' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      containerClass={cn('sign-up__input-container')}
                      type="text"
                      isFullWidth
                      placeholder="Название банка"
                    />
                  )}
                />
                <Controller
                  name="companyData.bankCity"
                  control={control}
                  rules={{ required: 'Обязательное поле' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      containerClass={cn('sign-up__input-container')}
                      type="text"
                      isFullWidth
                      placeholder="Город банка"
                    />
                  )}
                />
                <Controller
                  name="companyData.bik"
                  control={control}
                  rules={{ required: 'Обязательное поле' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      containerClass={cn('sign-up__input-container')}
                      type="text"
                      isFullWidth
                      placeholder="БИК"
                    />
                  )}
                />
                <Controller
                  name="companyData.corrAccount"
                  control={control}
                  rules={{ required: 'Обязательное поле' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      containerClass={cn('sign-up__input-container')}
                      type="text"
                      isFullWidth
                      placeholder="Корреспондентский счет"
                    />
                  )}
                />
                <Controller
                  name="companyData.inn"
                  control={control}
                  rules={{ required: 'Обязательное поле' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      containerClass={cn('sign-up__input-container')}
                      type="text"
                      isFullWidth
                      placeholder="ИНН"
                    />
                  )}
                />
                <Controller
                  name="companyData.kpp"
                  control={control}
                  rules={{ required: 'Обязательное поле' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      containerClass={cn('sign-up__input-container')}
                      type="text"
                      isFullWidth
                      placeholder="КПП"
                    />
                  )}
                />
                <Controller
                  name="companyData.ogrn"
                  control={control}
                  rules={{ required: 'Обязательное поле' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      containerClass={cn('sign-up__input-container')}
                      type="text"
                      isFullWidth
                      placeholder="ОГРН"
                    />
                  )}
                />
                <Controller
                  name="companyData.okpo"
                  control={control}
                  rules={{ required: 'Обязательное поле' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      containerClass={cn('sign-up__input-container')}
                      type="text"
                      isFullWidth
                      placeholder="ОКПО"
                    />
                  )}
                />
              </div>
            )}

            {userType === true && (
              <div className={cn('sign-up__input-wrapper_columns')}>
                <span className={cn('sign-up__description')}>
                  Юридический адрес
                </span>
                <Controller
                  name="legalAddress.apartment"
                  control={control}
                  rules={{ required: 'Обязательное поле' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      containerClass={cn('sign-up__input-container')}
                      type="text"
                      isFullWidth
                      placeholder="Квартира"
                    />
                  )}
                />
                <Controller
                  name="legalAddress.building"
                  control={control}
                  rules={{ required: 'Обязательное поле' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      containerClass={cn('sign-up__input-container')}
                      type="text"
                      isFullWidth
                      placeholder="Строение"
                    />
                  )}
                />
                <Controller
                  name="legalAddress.city"
                  control={control}
                  rules={{ required: 'Обязательное поле' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      containerClass={cn('sign-up__input-container')}
                      type="text"
                      isFullWidth
                      placeholder="Город"
                    />
                  )}
                />
                <Controller
                  name="legalAddress.country"
                  control={control}
                  rules={{ required: 'Обязательное поле' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      containerClass={cn('sign-up__input-container')}
                      type="text"
                      isFullWidth
                      placeholder="Страна"
                    />
                  )}
                />
                <Controller
                  name="legalAddress.houseNumber"
                  control={control}
                  rules={{ required: 'Обязательное поле' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      containerClass={cn('sign-up__input-container')}
                      type="text"
                      isFullWidth
                      placeholder="Дом"
                    />
                  )}
                />
                <Controller
                  name="legalAddress.postalCode"
                  control={control}
                  rules={{ required: 'Обязательное поле' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      containerClass={cn('sign-up__input-container')}
                      type="text"
                      isFullWidth
                      placeholder="Почтовый индекс"
                    />
                  )}
                />
                <Controller
                  name="legalAddress.region"
                  control={control}
                  rules={{ required: 'Обязательное поле' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      containerClass={cn('sign-up__input-container')}
                      type="text"
                      isFullWidth
                      placeholder="Регион"
                    />
                  )}
                />
                <Controller
                  name="legalAddress.street"
                  control={control}
                  rules={{ required: 'Обязательное поле' }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      containerClass={cn('sign-up__input-container')}
                      type="text"
                      isFullWidth
                      placeholder="Улица"
                    />
                  )}
                />
              </div>
            )}
          </div>

          <Divider orientation="horizontal" />

          <div className={cn('sign-up__toggle-wrapper')}>
            <ToggleInput
              checked={isAcceptLicense}
              variant="checkbox"
              onChange={() => setAcceptLicense(!isAcceptLicense)}
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
              onChange={() => setAcceptTerms(!isAcceptTerms)}
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
              text="Зарегистрироваться"
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
