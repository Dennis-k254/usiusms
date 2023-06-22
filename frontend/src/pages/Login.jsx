import React from 'react'
import { login } from '../assets'

const Login = () => {
  return (
    <div className='flex flex-row  justify-between'>
        <div >
            <img className='w-[50vw]' src={login}/>
        </div>
        
        <div className='flex flex-col w-[50%]'>
            <div>
                <h1>Create Account</h1>
                <button className='border-2 rounded-md'>Sign up with 
                <p>-{""}OR{""}-</p>Google</button>
            </div>
            <div className='flex flex-col w-full'>   
                <form className='flex flex-col px-20 w-full'>
                    <input type='text' placeholder='Full Name  ' className=' bg-transparent w-full '/>
                    <input type='text' placeholder='Email Adress' className='underline bg-transparent'/>
                    <input type='password' placeholder='Password' className='underline bg-transparent'/>
                    <input type='password' placeholder='Confirm Password' className='underline bg-transparent'/>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login