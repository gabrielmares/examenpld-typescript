import { useContext, useEffect } from 'react'
import { useHistory, Route } from 'react-router-dom';
import { SessionContext } from '../Context/SessionContext';
import { useAuth } from '../firebase/firebase';
import TestPage from '../Pages/TestPage';
import { Cargando } from './Cargando';
import NavBar from './NavBar';


export const PrivateRoute: React.ElementType = ({
    component: Component,
    ...routeProps
}) => {

    let history = useHistory()
    const { localState, dispatch } = useContext(SessionContext);
    const { user, pending, isSignedIn } = useAuth(localState);

    useEffect(() => {
        if (!pending && isSignedIn) {
            dispatch({
                type: 'sesionExitosa',
                token: user
            })
        }
        // eslint-disable-next-line
    }, [pending, isSignedIn])

    if (pending) return <Cargando mensaje='Recuperando sesion...' />

    if (!user.email && !isSignedIn) {
        history.push('/login')
    }

    return (
        <>
            <NavBar />
            <Route {...routeProps} render={() => user.oficial ? <Component /> : <Route path='/' component={TestPage} />} />
        </>

    )
}

// export default SesionUsuario;