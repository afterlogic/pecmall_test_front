import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';

import style from './Button.module.scss';

const cn = classNames.bind(style);
type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  text: string;
  variant: 'primary' | 'secondary';
  size?: 'l' | 'm';
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode | string;
  rightIcon?: ReactNode | string;
  isFullWidth?: boolean;
  customClass?: string;
};

const Button = ({
  text,
  variant = 'primary',
  loading = false,
  disabled = false,
  size = 'm',
  leftIcon,
  rightIcon,
  isFullWidth = false,
  customClass,
  ...props
}: ButtonProps) => {
  const buttonLeftIcon =
    typeof leftIcon === 'string' ? <img src={leftIcon} alt="" /> : leftIcon;
  const buttonRightIcon =
    typeof rightIcon === 'string' ? <img src={rightIcon} alt="" /> : rightIcon;

  return (
    <button
      className={`${cn('Button', `Button_${variant}`, `Button_size-${size}`, {
        Button_loading: loading,
        Button_disabled: disabled,
        'Button_full-width': isFullWidth,
      })} ${customClass || ''}`}
      disabled={loading || disabled}
      {...props}
    >
      {buttonLeftIcon || null}
      {loading && (
        <div className={cn('Button__loader-wrapper')}>
          <div
            className={cn(
              'Button__loader-dot',
              `Button__loader-dot_${variant}`,
            )}
          />
          <div
            className={cn(
              'Button__loader-dot',
              `Button__loader-dot_${variant}`,
            )}
          />
          <div
            className={cn(
              'Button__loader-dot',
              `Button__loader-dot_${variant}`,
            )}
          />
        </div>
      )}
      <span className={cn(`Button__text_disable: ${loading}`)}>{text}</span>
      {buttonRightIcon || null}
    </button>
  );
};

export default Button;
