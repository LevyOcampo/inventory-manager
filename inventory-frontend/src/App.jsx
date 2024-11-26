import { useState } from 'react'
import Navbar from './components/Navbar'
import { GiHamburgerMenu } from "react-icons/gi";
import './App.css'

function App() {
  const [ showNav, setShowNav ] = useState(false)

  return (
    <div className='App'>
      <header>
        <GiHamburgerMenu onClick={() => setShowNav(!showNav)}/>
        <h1 className='title'>Inventory Manager</h1>
      </header>
      <Navbar show={ showNav }/>

    </div>
  )
}

export default App