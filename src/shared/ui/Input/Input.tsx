import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames/bind';
import icons from '@src/assets/icons';

import style from './Input.module.scss';

const cn = classNames.bind(style);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  onSelected?: (value: string) => void;
  label?: string;
  error?: string;
  containerClass?: string;
  isFullWidth?: boolean;
  options?: { value: string; label?: string }[];
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      isFullWidth = false,
      type = 'text',
      containerClass,
      options,
      onSelected,
      ...props
    },
    ref,
  ) => {
    const id = useId();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const localRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      const localInput = document.getElementById(id) as HTMLInputElement;
      if (localInput) {
        localRef.current = localInput;
      }
    }, [id]);

    const handleSelect = (value: string) => {
      setSelectedValue(value);
      setDropdownOpen(false);
      if (onSelected) onSelected(value);
    };

    const toggleDropdown = () => setDropdownOpen((prev) => !prev);

    const toggleIconDropdown = (event: React.MouseEvent) => {
      event.stopPropagation();
      setDropdownOpen((prev) => !prev);
      if (localRef.current) {
        localRef.current.focus();
      }
    };

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    return (
      <div
        className={cn('input__container', {
          'input__container_full-width': isFullWidth,
        })}
      >
        {label && (
          <label className={cn('input__label')} htmlFor={id}>
            {label}
          </label>
        )}
        <div
          className={cn('input__wrapper', {
            'input__wrapper_full-width': isFullWidth,
          })}
        >
          {options ? (
            <div className={cn('input__options-wrapper')}>
              <input
                id={id}
                ref={ref}
                type={type}
                className={cn('input__field', 'input__dropdown', {
                  input__field_error: !!error,
                })}
                {...props}
                onClick={toggleDropdown}
                value={selectedValue}
              />
              <icons.ArrowDown
                className={cn('input__dropdown-icon')}
                onClick={toggleIconDropdown}
              />
              {isDropdownOpen && (
                <ul className={cn('input__dropdown-list')}>
                  {options.map((option) => (
                    <li
                      key={option.value}
                      className={cn('input__dropdown-item')}
                      onClick={() => handleSelect(option.value)}
                    >
                      {option.value}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className={cn('input__content-wrapper')}>
              <input
                id={id}
                ref={ref}
                type={
                  type === 'password'
                    ? showPassword
                      ? 'text'
                      : 'password'
                    : type
                }
                className={`${cn('input__field', {
                  input__field_error: !!error,
                })} ${containerClass || ''}`}
                {...props}
              />
              {type === 'password' && (
                <button
                  type="button"
                  className={cn('input__password-toggle')}
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <icons.EyeOff /> : <icons.Eye />}
                </button>
              )}
            </div>
          )}
        </div>
        {error && <span className={cn('input__error-message')}>{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
