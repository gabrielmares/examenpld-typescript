import { SesionState } from "../interfaces";

type sesionAction =
    | { type: 'signIn' }
    | { type: 'signOut' }
    | { type: 'sesionExitosa', token: Object }
    | { type: 'falloInicioSesion', error: number }
    | { type: 'setLoader' }
    | { type: 'ActualizarListaUsuarios' }
    | { type: 'ListaActualizada' }

const sesionReducer = (state: SesionState, action: sesionAction): SesionState => {

    switch (action.type) {
        case 'signIn':
            return {
                ...state,
                errores: 0,
                loader: true
            }
        case 'sesionExitosa':
            return {
                ...state,
                sesion: true,
                claims: action.token,
                loader: false
            }
        case 'falloInicioSesion':
            return {
                ...state,
                loader: false,
                errores: action.error
            }
        case 'signOut':
            return {
                claims: {
                    email: '',
                    name: '',
                    oficial: false,
                },
                errores: 0,
                loader: false,
                sesion: false,
                listaUsuarios: [],
                actualizarUsuarios: false
            }
        case 'ActualizarListaUsuarios':
            return {
                ...state,
                actualizarUsuarios: true,
            }
        case 'ListaActualizada':
            return {
                ...state,
                actualizarUsuarios: false
            }
        case 'setLoader':
            return {
                ...state,
                loader: true
            }
        default:
            return state

    }

}

export default sesionReducer;