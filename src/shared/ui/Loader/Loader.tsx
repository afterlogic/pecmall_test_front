import React from 'react';
import classNames from 'classnames/bind';

import styles from './Loader.module.scss';

interface LoaderProps {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

const cn = classNames.bind(styles);

const Loader: React.FC<LoaderProps> = ({
  loading = true,
  variant = 'tertiary',
}) => {
  if (!loading) return null;

  return (
    <div className={cn('Loader__loader-wrapper')}>
      <div
        className={cn('Loader__loader-dot', `Loader__loader-dot_${variant}`)}
      />
      <div
        className={cn('Loader__loader-dot', `Loader__loader-dot_${variant}`)}
      />
      <div
        className={cn('Loader__loader-dot', `Loader__loader-dot_${variant}`)}
      />
    </div>
  );
};

export default Loader;
