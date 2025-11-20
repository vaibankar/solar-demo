import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function SolarKW({ api, headers }){
  const [data,setData]=useState(null)
  useEffect(()=>{ axios.get(`${api}/solar/kw`, { headers }).then(r=>setData(r.data)).catch(()=>{}) },[])
  return <div><h3>Solar kW</h3><pre>{JSON.stringify(data,null,2)}</pre></div>
}
