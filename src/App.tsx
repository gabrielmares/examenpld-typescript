import { AuthContext } from "./Context/SessionContext";
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import LoginPage from "./Pages/LoginPage";
import { PrivateRoute } from "./Components/PrivateRoute";
import AdminPage from "./Pages/AdminPage";
import TestPage from "./Pages/TestPage";
import ExamenesResueltos from "./Pages/TestResults";

function App() {
  return (
    <BrowserRouter>
      <AuthContext>
        <Switch>
          <Route exact path='/login' component={LoginPage} />
          <PrivateRoute path='/administracion' component={AdminPage} />
          <PrivateRoute path='/' component={TestPage} />
          <PrivateRoute path='/resultados' component={ExamenesResueltos} />
        </Switch>
      </AuthContext>
    </BrowserRouter>

  );
}

export default App;
