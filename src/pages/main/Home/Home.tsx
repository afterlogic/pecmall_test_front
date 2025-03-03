import classnames from 'classnames/bind';
import Button from '@src/shared/ui/Button';
import { useAppDispatch, useAppSelector } from '@src/store/store';
import { mainSliceActions } from '@src/store/mainSlice/mainSlice.reducer';

import styles from './Home.module.scss';

const cn = classnames.bind(styles);

const Home = () => {
  const { user } = useAppSelector((state) => state.main);

  const dispatch = useAppDispatch();

  const handleCheckIn = () => {
    dispatch(
      mainSliceActions.setUser({
        id: '1',
        name: 'John Doe',
        email: 'test@gmail.com',
      }),
    );
  };

  console.info('user', user);

  return (
    <div className={cn('home')}>
      <div className={cn('home__content')}></div>

      <div className={cn('home__bottom-content')}>
        <div className={cn('home__button-wrapper')}>
          <Button
            text="login"
            variant="primary"
            isFullWidth
            onClick={handleCheckIn}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
