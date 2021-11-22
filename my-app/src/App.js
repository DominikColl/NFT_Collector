import logo from './logo.svg';
import './reset.css'
import './App.css';
import { AuthProvider } from './context/AuthContext'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
} from 'react-router-dom'
import CreateAccount from './Pages/createAccount'
import Login from './Pages/login'
import Dashboard from './Pages/dashboard';
function App() {
  return (
    <div className="App">
      <AuthProvider>
    <Router>
      <Switch>
      <Route exact path='/' component={withRouter(CreateAccount)} />
      <Route exact path='/login' component={withRouter(Login)}/>
      <Route exact path='/dashboard' component={withRouter(Dashboard)}/>
      </Switch>
    </Router>
    </AuthProvider>
    </div>
  );
}

export default App;
