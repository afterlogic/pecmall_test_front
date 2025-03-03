import React from 'react';
import classNames from 'classnames/bind';

import style from './Spinner.module.scss';

const cn = classNames.bind(style);

const Spinner: React.FC = () => {
  return (
    <div className={cn('spinner-container')}>
      <div className={cn('spinner')} />
    </div>
  );
};

export default Spinner;
