import { Routes, Route } from 'react-router-dom'
import Login from './components/Login';
import Home from './components/Home';
import './App.css'
import Protected from './components/Protected';
import SignUp from './components/SignUp';
import NotFound from './components/NotFound';

export default function App() {
  const isLoggedIn:string|null=localStorage.getItem('isLoggedIn')
  return (
    <Routes>
      <Route path='/' element={<Login />}></Route>
      <Route element={<Protected isLoggedIn={isLoggedIn}/>}>
        <Route path='home' element={<Home />}>  </Route>
      </Route>
      <Route path='/signup' element={<SignUp />}></Route>
      <Route path='/*' element={<NotFound />}></Route>
    </Routes>
  );
}



