import {  useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classes from './AuthForm.module.css';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const AuthForm = () => {
  const history=useHistory()
  const { login,isLoggedIn } = AuthContext()
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false)
  const emailRef = useRef()
  const passwordRef = useRef()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  console.log(isLoggedIn);
  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;
    setLoading(true)
    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAyqFjwekzckK01VIQTo6f0bFFrPZrmDyI'
    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAyqFjwekzckK01VIQTo6f0bFFrPZrmDyI'
    }
    try {
      const res = await axios.post(url, {
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true
      })
      const expirationTime=new Date(new Date().getTime()+(+res.data.expiresIn *1000))
      login(res.data.idToken,expirationTime)
      
      
      alert('Authentication Success')
      history.replace('/')
    } catch (error) {
      alert('Authentication failed..!');
    }
    setLoading(false)
    e.target.reset()
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordRef} required />
        </div>
        <div className={classes.actions}>
          {!loading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
          {loading && <p>sending request</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>

        </div>
      </form>
    </section>
  );
};

export default AuthForm;
