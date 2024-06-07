import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import About from './Pages/About';
import Blogs from './Pages/Blogs';
import Dashboard from './Pages/Dashboard';
import SignUp from './Pages/SignUp';
import SignIn from './Pages/SignIn';
import Header from './Components/Header';
import Footer from './Components/Footer';


function App() {

  return (
    <>
    
     <BrowserRouter>
     <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/signin' element={<SignIn/>}/>
      </Routes>
      <Footer/>
     </BrowserRouter>
    </>
  )
}

export default App
