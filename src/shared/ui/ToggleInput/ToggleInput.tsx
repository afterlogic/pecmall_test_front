import React, { useRef } from 'react';
import classNames from 'classnames/bind';
import icons from '@src/assets/icons';

import styles from './ToggleInput.module.scss';

const cn = classNames.bind(styles);

interface ToggleInputProps {
  checked?: boolean;
  disabled?: boolean;
  variant?: 'checkbox' | 'radio';
  name?: string;
  value?: string;
  containerClass?: string;
  onChange?: (value: boolean | string) => void;
}

const ToggleInput: React.FC<ToggleInputProps> = ({
  checked = false,
  disabled = false,
  variant = 'checkbox',
  name,
  value,
  containerClass,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const isRadio = variant === 'radio';

  return (
    <label
      className={`${cn('toggle', `toggle__${variant}`)} ${containerClass || ''}`}
    >
      <input
        ref={inputRef}
        type={isRadio ? 'radio' : 'checkbox'}
        className={cn('toggle__input')}
        checked={checked}
        disabled={disabled}
        name={name}
        value={value}
        onChange={(e) =>
          onChange && onChange(isRadio ? e.target.value : e.target.checked)
        }
      />
      <span
        className={cn('toggle__wrapper', `toggle__wrapper-${variant}`, {
          'toggle__wrapper-disabled': disabled,
          'toggle__wrapper-radio_checked': isRadio && checked,
        })}
      >
        {checked &&
          (isRadio ? (
            <div className={cn('toggle__radio-point')} />
          ) : (
            <icons.Checked className={cn('toggle__icon')} />
          ))}
      </span>
    </label>
  );
};

export default ToggleInput;
