import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const {backendUrl,token,setToken}=useContext(AppContext)
  const navigate=useNavigate()

  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if(state === 'Sign Up') {
        const { data } = await axios.post(backendUrl + '/api/user/register', {name,password,email})
        if(data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
      
        } else {
          toast.error(data.message)
        }
    }
  else{
    const { data } = await axios.post(backendUrl + '/api/user/login', {password,email})
    if(data.success) {
      localStorage.setItem('token', data.token)
      setToken(data.token)
  
    } else {
      toast.error(data.message)
    }
  }}
    catch (error) {
     toast.error(error.message)
    }

  };

  useEffect(() => {
    if(token){
      navigate('/')
    }
}, [token]);

  return (
    <form 
      className="min-h-[80vh] flex items-center justify-center"
      onSubmit={onSubmitHandler}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <p className="text-2xl font-semibold text-center mb-2">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        <p className="text-gray-500 text-center mb-6">
          Please {state === 'Sign Up' ? 'signup' : 'login'} to book an appointment
        </p>

        {state === 'Sign Up' && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700">Full Name</p>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required
              className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
            />
          </div>
        )}

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700">Email</p>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700">Password</p>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-primary text-white py-3 rounded-full text-lg font-medium hover:opacity-90 transition"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <p className="text-sm text-center mt-4">
          {state === 'Sign Up' ? "Already have an account?" : "Don't have an account?"}
          <span 
            className="text-primary font-medium cursor-pointer ml-1"
            onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
          >
            {state === 'Sign Up' ? 'Login' : 'Sign Up'}
          </span>
        </p>
      </div>
    </form>
  );
};

export default Login;
