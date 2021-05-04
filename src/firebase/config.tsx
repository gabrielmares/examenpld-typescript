import fb from 'firebase/app'

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_APIKEY,
//     authDomain: process.env.REACT_APP_AUTHDOMAIN,
//     databaseURL: process.env.REACT_APP_DB_URL,
//     projectId: process.env.REACT_APP_PROJECTID,
//     storageBucket: process.env.REACT_APP_SB ,
//     messagingSenderId: process.env.REACT_APP_MSGSEND,
//     appId: process.env.REACT_APP_APPID
// }


const firebaseConf = {
    apiKey: "AIzaSyBD3DgRSwwUEtYTFrHhQ12LaqTiAV6gs7E",
    authDomain: "pld2020-6913f.firebaseapp.com",
    databaseURL: "https://pld2020-6913f.firebaseio.com",
    projectId: "pld2020-6913f",
    storageBucket: "pld2020-6913f.appspot.com",
    messagingSenderId: "602643180099",
    appId: "1:602643180099:web:3a0b390f9a62a3c64482f6"
}


fb.initializeApp(firebaseConf);

export const firebaseApp = !fb.apps.length ? fb.initializeApp(firebaseConf) : fb.app()