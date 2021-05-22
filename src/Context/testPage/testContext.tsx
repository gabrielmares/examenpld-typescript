import { createContext, useContext, useReducer } from 'react'
import { saveDocument } from '../../firebase/firebase'
import { evaluacionDelUsuario, examenInitialProps, TestContextProps } from '../../interfaces'
import { SessionContext } from '../SessionContext'
import { examenRdx } from './testReducer'


export const TestContext = createContext({} as TestContextProps)

export const ExamenContext = ({ children }: any) => {

    const [respuestas, dispatch] = useReducer(examenRdx, examenInitialProps)
    const { localState: { claims: { name, email } } } = useContext(SessionContext)

    // respuestas correctas de cada pregunta, para evaluar el resultado
    const respuestasCorrectas = [1, 1, 1, 2, 0, 1, 0, 2, 2, 1, 2, 0]

    const seleccionRespuesta = (pregunta: number, respuesta: number) => {
        dispatch({
            type: pregunta,
            respuesta
        })
    }


    const evaluacionDeExamen = async () => {
        let arregloRespuestas: any = [];
        // obtenemos los valores de cada respuesta para compararlas con las respuestas correctas
        // y crear el objeto con las respuestas para despues obtener la calificacion de la evaluacion
        const respuestasUsuario = Object.values(respuestas)
        respuestasUsuario.map((respuestaExamen, index) => {
            return arregloRespuestas.push(respuestaExamen === respuestasCorrectas[index])
        });
        // creamos el objeto que se almacenara en la BD
        let evaluacionUsuario: evaluacionDelUsuario = {
            calificacion: ((arregloRespuestas.filter((resultado: boolean) => resultado === true).length / arregloRespuestas.length) * 10),
            evaluacion: arregloRespuestas,
            opciones: respuestasUsuario,
            usuario: {
                email,
                nombre: name
            }
        }

        return saveDocument(evaluacionUsuario)
            .then(() => 200)
            .catch(() => 404)

    }



    return (
        <TestContext.Provider
            value={{
                respuestas,
                seleccionRespuesta,
                respuestasCorrectas,
                evaluacionDeExamen
            }}>
            {children}
        </TestContext.Provider>
    )
}