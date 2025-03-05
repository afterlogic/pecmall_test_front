import classNames from 'classnames/bind';

import styles from './Divider.module.scss';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'primary' | 'secondary';
  dashed?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const cn = classNames.bind(styles);

const Divider = ({
  orientation = 'horizontal',
  variant = 'primary',
  dashed = false,
  size = 'sm',
}: DividerProps) => {
  return (
    <div
      className={cn('divider', `divider_${orientation}`, `divider_${variant}`, {
        divider_dashed: dashed,
        [`divider_size-${size}`]: size,
      })}
    />
  );
};

export default Divider;
