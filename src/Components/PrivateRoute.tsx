import { useContext, useEffect } from 'react'
import { useHistory, RouteProps, Route } from 'react-router-dom';
import { SessionContext } from '../Context/SessionContext';
import { useAuth } from '../firebase/firebase';
import TestPage from '../Pages/TestPage';

type PrivateRouteProps = {
    path: RouteProps['path'];
    component: React.ElementType;
};



export const PrivateRoute: React.FunctionComponent<PrivateRouteProps> = ({
    component: Component,
    ...routeProps
}): any => {

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

    if (pending) return false;

    if (!user.email && !isSignedIn) {
        history.push('/')
    }

    return (
        <Route {...routeProps} render={() => user.oficial ? <Component /> : <Route path='/examen' component={TestPage} />} />
    )
}

// export default SesionUsuario;