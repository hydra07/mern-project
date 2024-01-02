import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import App from './App.tsx';
import './index.css';
import { persistor, store } from './store';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Theme>
        <App />
      </Theme>
    </PersistGate>
  </Provider>,
);
