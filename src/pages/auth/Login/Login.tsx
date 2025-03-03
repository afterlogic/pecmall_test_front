import classnames from 'classnames/bind';

import styles from './Login.module.scss';

const cn = classnames.bind(styles);
const Login = () => {
  return <div className={cn('login')}>Login</div>;
};

export default Login;
