import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const {isLoggedIn,logout}=AuthContext()
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn&&
          <li>
            <Link to='/auth'>Login</Link>
          </li>}
          {isLoggedIn&&
          <li>
            <Link to='/profile'>Profile</Link>
          </li>}
          {isLoggedIn&& <li>
            <button onClick={logout}>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
