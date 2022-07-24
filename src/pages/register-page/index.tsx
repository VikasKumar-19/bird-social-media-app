import React, { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../AuthWrapper';
import AuthButton from '../../components/AuthButton';
import AuthInput from '../../components/AuthInput';

interface UserAuthDetails{
  username: string;
  password: string;
}

type AllUsersAuthDetails = UserAuthDetails[];

const Register = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState({password: "", confirmPassword: ""});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {user, handleUser} = useContext(AuthContext)

  useEffect(() => {
    if(user !== null){
      navigate("/dashboard");
    }
  }, [user])
  
  
  const checkValidity = ()=>{
    let error = "";
    const usernameRegex = new RegExp("^[a-zA-Z0-9_]*$");
    const strongPassRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{6,}$");
    if(!!!username){
      error = "username is required";
    }
    else if(!usernameRegex.test(username)){
      error = "username should contain alphabets and numbers only"
    }
    else if(!!!password.password){
      error = "password is required";
    }
    else if(password.password.length < 6){
      error = "password is too small"
    }
    else if(!strongPassRegex.test(password.password)){
      error = "password must contain 1 capital letter 1 special character 1 digit and 1 small letter"
    }
    else if(password.password !== password.confirmPassword){
      error = "passwords do not match";
    }
    return error;
  }

  const handleRegister = (e:FormEvent)=>{
    e.preventDefault();
    const err = checkValidity();
    if(!!err){
      setError(err);
      return;
    }
    
    let allUsers = localStorage.getItem('allUsers');
    if(allUsers){
      let users:AllUsersAuthDetails = JSON.parse(allUsers);
      const found = users.find((user)=>user.username === username)
      console.log(found);
      
      if(found){
        setError("username is already exist")
        return;
      }

    }

    if(!!allUsers){
      localStorage.setItem("allUsers", JSON.stringify([...JSON.parse(allUsers), {username, password:password.password}]));
    }
    else{
      localStorage.setItem("allUsers", JSON.stringify([{username, password:password.password}]))
    }

    handleUser && handleUser(username);    
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
    const name = e.target.name;
    setPassword((password)=>({...password, [name]:e.target.value}))
  }
  if(user !== null){
    return <h2>loading...</h2>
  }

  return (
    <div className='h-[91.8vh] flex flex-col sm:flex-row'>
      <div className='flex-1 hidden sm:block bg-blue-500'>

      </div>
      <div className='flex-1 px-10'>
        <div className='max-w-lg flex-1 mx-auto rounded-lg px-10 py-8 bg-blue-100 mt-28 shadow-md'>
          <h1 className='mb-4 text-2xl'>Register</h1>
          <form onSubmit={handleRegister} className='flex flex-col gap-4'>
            <AuthInput placeholder='Enter unique username' type="text" value={username} onChange={handleUserName} />
            <AuthInput placeholder='Create password' type="password" value={password.password} name="password" onChange={handlePassword} />
            <AuthInput placeholder='Confirm password' type="password" value={password.confirmPassword} name="confirmPassword" onChange={handlePassword} />
            <p className='text-center min-h-4 text-red-500'>{error}</p>
            <AuthButton type="submit">Register</AuthButton>
          </form>
          <div className='flex gap-4 items-center mt-4'>
            <p>Already have an account?</p>
            <Link className='text-blue-800' to={'/login'}>Login</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register;