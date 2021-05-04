import { useContext } from 'react'
import { SessionContext } from '../Context/SessionContext';
import { useHistory } from 'react-router-dom'

const AdminPage = () => {
    let history = useHistory()
    const { CerrarSesion } = useContext(SessionContext)
    const endSesion = () => {
        CerrarSesion()
        history.push('/')
    }
    return (
        <div className='admin-page'>
            <h1>Pagina de administracion</h1>
            <button onClick={() => endSesion()}>
                Salir
            </button>

        </div>
    );
}

export default AdminPage;