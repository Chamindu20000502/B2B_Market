import { useState } from 'react'
import Home from './Home/Home';
import SearchListing from './SearchListing/SearchListing';
import { BrowserRouter ,Routes , Route } from 'react-router-dom';
import ProductPage from './ProductPage/ProductPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/search' element={<SearchListing/>}></Route>
        <Route path='/product/:id' element={<ProductPage id='0'></ProductPage>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
