// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  applicationConfiguration: {
    applicationName: 'Admin Pro',
    apiServerUrl: 'https://localhost:44355',
    hasInternetAccess: false,
    enableChat: true,
    defaultUserImage: 'assets/images/default-user.jpg',
    administrativeHome: '/home',
    tokenExpiration: 20
  },
  localStorageConfiguration: {
    localStorageKeyId: 'MisGastos',
    localStorageRememberMe: 'MisGastos_RememberMe',
    localStorageSetting: 'settings'
  },
  cryptoKeyConfiguration: {
    CRYPTO_KEY_1: 'sadasdasdasdasdasd',
    CRYPTO_KEY_2: 'asdasdasdasdasdasd',
  },
  fireBaseConfiguration: {
    useFireBase: true,
    useFireBaseStorage: true,
    useFireBaseChat: true,
    fireBaseClaim: 'FireBaseUser'
  },
  firebaseConfig: {
    apiKey: 'asdasdasdasdasd-asdasdasdasd',
    authDomain: 'asdasdasdasdasdasdasdasdasd',
    databaseURL: 'https://asdasdasdasdasdasd.firebaseio.com',
    projectId: 'asdasdasdasdasdasdasdasd',
    storageBucket: 'asdasdasdasdasdasdasd.appspot.com',
    messagingSenderId: 'asdasdasdasdasdasd',
    appId: '1:asdasdasdasdasd:web:asdasdasdasdsa'
  },
  socialNetworks: {
    useSocialNetworks: true,
    useGoogle: true,
    useFacebook: false,
    canLoginUser: true,
    canCreateUSer: true,
    defaultPassword: 'asdasdasdasdasd'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
