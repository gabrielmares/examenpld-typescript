import React, { useEffect, useState } from 'react';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
// eslint-disable-next-line
import { firebaseApp } from './config';
import { Data, evaluacionDelUsuario, inicioSesion, listaExamenes, Registro, SesionState, UsuarioLogueado } from '../interfaces'
import clienteAxios from '../axiosClient';




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
                    name: localState.claims.name,
                    token: localState.claims.token
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
                            name: tokenID.claims.name,
                            token: tokenID.token
                        },
                        isSignedIn: true,
                    })
                }
            }
            return saveLogged({
                pending: false,
                user: {
                    email: "",
                    oficial: false,
                    name: "",
                    token: ""
                },
                isSignedIn: false,
            })
        })
        // eslint-disable-next-line
    }, [])
    return logged;
};



// grabar un documento en la coleccion
export const saveDocument = async (examen: evaluacionDelUsuario) => {
    try {
        await firebaseApp.firestore().collection('evaluaciones').doc(examen.usuario.email).set(examen)
            .then(res => {
                return res;
            })

    } catch (error) {
        console.error('se produjo un error', error)
    }

}


// generar email de restablecimiento de contrase??a
export const ResetPassword = async (email: string) => {
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
    return doc;

}


// funcion que descarga los examenes ya realizados
export const ListaExamenes = () => {
    const [lista, setLista] = React.useState<listaExamenes>({
        pending: true,
        examenes: []
    })

    // const [pendind, setPending] = React.useState(true)
    React.useEffect(() => {
        function get() {
            firebaseApp.firestore().collection('evaluaciones').onSnapshot(snapshot);
        }
        return get();
    }, [])
    const snapshot = (snapshot: { docs: { id: any; data: () => any; }[]; }): any => {
        const total = snapshot.docs.map((producto: { id: string; data: () => any; }) => {
            return {
                id: producto.id,
                ...producto.data()
            }
        })
        setLista({
            pending: false,
            examenes: total
        })

    }

    return lista;
}

// funcion para descargar la lista de usuarios registrados
export const ListaUsuariosFB = (token: string, actualizar: boolean) => {
    const [usuariosFB, setUsuariosFB] = useState<Data[]>()
    const [pending, setPending] = useState(true)


    useEffect(() => {
        if ((pending && token) || actualizar) {
            clienteAxios(token).get('/usuarios')
                .then(usuariosRegistrados => {
                    setUsuariosFB(usuariosRegistrados.data.users)
                    return setPending(false)
                })
                .catch(() => {
                    return setPending(false)
                })
        }
    }, [token, pending, actualizar])

    return {
        pending,
        usuariosFB
    }

}


export const useExamen = (email: string, oficial: boolean) => {
    const [pendiente, setPendiente] = useState(true)
    const [existe, setExiste] = useState(false)



    useEffect(() => {
        if (!email) return
        if (oficial) {
            setExiste(false)
            return setPendiente(false)
        }
        firebaseApp
            .firestore()
            .collection('evaluaciones')
            .doc(email)
            .get()
            .then(evaluar => {
                setExiste(evaluar.exists)
                return setPendiente(false)
            })
    }, [email, oficial])


    return {
        pendiente,
        existe
    }
}

export const EliminarExamen = (email: string): any => {
    return firebaseApp
        .firestore()
        .collection('evaluaciones')
        .doc(email)
        .delete()
        .then(() => 200)
        .catch(() => 404)

}