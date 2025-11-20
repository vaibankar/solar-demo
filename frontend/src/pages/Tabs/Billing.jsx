import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function Billing({ api, headers }){
  const [data,setData]=useState(null)
  useEffect(()=>{ axios.get(`${api}/billing`, { headers }).then(r=>setData(r.data)).catch(()=>{}) },[])
  return <div><h3>Billing</h3><pre>{JSON.stringify(data,null,2)}</pre></div>
}
