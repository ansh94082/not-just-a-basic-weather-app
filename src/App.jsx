import { useState } from 'react'
import Weather from './weather'
import "./index.css"
import Navbar from './navbar'
import { Routes , Route } from 'react-router-dom'
import Horoscope from './horoscope'

function App() {
  const [count, setCount] = useState(0)


  return (
    <div className="bg-[url('/background-rainy.png')] bg-cover bg-center w-full min-h-screen">
    <Navbar />

    <div className="flex-grow content-wrap pt-[10vh]">
        <Routes>
          <Route path='/weather' element= {<Weather />}/>
          <Route path='/horoscope' element={<Horoscope />} />
        </Routes>
      </div>

    

     
      
    </div>
  )
}

export default App
