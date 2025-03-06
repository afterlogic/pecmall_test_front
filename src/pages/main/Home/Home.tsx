import classnames from 'classnames/bind';
import Button from '@src/shared/ui/Button';
import { useAppSelector } from '@src/store/store';
import helper from '@src/shared/utils/helpers';

import styles from './Home.module.scss';

const cn = classnames.bind(styles);

const Home = () => {
  const { user } = useAppSelector((state) => state.main);

  const handleLogout = () => {
    helper.logOut();
  };

  console.info('user', user);

  return (
    <div className={cn('home')}>
      <div className={cn('home__user-info')}>{user?.email}</div>
      <div className={cn('home__button-wrapper')}>
        <Button
          text="Выйти"
          variant="primary"
          isFullWidth
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Home;
