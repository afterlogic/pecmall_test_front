import {
  forwardRef,
  InputHTMLAttributes,
  useEffect,
  useId,
  useRef,
  useState,
  useDeferredValue,
  useMemo,
} from 'react';
import classNames from 'classnames/bind';
import icons from '@src/assets/icons';

import style from './Input.module.scss';

const cn = classNames.bind(style);

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClass?: string;
  isFullWidth?: boolean;
  options?: { value: string; label?: string }[];
  hasOptionsFilter?: boolean;
  onSelected?: (value: string) => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      isFullWidth = false,
      type = 'text',
      containerClass,
      options,
      hasOptionsFilter,
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
    const dropdownRef = useRef<HTMLDivElement | null>(null);

    const [optionFilterValue, setOptionFilterValue] = useState('');
    const deferredOptions = useDeferredValue(optionFilterValue);

    const filteredOptions = useMemo(() => {
      if (!hasOptionsFilter) return options;
      return options?.filter((option) =>
        option.value.toLowerCase().includes(deferredOptions.toLowerCase()),
      );
    }, [hasOptionsFilter, options, deferredOptions]);

    const mergedRef = (node: HTMLInputElement | null) => {
      localRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
      }
    };

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setDropdownOpen(false);
        }
      };

      if (isDropdownOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }

      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isDropdownOpen]);

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
            <div className={cn('input__options-wrapper')} ref={dropdownRef}>
              <input
                id={id}
                ref={mergedRef} // Используем объединённый ref
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
                  <li className={cn('input__dropdown-filter-container')}>
                    {hasOptionsFilter && (
                      <input
                        type="text"
                        className={cn('input__dropdown-filter')}
                        placeholder="Регион, город, населенный пункт"
                        value={optionFilterValue}
                        onChange={(e) => setOptionFilterValue(e.target.value)}
                      />
                    )}
                    <span className={cn('input__dropdown-filter-icon')}>
                      <icons.Magnifier />
                    </span>
                  </li>
                  {filteredOptions.map((option) => (
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
                ref={mergedRef} // Используем объединённый ref
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
                  {showPassword ? <icons.Eye /> : <icons.EyeOff />}
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

export default Input;
