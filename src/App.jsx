import './App.css'
import { Route, Routes } from 'react-router-dom'
import Auth from './Auth'
import Home from './Home'
import Test from './Test'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Auth />}></Route>
        <Route path='/register' element={<Auth insideRegister />}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/test' element={<Test/>}></Route>
      </Routes>
    </>
  )
}

export default App
