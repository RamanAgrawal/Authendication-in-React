import classes from './ProfileForm.module.css';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useRef } from 'react';
const ProfileForm = () => {
  const history=useHistory()
  const newPasswordRef=useRef()
  const {token}=AuthContext();
  const submitHandler=async(e)=>{
    e.preventDefault()
    const enteredPassword=newPasswordRef.current.value
    try {
      await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAyqFjwekzckK01VIQTo6f0bFFrPZrmDyI',{
        idToken:token,
        password:enteredPassword,
        returnSecureToken:false
      });
      history.replace('/')
      
      alert('password Changed Successfully')
    } catch (error) {
      alert('somthing went worng')
    }
    e.target.reset()
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
