import {BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css';
import { Login } from './Components/Login/Login';
import { Products } from './views/Products';
import { Orders } from './views/Orders';
import { CreateProduct } from './Components/CreateProduct/CreateProduct';
import { CreateOrder } from './Components/CreateOrder/CreateOrder';
import { EditProducts } from './Components/EditProducts/EditProducts';



function App() {
  return (
    <BrowserRouter>  
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/products' element={<Products/>} />
          <Route path='/orders' element={<Orders/>} />      
          <Route path='/create' element={<CreateProduct/>} />
          <Route path='/edit/:id' element={<EditProducts/>} />
          <Route path='/create-order' element={<CreateOrder/>} />   
        </Routes>
    </BrowserRouter>
  );
}

export default App;
