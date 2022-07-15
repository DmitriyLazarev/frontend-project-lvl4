import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import store from './slices/index';
import AuthProvider from './providers/authProvider';
import App from './app';
import ru from './locales/ru';
import ChapProvider from './providers/charProvider';

const rollbarConfig = {
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  payload: {
    environment: 'production',
  },
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export default async () => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({
      lng: 'ru',
      resources: {
        ru,
      },
    });
  filter.clearList();
  filter.add(filter.getDictionary('ru'));
  filter.add(filter.getDictionary('en'));
  return (
    <StoreProvider store={store}>
      <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
          <ChapProvider>
            <I18nextProvider i18n={i18n}>
              <AuthProvider>
                <App />
              </AuthProvider>
            </I18nextProvider>
          </ChapProvider>
        </ErrorBoundary>
      </RollbarProvider>
    </StoreProvider>
  );
};
