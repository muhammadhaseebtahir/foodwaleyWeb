import React, { useCallback, useEffect, useState } from 'react'
import { Button, Checkbox, Col, Form, Input,  message,  Row,  } from 'antd'
import {  UserOutlined,LockOutlined } from "@ant-design/icons";
import { isEmail } from '../../../config/global';
import { useAuthContext } from '../../../context/AuthContext';
import { deleteDoc, doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { fireStore } from '../../../config/firebase';
const initialize = {
  firstName:"",
  lastName:"",
  streetAddress:"",
  city:"",
  stateArea:"",
  zipCode:"",
  email:"",
  phoneNo:""

}
export default function CheckOut() {
const [state,setState]=useState(initialize)
const {user}= useAuthContext()
const [cartItems, setCartItems] = useState([]);

const [isProcessing,setIsProcessing]=useState(false)

const handleChange=(e)=>{
setState(s=>({...s,[e.target.name]:e.target.value}))
}

const fetchCart = useCallback(async () => {
  const cartDoc = await getDoc(doc(fireStore, "carts", user.uid));
  if (cartDoc.exists()) {
    const items = cartDoc.data().items || [];
    setCartItems(items);
  } else {
    setCartItems([]);
  }
}, [user]);
useEffect(() => {
  fetchCart();
}, [fetchCart]);


const handleSubmit= async(e)=>{
  e.preventDefault()
  setIsProcessing(true)

if(cartItems.length<1){
  message.error("Please add products to the cart before checking out.");
  setIsProcessing(false)
return
}

 const {firstName,lastName,streetAddress,city,stateArea,zipCode,email,phoneNo}= state

if (firstName.length < 3) {   message.error("Please enter your full name",);setIsProcessing(false)
   return  }
if (lastName.length < 3) {   message.error("Please enter your full name",);setIsProcessing(false)
  return }

if (!isEmail(email)) {  message.error("Please enter a valid email address.") 
  setIsProcessing(false)
   return
}


const formData ={firstName,lastName,streetAddress,city,stateArea,zipCode,email,phoneNo,uid:user.uid , randomId: window.randomId(),dateCreated:serverTimestamp(),cartItems}
try{
  await createData(formData)  
  await deleteDoc(doc(fireStore, "carts", user.uid));
  message.success("Your information is successfully submitted. Your order is confirmed!");
  setCartItems([]); // Clear cart items in the UI
  setState(initialize);
}catch (error) {
  console.error("Error processing checkout: ", error);
  message.error("Failed to complete checkout.");
} finally {
  setIsProcessing(false);
}



  
}

const createData =async(formData)=>{
  try {
    await setDoc(doc(fireStore, "finalProducts",formData.randomId ),{items: formData});
  } catch (error) {
    console.error("Error adding product: ", error);
  
  }

}


  return (
    <div className='container-fluid bg-light'>
     <div className="container py-5">
       <div className="mainCheckOutBox  py-5 rounded-4" style={{backgroundColor:"white"}}>
        <h4 className='text-center pb-4'>Delivery Address</h4>
        <Form>
        <Row gutter={[16,16]}>
         <Col sm={{span:22,offset:1}} md={{span:10,offset:2}} >
         <label className="form-label" >
        First Name <span style={{ color: 'red' }}>*</span>
      </label>
         <Input  type='text'  className='py-2'    prefix={<UserOutlined />} placeholder='First name' onChange={handleChange} value={state.firstName} name="firstName"/>
         </Col>
         <Col sm={{span:22,offset:1}} md={{span:9,}} >
         <label className="form-label" >
        Last Name <span style={{ color: 'red' }}>*</span>
      </label>
      <Input type="text" className="py-2"  prefix={<UserOutlined />}  placeholder="Last name" onChange={handleChange} value={state.lastName} name="lastName" />
   
         </Col>
         <Col  sm={{span:22,offset:1}} md={{span:20,offset:2}}>
         <label className="form-label" >
        Street Address <span style={{ color: 'red' }}>*</span>
      </label>
      <Input type="text" className="py-2"    placeholder="Street Address" onChange={handleChange} value={state.streetAddress} name="streetAddress"/>
   
         </Col>
         
         <Col sm={{span:22,offset:1}} md={{span:8,offset:2}}  >
         <label className="form-label" >
        City <span style={{ color: 'red' }}>*</span>
      </label>
      <Input type="text" className="py-2"    placeholder="City" onChange={handleChange} value={state.city} name="city" />
   
         </Col>
         <Col sm={{span:22,offset:1}} md={{span:4}}  >
         <label className="form-label" >
        State<span style={{ color: 'red' }}>*</span>
      </label>
      <Input type="text" className="py-2"    placeholder="State" onChange={handleChange} value={state.stateArea} name="stateArea"/>
   
         </Col>
         <Col sm={{span:22,offset:1}} md={{span:6}}  >
         <label className="form-label" >
        Zip Code <span style={{ color: 'red' }}>*</span>
      </label>
      <Input type="text" className="py-2"    placeholder="Zip Code" onChange={handleChange} value={state.zipCode} name="zipCode"/>
   
         </Col>
        
        <Col span={20} offset={2}>
        <h5>Contact Info</h5>
        </Col>

             <Col sm={{span:22,offset:1}} md={{span:10,offset:2}}  >
         <label className="form-label" >
       Email for order Tracking <span style={{ color: 'red' }}>*</span>
      </label>
      <Input type="text" className="py-2"    placeholder="Email for order Tracking"  onChange={handleChange} value={state.email} name="email"/>
   
         </Col>
             <Col sm={{span:22,offset:1}} md={{span:9}}  >
         <label className="form-label" >
       Phone for Delivery Contact <span style={{ color: 'red' }}>*</span>
      </label>
      <Input type="number" className="py-2"    placeholder="Phone for Delivery Contact"  onChange={handleChange} value={state.phoneNo} name="phoneNo"/>
   
         </Col>
         <Col span={20} offset={2}>
         <p style={{color:"#adb5bd"}} ><LockOutlined /> Your privacy is important to us.View our privacy here.</p>
         </Col>
         <Col span={20} offset={2} >
           <Checkbox style={{color:"#adb5bd"}}> Get text alerts for your order on your mobile.</Checkbox> 
         </Col>
         <Col span={20} offset={2} className='text-center' >
          <Button className='w-50  text-light' style={{backgroundColor:"#f77f00"}} loading={isProcessing} onClick={handleSubmit}>Proceed to Savings & Payments</Button>
         </Col>


        </Row>
        </Form>
       </div>


     </div>

    </div>
  )
}
