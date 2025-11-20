import React, { useEffect } from 'react'

const THEMES = [
  { id: 'sunrise', desc: 'Warm sunrise tones — orange & soft sky' },
  { id: 'noon', desc: 'Bright midday — vivid blue & yellow' },
  { id: 'sunset', desc: 'Warm sunset — magenta & gold' },
  { id: 'night', desc: 'Calm night — deep blue & teal' }
]

export default function ThemeSwitcher({ theme, setTheme }){
  useEffect(()=>{
    const t = setInterval(()=>{
      setTheme(prev => {
        const idx = THEMES.findIndex(x=>x.id===prev)
        return THEMES[(idx+1)%THEMES.length].id
      })
    }, 8000) // change every 8s
    return ()=> clearInterval(t)
  }, [])

  return (
    <div className="flex items-center gap-2">
      {THEMES.map(t=> (
        <button key={t.id} onClick={()=>setTheme(t.id)} className={`px-2 py-1 rounded ${theme===t.id? 'ring-2':''}`}>{t.id}</button>
      ))}
    </div>
  )
}
