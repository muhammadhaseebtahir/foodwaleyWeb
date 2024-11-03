import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import AddProduct from './AddProduct'
import ShowProduct from './ShowProducts'
import UpdateProduct from './UpdateProduct/UpdateProduct'
import FinalProducts from './FinalProducts/FinalProducts'

export default function Index() {
  return (
    <Routes>
      <Route index  element={<Home/>} />
      <Route path='/addproduct'  element={<AddProduct/>} />
      <Route path='/showproducts'  element={<ShowProduct/>} />
      <Route path='/updateProduct' element={<UpdateProduct/>} />
      <Route path='/allorders' element={<FinalProducts/>}/>
    </Routes>
  )
}
