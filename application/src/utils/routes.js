const apiPath = '/api/v1';

export default {
  loginPath: () => [apiPath, 'login'].join('/'),
  registrationPath: () => [apiPath, 'signup'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  loginPage: () => '/login',
  mainPage: () => '/',
  signUpPage: () => '/signup',
  notFoundPage: () => '*',
};
