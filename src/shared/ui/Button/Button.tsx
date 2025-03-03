import React, { ReactNode } from 'react';
import classNames from 'classnames/bind';

import style from './Button.module.scss';

const cn = classNames.bind(style);
type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  text: string;
  variant:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'error'
    | 'success'
    | 'primary-light'
    | 'secondary-filled';
  size?: 'l' | 'm' | 's';
  loading?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode | string;
  rightIcon?: ReactNode | string;
  isFullWidth?: boolean;
  customHeight?: number;
  customFontSize?: 'font-2xs' | 'font-sm' | 'font-md' | 'font-lg';
};

export const Button = ({
  text,
  variant = 'primary',
  loading = false,
  disabled = false,
  size = 'l',
  leftIcon,
  rightIcon,
  isFullWidth = false,
  className,
  customFontSize,
  customHeight,
  ...props
}: ButtonProps) => {
  const buttonLeftIcon =
    typeof leftIcon === 'string' ? <img src={leftIcon} alt="" /> : leftIcon;
  const buttonRightIcon =
    typeof rightIcon === 'string' ? <img src={rightIcon} alt="" /> : rightIcon;

  return (
    <button
      className={cn(
        'Button',
        `Button_${variant}`,
        `Button_size-${size}`,
        {
          Button_loading: loading,
          Button_disabled: disabled,
          'Button_full-width': isFullWidth,
        },
        customFontSize && `Button_${customFontSize}`,
        className,
      )}
      style={{ height: `${customHeight}px` }}
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
