// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://testpanel.seamxsports.com:3100/seamx/api/v1', //testpanel test
  baseUrl: 'https://testpanel.seamxsports.com:3100', //testpanel test
  // apiUrl: 'http://localhost:3100/seamx/api/v1', //windows test
  // baseUrl: 'http://localhost:3100', //windows test
  // serverUrl:'http://localhost:3000/api/v2', //windows test
  // apiUrl: 'http://10.0.2.2:3100/seamx/api/v1',//device test
  // baseUrl: 'http://10.0.2.2:3100',//device test
  // serverUrl:'http://10.0.2.2:3000/api/v2', /device test
  // serverUrl:'http://panel.seamxsports.com:3000/api/v2', //prod live server url
  serverUrl:'https://testpanel.seamxsports.com:3000/api/v2', //test live server url
  serverBaseUrl:'https://testpanel.seamxsports.com:3000', //test live server url
  apiKey: "AIzaSyDeBfv42ekGhVK0OJ4vL8ItyAllN4kYDd8"
  // firebase:{
  //   apiKey: "AIzaSyDeBfv42ekGhVK0OJ4vL8ItyAllN4kYDd8",
  //   authDomain: "seamx-3a6d2.firebaseapp.com",
  //   databaseURL: "https://seamx-3a6d2.firebaseio.com",
  //   projectId: "seamx-3a6d2",
  //   storageBucket: "seamx-3a6d2.appspot.com",
  //   messagingSenderId: "330138728257",
  //   appId: "1:330138728257:web:646f0542ebdf539c2f93c0",
  //   measurementId: "G-E5F0P1HWGR"
  // }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
