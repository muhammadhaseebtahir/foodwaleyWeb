import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import About from './About'
import Contact from './Contact'
import Header from '../../component/Header'
import Footer from '../../component/Footer'
import ProductDetail from './ProductDetails/ProductDetail'
import Order from './Order/Order'
import CheckOut from './CheckOut/CheckOut'

export default function index() {
  return (
    <>
<Header/>
    <main>
    <Routes>
      <Route index element={<Home/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} />
      <Route path='/shop/product/:id' element={<ProductDetail/>} />
      <Route path='/shop/cart' element={<Order/>} />
      <Route path='/shop/cart/checkout' element={<CheckOut/>} />
    </Routes>
    </main>
    <Footer/>
    </>
  )
}
