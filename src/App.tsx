import { AuthContext } from "./Context/SessionContext";
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import LoginPage from "./Pages/LoginPage";
import { PrivateRoute } from "./Components/PrivateRoute";
import AdminPage from "./Pages/AdminPage";
import TestPage from "./Pages/TestPage";
import ExamenesResueltos from "./Pages/TestResults";
import { FirstLauch } from "./Pages/FirstLauch";
import { ExamenContext } from "./Context/testPage/testContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContext>
        <Switch>
          <Route exact path='/' component={FirstLauch} />
          <Route exact path='/login' component={LoginPage} />
          <PrivateRoute path='/administracion' component={AdminPage} />
          <ExamenContext>
            <PrivateRoute path='/examen' component={TestPage} />
          </ExamenContext>
          <PrivateRoute path='/resultados' component={ExamenesResueltos} />
        </Switch>
      </AuthContext>
    </BrowserRouter>

  );
}

export default App;
