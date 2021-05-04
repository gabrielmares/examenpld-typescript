import { useContext } from 'react'
import { SessionContext } from '../Context/SessionContext';
import { useHistory } from 'react-router-dom'

const TestPage = () => {
    let history = useHistory()
    const { CerrarSesion } = useContext(SessionContext)
    const endSesion = () => {
        CerrarSesion()
        history.push('/')
    }

    return (
        <div>
            <h1>Pagina del examen de PLD</h1>
            <button onClick={() => endSesion()}>Cerrar sesion</button>
        </div>
    );
}

export default TestPage;