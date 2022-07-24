import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthWrapper';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';
import { AllUsersAuthDetails } from '../../types/allUsersType';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const {handleUser, user} = useContext(AuthContext);
  const navigation = useNavigate()

  useEffect(() => {
   if(user)
    navigation("/dashboard")
  }, [user])
  

  const checkValidity = ()=>{
    let err = "";
    if(!username){
      err = "Please enter username"
    }
    else if(!password){
      err = "Please enter password"
    }
    return err;
  }

  const verifyUser = ()=>{
    let allUsers = localStorage.getItem("allUsers");
    if(allUsers){
      let users:AllUsersAuthDetails = JSON.parse(allUsers);
      users.forEach((user)=>{
        if(user.username === username){
          if(user.password === password){
            handleUser && handleUser(user.username);
          }
        }
      })
    }
    setError("Username or password is incorrect");
  }

  const handleLogin = (e:FormEvent)=>{
    e.preventDefault();
    const err = checkValidity();
    if(err){
      setError(err);
      return;
    }
    else{
      verifyUser();
    }
  }

  const handleUserName = (e:ChangeEvent<HTMLInputElement>)=>{
    if(error){
      setError("");
    }
    setUsername(e.target.value)
  }

  const handlePassword = (e:ChangeEvent<HTMLInputElement>)=>{
    if(error){
      setError("");
    }
    setPassword(e.target.value);
  }

  if(user){
    return <h2>loading...</h2>
  }

  return (
    <div className='h-screen w-screen flex flex-col sm:flex-row'>
      <div className='flex-1 hidden sm:block bg-blue-500'>

      </div>
      <div className='flex-1 px-10'>
        <div className='max-w-lg flex-1 mx-auto rounded-lg px-10 py-8 bg-blue-100 mt-28 shadow-md'>
          <h1 className='mb-4 text-2xl'>Login</h1>
          <form onSubmit={handleLogin} className='flex flex-col gap-4'>
            <AuthInput placeholder='Enter username' type="text" value={username} onChange={handleUserName} />
            <AuthInput placeholder='Enter password' type="password" value={password} name="password" onChange={handlePassword} />
            <p className='text-center min-h-4 text-red-500'>{error}</p>
            <AuthButton type="submit">Login</AuthButton>
          </form>
          <div className='flex gap-4 items-center mt-4'>
            <p>Don't have an account?</p>
            <Link className='text-blue-800' to={'/register'}>Create account</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;