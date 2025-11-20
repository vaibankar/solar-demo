import React, { useState } from 'react'
import axios from 'axios'

export default function Login({ setToken, api }){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [name,setName]=useState('')
  const [mode,setMode]=useState('login')
  async function submit(e){
    e.preventDefault()
    try{
      const url = mode==='login' ? `${api}/auth/login` : `${api}/auth/register`
      const payload = mode==='login' ? { email, password } : { name, email, password }
      const res = await axios.post(url, payload)
      setToken(res.data.token)
    }catch(err){ alert(err?.response?.data?.message || 'Error') }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <form className="p-6 bg-white rounded shadow w-96" onSubmit={submit}>
        <h2 className="text-xl mb-4">{mode==='login' ? 'Login' : 'Register'}</h2>
        {mode==='register' && <input value={name} onChange={e=>setName(e.target.value)} placeholder="Name" className="w-full mb-2 p-2 border rounded"/>}
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full mb-2 p-2 border rounded"/>
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" className="w-full mb-2 p-2 border rounded"/>
        <button className="w-full p-2 bg-blue-600 text-white rounded">{mode==='login' ? 'Login' : 'Register'}</button>
        <div className="mt-2 text-sm text-center">
          <button type="button" onClick={()=>setMode(m=> m==='login' ? 'register':'login')} className="underline">Switch</button>
        </div>
      </form>
    </div>
  )
}
