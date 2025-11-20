import React, { useEffect, useState } from 'react'
import axios from 'axios'
export default function UnitsGeneration({ api, headers }){
  const [data,setData]=useState(null)
  useEffect(()=>{ axios.get(`${api}/solar/units`, { headers }).then(r=>setData(r.data)).catch(()=>{}) },[])
  return <div><h3>Units Generation</h3><pre>{JSON.stringify(data,null,2)}</pre></div>
}
