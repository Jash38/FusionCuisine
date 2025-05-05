import React, { useState } from 'react'
import axios from 'axios'

export default function InputForm({setIsOpen}) {
   const [email,setEmail]=useState("")
   const [password,setPassword]=useState("")
   const [isSignUp,setIsSignUp]=useState(false) 
   const [error,setError]=useState("")

  const handleOnSubmit=async(e)=>{
    e.preventDefault()
    let endpoint=(isSignUp) ? "signUp" : "login"
    await axios.post(`http://localhost:5000/${endpoint}`,{email,password})
    .then((res)=>{
        localStorage.setItem("token",res.data.token)
        localStorage.setItem("user",JSON.stringify(res.data.user))
        setIsOpen()
    })
    .catch(data=>setError(data.response?.data?.error))
  }

  return (
    <>
        <form
  className='form'
  onSubmit={handleOnSubmit}
  style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    minWidth: '300px',
    width: '100%',
  }}
>
  <div style={{ width: '100%' }}>
    <label style={{ display: 'block', marginBottom: '0.3rem' }}>Email</label>
    <input
      type="email"
      className='input'
      onChange={(e) => setEmail(e.target.value)}
      required
      style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #888' }}
    />
  </div>

  <div style={{ width: '100%' }}>
    <label style={{ display: 'block', marginBottom: '0.3rem' }}>Password</label>
    <input
      type="password"
      className='input'
      onChange={(e) => setPassword(e.target.value)}
      required
      style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1px solid #888' }}
    />
  </div>

  <button
    type='submit'
    style={{
      backgroundColor: '#ff5e00',
      color: 'white',
      padding: '0.6rem 1.2rem',
      border: 'none',
      borderRadius: '5px',
      fontWeight: '500',
      cursor: 'pointer',
      width: '100%'
    }}
  >
    {isSignUp ? "Sign Up" : "Login"}
  </button>

  {error && <h6 className='error' style={{ color: 'red' }}>{error}</h6>}

  <p
    onClick={() => setIsSignUp(pre => !pre)}
    style={{
      color: '#ff5e00',
      textAlign: 'center',
      cursor: 'pointer',
      marginTop: '0.5rem'
    }}
  >
    {isSignUp ? "Already have an account?" : "Create new account"}
  </p>
</form>
    </>
  )
}
