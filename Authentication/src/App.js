import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import { AuthContext } from './context/AuthContext';
import { useEffect } from 'react';
function App() {
  const { login, isLoggedIn } = AuthContext()
  useEffect(() => {
    login(localStorage.getItem('loginInfo'))
    console.log(localStorage.getItem('loginInfo'));
  }, [])
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
