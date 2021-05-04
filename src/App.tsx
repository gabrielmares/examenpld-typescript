import { AuthContext } from "./Context/SessionContext";
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import LoginPage from "./Pages/LoginPage";
import { PrivateRoute } from "./Components/PrivateRoute";
import AdminPage from "./Pages/AdminPage";
import TestPage from "./Pages/TestPage";

function App() {
  return (
    <BrowserRouter>
      <AuthContext>
        <Switch>
          <Route exact path='/' component={LoginPage} />
          <PrivateRoute path='/administracion' component={AdminPage} />
          <PrivateRoute path='/examen' component={TestPage} />
        </Switch>
      </AuthContext>
    </BrowserRouter>

  );
}

export default App;
