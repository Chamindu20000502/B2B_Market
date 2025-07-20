import { useState } from 'react'
import Home from './Home/Home';
import SearchListing from './SearchListing/SearchListing';
import { BrowserRouter ,Routes , Route } from 'react-router-dom';
import ProductPage from './ProductPage/ProductPage';
import RegisterPage from './Register/RegisterPage'
import AccountPage from './Account/AccountPage'
import Login from './Login/Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/search' element={<SearchListing/>}></Route>
        <Route path='/product/:id' element={<ProductPage></ProductPage>}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>
        <Route path='/account' element={<AccountPage/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
