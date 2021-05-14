import { createContext, useReducer } from 'react'
import { inicioSesion, SessionContextProps, SessionInitialState } from '../interfaces'
import sesionReducer from './sesionReducer'
import { LoginUser, logOut } from '../firebase/firebase'
import handleErrors from '../helpers/handleError'
import { useWindow } from '../hook/useWindowSize'


export const SessionContext = createContext({} as SessionContextProps)


export const AuthContext = ({ children }: any) => {
    const [claims, dispatch] = useReducer(sesionReducer, SessionInitialState)

    const { width: windowSize } = useWindow()

    const listaDeUsuarios = () => {
        return dispatch({
            type: 'ActualizarListaUsuarios',
        })
    }
    const listaActualizada = () => {
        return dispatch({
            type: 'ListaActualizada'
        })
    }

    const InciarSesion = async ({ email, password }: inicioSesion) => {
        dispatch({
            type: 'signIn'
        })
        let iniciaSesion = await LoginUser({ email, password })
        if (iniciaSesion?.code) {
            const codigo = handleErrors(iniciaSesion);
            dispatch({
                type: 'falloInicioSesion',
                error: codigo
            })
            return iniciaSesion.code
        }
        dispatch({
            type: 'sesionExitosa',
            token: {
                email: iniciaSesion.claims.email,
                oficial: iniciaSesion.claims.oficial,
                name: iniciaSesion.claims.name,
                token: iniciaSesion.token
            }
        })
        return iniciaSesion.claims.oficial ? 200 : 201

    }

    const CerrarSesion = () => {
        dispatch({
            type: 'signOut'
        })
        logOut()
    }

    return (
        <SessionContext.Provider
            value={{
                localState: claims,
                sesion: claims.sesion,
                actualizar: claims.actualizarUsuarios,
                loginError: 0,
                CerrarSesion,
                InciarSesion,
                dispatch,
                listaDeUsuarios,
                listaActualizada,
                windowSize
            }}>
            {children}
        </SessionContext.Provider>
    )
}

