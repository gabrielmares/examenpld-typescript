import fb from 'firebase/app'

const firebaseConf = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DB_URL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_SB ,
    messagingSenderId: process.env.REACT_APP_MSGSEND,
    appId: process.env.REACT_APP_APPID
}


fb.initializeApp(firebaseConf);

export const firebaseApp = !fb.apps.length ? fb.initializeApp(firebaseConf) : fb.app()