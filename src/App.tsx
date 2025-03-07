import './App.scss';

import { BrowserRouter } from 'react-router-dom';

import Router from './app/routes/Router';

function App() {
  return (
    <BrowserRouter
      future={{
        v7_relativeSplatPath: true,
        v7_startTransition: true,
      }}
    >
      <Router />
    </BrowserRouter>
  );
}

export default App;
