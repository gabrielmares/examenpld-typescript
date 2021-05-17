import { useContext } from 'react';
import { SessionContext } from '../Context/SessionContext';
import NavBarLinks from './NavBarLinks'
import TituloApp from './TituloApp'


const NavBar = () => {
    const { localState: { claims }, windowSize } = useContext(SessionContext)
    return (
        <nav className="navbar"
            style={{
                flexDirection: (claims.oficial && windowSize < 768) ? 'column' : 'row',
                maxHeight: (claims.oficial && windowSize < 768) ? '140px' : '50px',
            }}
        >
            <TituloApp />
            <NavBarLinks />
        </nav>
    );
}

export default NavBar;

