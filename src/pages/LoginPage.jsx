import React, { useEffect, useState } from 'react'
import railBg from '@images/bg/rail-bg.jpg'
import railLogo from '@images/bg/rmt-logo.png'
import Cookies from 'js-cookie'
import { redirect, useNavigate } from 'react-router-dom'
import { useAuth } from '../ProtectedRoutes'

function LoginPage() {
  const [loginForm, setLoginForm] = useState({ user: null, password: null })
  const [isValid, setIsvalid] = useState(true)
  const [shake, setShake] = useState('')
  const auth = useAuth()
  const navigate = useNavigate()

  const handleLogin = () => {
    if (loginForm.password === import.meta.env.VITE_LOGIN_PASSWORD) {
      Cookies.set('isAuthenticated', loginForm.user)
      navigate('/', { replace: true })
      // redirect('/')
    } else {
      setIsvalid(false)
      setShake('animate-shake animate-twice animate-duration-300 animate-delay-0')
      setTimeout(() => {
        setShake('')
      }, 400)
    }
  }
  const handleChange = e => {
    const { name, value } = e.target
    setIsvalid(true)
    setLoginForm(prevState => ({
      ...prevState,
      [name]: value
    }))
  };
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat" style={{ backgroundImage: `url(${railBg})` }}>
      <div className="rounded-xl bg-gray-900 bg-opacity-80 px-16 py-10 shadow-lg max-sm:px-8">
        <div className="">
          <div className="mb-8 flex flex-col items-center">
            <img className='mb-4' src={railLogo} width="150" alt="" />
            <h1 className="text-gray-300 text-2xl">Dashboard Console</h1>
            <span className="text-gray-300">Enter Login</span>
          </div>
          <div>
            <div className="mb-4 text-lg">
              <input onInput={handleChange} className={`rounded-3xl border-none ${!isValid && 'bg-red-500'} bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-300 shadow-lg outline-none backdrop-blur-md`} type="text" name='user' placeholder="Username" />
            </div>
            <div className="mb-4 text-lg">
              <input onInput={handleChange} className={`rounded-3xl border-none ${!isValid && 'bg-red-500'} bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-300 shadow-lg outline-none backdrop-blur-md`} type="Password" name='password' placeholder="Password" />
            </div>
            {!isValid && (
              <div className= {`text-red-500 text-center ${shake}`}>Invalid username or password</div>
            )}
            <div className="mt-8 flex justify-center text-lg text-black">
              <button onClick={handleLogin} className="bg-yellow-400 rounded-3xl bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-yellow-600">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage