import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Authorize from './middlewares/Authorize';
import AddProduct from './pages/admin/AddProduct';
import Order from './pages/admin/Order';
import OrderDetail from './pages/admin/OrderDetail';
import Cart from './pages/Cart';
import GetUser from './pages/GetUser';
import Home from './pages/Home';
import Login from './pages/Login';
import ProductDetail from './pages/ProductDetail';
import Register from './pages/Register';
import Transaction from './pages/Transaction';
import TransactionDetail from './pages/TransactionDetail';
import {useEffect, useState} from "react";
import NotFound from './pages/404';
import Search from './pages/Search';

import {useDispatch} from "react-redux";
import {loginSlice} from "./redux/authSlice";
import AdminProduct from './pages/admin/AdminProduct';


function App() {
  
  const [changes, setChanges] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loginSlice());
  }, [changes]);
  
  return (
    <BrowserRouter>
      <div className="App bg-slate-500 min-h-screen">
        <Routes>
          <Route path="/login" element={<Login setChanges={setChanges} />} />
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/user" element={<GetUser />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:product_id" element={<ProductDetail />} />
            <Route element={<Authorize />}>
              <Route path="/cart" element={<Cart />} />
              <Route path="/transaction" element={<Transaction />} />
              <Route path="/transaction/:order_id" element={<TransactionDetail />} />
            </Route>
          //admin
          <Route element={<Authorize />}>
            <Route path="/order" element={<Order />} />
            <Route path="/order/:order_id" element={<OrderDetail />} />
            <Route path="/product/add" element={<AddProduct />} />
            <Route path='/product' element={<AdminProduct />} />
            <Route path='/admin' element={<Order />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
