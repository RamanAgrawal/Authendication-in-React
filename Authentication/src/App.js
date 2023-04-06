import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { AuthContext } from './context/AuthContext';

function App() {
  const { isLoggedIn } = AuthContext()
 
  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!isLoggedIn && (<Route path='/auth'>
          <AuthPage />
        </Route>)}
        {isLoggedIn && (<Route path='/profile'>
          <UserProfile />
        </Route>)}
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
