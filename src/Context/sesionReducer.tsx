import { SesionState } from "../interfaces";

type sesionAction =
    | { type: 'signIn' }
    | { type: 'signOut' }
    | { type: 'sesionExitosa', token: Object }
    | { type: 'falloInicioSesion', error: number }


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
                sesion: false
            }
        default:
            return state

    }

}

export default sesionReducer;