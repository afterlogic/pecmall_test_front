import '@src/shared/styles/theme.css';
import '@src/shared/styles/reset.css';

import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import ToastProvider from '@src/app/provider/ToastProvider';
import store from '@src/store';

import App from './App';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
    <ToastProvider />
  </Provider>,
);
