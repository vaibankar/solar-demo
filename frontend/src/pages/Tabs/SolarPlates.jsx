import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function SolarPlates({ api, headers }){
  const [data,setData]=useState(null)
  useEffect(()=>{ axios.get(`${api}/solar/plates`, { headers }).then(r=>setData(r.data)).catch(()=>{}) },[])
  return <div><h3>Solar Plates</h3><pre>{JSON.stringify(data,null,2)}</pre></div>
}
