import React, { useEffect, useState } from 'react'
import SolarKW from './Tabs/SolarKW'
import SolarPlates from './Tabs/SolarPlates'
import UnitsGeneration from './Tabs/UnitsGeneration'
import Billing from './Tabs/Billing'
import ThemeSwitcher from '../components/ThemeSwitcher'

export default function Home({ token, api }){
  const [theme,setTheme] = useState(localStorage.getItem('theme') || 'sunrise')
  const [tab,setTab] = useState('kw')
  const headers = { Authorization: `Bearer ${token}` }
  useEffect(()=> localStorage.setItem('theme', theme),[theme])

  return (
    <div className={`min-h-screen p-6 transition-all duration-700 theme-${theme}`}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Solar Dashboard</h1>
        <ThemeSwitcher theme={theme} setTheme={setTheme} />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <aside className="col-span-1 card p-4 rounded shadow">
          <div className="mb-4">Theme: <b>{theme}</b></div>
          <nav className="flex flex-col gap-2">
            <button onClick={()=>setTab('kw')} className="text-left">Solar kW</button>
            <button onClick={()=>setTab('plates')} className="text-left">Solar Plates</button>
            <button onClick={()=>setTab('units')} className="text-left">Units Generation</button>
            <button onClick={()=>setTab('billing')} className="text-left">Billing</button>
          </nav>
        </aside>
        <main className="col-span-3">
          <section className="mb-4 card p-4 rounded shadow">
            <h2>Theme details</h2>
            <p>Here we show a short description about the theme and solar info depending on theme selected.</p>
          </section>

          <section className="card p-4 rounded shadow">
            {tab==='kw' && <SolarKW api={api} headers={headers} />}
            {tab==='plates' && <SolarPlates api={api} headers={headers} />}
            {tab==='units' && <UnitsGeneration api={api} headers={headers} />}
            {tab==='billing' && <Billing api={api} headers={headers} />}
          </section>
        </main>
      </div>
    </div>
  )
}
