import { useState } from 'react';
import classnames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import Button from '@src/shared/ui/Button';
import icons from '@src/assets/icons';
import { ToggleInput } from '@src/shared/ui/ToggleInput';
import { Input } from '@src/shared/ui/Input';
import Logo from '@src/assets/images/pecmall-testovoe.svg';
import Divider from '@src/shared/ui/Divider';

import styles from './SignUp.module.scss';

const cn = classnames.bind(styles);

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [isAcceptLicense, setAcceptLicense] = useState(false);
  const [isAcceptTerms, setAcceptTerms] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.info('Submitting:', {
      email,
      name,
      surname,
      fatherName,
      telephone,
      isAcceptLicense,
      isAcceptTerms,
      userType,
    });
  };

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

        <form onSubmit={handleSubmit} className={cn('sign-up__form')}>
          <div className={cn('sign-up__input-wrapper')}>
            <div className={cn('sign-up__input-wrapper_columns')}>
              <span className={cn('sign-up__description')}>Личные данные</span>
              <Input
                placeholder="Имя"
                containerClass={cn('sign-up__input-container')}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                isFullWidth
              />
              <Input
                placeholder="Фамилия"
                containerClass={cn('sign-up__input-container')}
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                isFullWidth
              />
              <Input
                placeholder="Отчество"
                containerClass={cn('sign-up__input-container')}
                type="text"
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                isFullWidth
              />
            </div>
            <div className={cn('sign-up__input-wrapper_columns')}>
              <span className={cn('sign-up__description')}>
                Контактные данные
              </span>
              <Input
                placeholder="Электоронная почта"
                containerClass={cn('sign-up__input-container')}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isFullWidth
              />
              <Input
                placeholder="Номер телефона"
                containerClass={cn('sign-up__input-container')}
                type="tel"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                isFullWidth
              />
            </div>
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
