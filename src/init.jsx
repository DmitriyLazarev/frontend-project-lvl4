import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import filter from 'leo-profanity';
import store from './slices/index';
import AuthProvider from './providers/authProvider';
import App from './app';
import ru from './locales/ru';
import ChapProvider from './providers/charProvider';

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
      <ChapProvider>
        <I18nextProvider i18n={i18n}>
          <AuthProvider>
            <App />
          </AuthProvider>
        </I18nextProvider>
      </ChapProvider>
    </StoreProvider>
  );
};
