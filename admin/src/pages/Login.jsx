import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
    const [state, setState] = useState('Admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {setAToken,backendUrl}=useContext(AdminContext)

    const onSubmitHandler = async(event) => {
        event.preventDefault()
        try{
        if(state==='Admin'){
            const {data} = await axios.post(backendUrl+'/api/admin/login',{email,password})
          if(data.success){
              localStorage.setItem('aToken',data.token)
              setAToken(data.token)
          }
          else{
           toast.error(data.message)
          }}
        // Add authentication logic here
    }catch(error){};
    }
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={onSubmitHandler} className="bg-white p-6 rounded-lg shadow-lg w-96">
                <div className="text-center mb-6">
                    <p className="text-xl font-semibold text-gray-700">{state} Login</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-medium mb-2">Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                    Login
                </button>
                <div className="mt-4 text-center">
                    <button 
                        type="button" 
                        onClick={() => setState(state === 'Admin' ? 'Doctor' : 'Admin')} 
                        className="text-blue-500 hover:underline">
                        Switch to {state === 'Admin' ? 'Doctor' : 'Admin'} Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
