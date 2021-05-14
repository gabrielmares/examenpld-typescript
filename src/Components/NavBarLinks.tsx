import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { SessionContext } from '../Context/SessionContext'

const NavBarLinks = () => {
    const { CerrarSesion, localState: { claims }, windowSize } = useContext(SessionContext)

    return (
        <ul className="contenedorLinks" style={{ marginRight: (windowSize < 768 && claims.oficial) ? "2.5em" : '' }} >
            {claims.oficial && (
                <>
                    <Link to='/administracion' className='link'>Administracion</Link>
                    <Link to='/resultados' className='link'>Resultados</Link>
                    <Link to='/' className='link'>Examen</Link>
                </>
            )}

            <Link to='/login' className="btnsalir" onClick={() => CerrarSesion()}>Salir</Link>
        </ul>
    )
}

export default NavBarLinks