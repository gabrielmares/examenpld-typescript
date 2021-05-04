import React from 'react';
// import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// eslint-disable-next-line
import { firebaseApp } from './config';
import { inicioSesion, Registro, SesionState, UsuarioLogueado } from '../interfaces'
// const firebase = firebaseApp.initializeApp(AppFirebase)




// iniciar sesion
export const LoginUser = async ({ email, password }: inicioSesion) => {

    return await firebaseApp.auth().signInWithEmailAndPassword(email, password)
        .then(async (usuario) => {
            if (usuario) {
                let tokenID = await firebaseApp.auth().currentUser?.getIdTokenResult();
                return tokenID;
            }
        })
        .catch(e => {
            return e
        })


};



// funcion para cerrar sesion
export function logOut() {
    return firebaseApp.auth().signOut();
};

// obtener la informacion del usuario y el tokenId para los intercambios con el backend
export const useAuth = (localState: SesionState) => {
    const [logged, saveLogged] = React.useState<UsuarioLogueado>({
        isSignedIn: true,
        pending: true,
        user: {
            email: "",
            oficial: false,
            name: ''
        }
    });
    React.useEffect(() => {
        if (localState.sesion) {
            return saveLogged({
                isSignedIn: true,
                pending: false,
                user: {
                    email: localState.claims.email,
                    oficial: localState.claims.oficial,
                    name: localState.claims.name
                }
            })
        }
       firebaseApp.auth().onAuthStateChanged(async user => {
            if (user) { //si tenemos un usuario en linea, obtenemos el token y lo regresamos
                let tokenID = await user.getIdTokenResult()
                if (tokenID) {
                    return saveLogged({
                        pending: false,
                        user: {
                            email: tokenID.claims.email,
                            oficial: tokenID.claims.oficial,
                            name: tokenID.claims.name
                        },
                        isSignedIn: true,
                    })
                }
            }
            saveLogged({
                pending: false,
                user: {
                    email: "",
                    oficial: false,
                    name: ""
                },
                isSignedIn: false,
            })
        })
        // eslint-disable-next-line
    }, [])
    return logged;
};



// grabar un documento en la coleccion
export const saveDocument = async (examen: any) => {
    try {
        await firebaseApp.firestore().collection('evaluaciones').doc(examen.usuario.email).set(examen)
            .then(res => {
                // console.log(res)
                return res;
            })

    } catch (error) {
        console.error('se produjo un error', error)
    }

}


// generar email de restablecimiento de contraseña
export const ResetPassword = async ({ email }: Registro) => {
    let mensage;
    await firebaseApp.auth().sendPasswordResetEmail(email)
        .then(resp => {
            mensage = 200;
        })
        .catch(e => {
            mensage = 404;
        })
    return mensage;
}


// revisar si ya realizo el examen anteriormente
export const OnlyOne = async ({ email }: Registro) => {
    const doc = await firebaseApp.firestore().collection('evaluaciones').doc(email).get();
    // console.log(doc.exists)
    return doc;

}


// funcion que descarga los examenes ya realizados
// export const ListExamen = () => {
//     const [list, setList] = React.useState<listaExamenes>({
//         pending: true,
//         examenes: []
//     })

//     // const [pendind, setPending] = React.useState(true)
//     React.useEffect(() => {
//         function get() {
//             firebase.firestore().collection('evaluaciones').onSnapshot(snapshot);
//         }
//         get();
//     }, [])
//     const snapshot = (snapshot: { docs: { id: any; data: () => any; }[]; }): any => {
//         const total = snapshot.docs.map((producto: { id: string; data: () => any; }) => {
//             return {
//                 id: producto.id,
//                 ...producto.data()
//             }
//         })
//         setList({
//             pending: false,
//             examenes: total
//         })

//     }

//     return list;
// }