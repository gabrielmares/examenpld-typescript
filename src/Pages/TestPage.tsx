import ExamenContenedor from "../Components/ContenedorExamen";
import { TestContext } from "../Context/testPage/testContext";
import { ListaPreguntas } from '../Cuestionario'
import PreguntaExamen from '../Components/Pregunta'
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { SessionContext } from "../Context/SessionContext";
import { AlertaError, AlertaExitoso } from "../helpers/Alertas";
import { useExamen } from "../firebase/firebase";

const TestPage = () => {
    let history = useHistory()
    const { evaluacionDeExamen } = useContext(TestContext)
    const { CerrarSesion, localState: { claims: { email, oficial } } } = useContext(SessionContext)

    const evualuarExamen = async () => {
        const resultado: any = await evaluacionDeExamen()
        // si el examen se almaceno, enviamos el msg al usuario, cerramos la sesion y reedirigimos a la pantalla de inicio de sesion
        if (resultado === 200) {
            AlertaExitoso('Examen guardado')
            if (oficial) return
            CerrarSesion()
            return history.push('/login')
        }
        AlertaError('No se pudo guardar el examen')
    }

    const { pendiente, existe } = useExamen(email, oficial)

    if (pendiente) return <span>Validando usuario</span>

    if (existe) {
        AlertaError('Has agotado los intentos permitidos').then(() => {
            CerrarSesion()
            history.push('/login')
        })
    }

    return (
        <div style={{ backgroundColor: '#e6e6e6' }}>
            <ExamenContenedor>
                <ExamenHeader />
                {ListaPreguntas.map(({ pregunta, respuestas }: any, index) => (
                    <PreguntaExamen
                        key={Math.random()}
                        indice={index}
                        pregunta={pregunta}
                        listaRespuestas={respuestas}
                    />
                ))}
                <button
                    className='submitForm'
                    value='Enviar evaluacion'
                    onClick={() => evualuarExamen()}
                    style={{
                        marginBottom: 50,
                        marginTop: 50,
                        width: 200,
                        alignSelf: 'center'
                    }}
                >
                    Enviar evaluacion
                    </button>
            </ExamenContenedor>
        </div >

    );
}

export default TestPage;


const ExamenHeader = () => {
    return (
        <div style={{
            textAlign: 'center',
            backgroundColor: 'white'
        }}>
            <h1>Preguntas</h1>
            <blockquote style={{}}>
                <footer style={{ fontSize: 12, marginTop: -15 }}>
                    Solo cuentas con un intento para contestar el examen
                </footer>
            </blockquote>
        </div>
    )
}