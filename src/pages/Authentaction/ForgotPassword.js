import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';

import {Row,Col,Input,Form,Typography, Button, message} from "antd"
import {  MailOutlined } from "@ant-design/icons";

import { auth} from '../../config/firebase';
import {  sendPasswordResetEmail,} from 'firebase/auth';

import { isEmail } from '../../config/global';



const {Title} = Typography;
const initialize= {email:""}

export default function Register() {
  
  const navigate =useNavigate()
  const [state ,setState] =useState(initialize)
  const [isProcessing,setIsProcessing] = useState(false)

  const handleChange =(e)=>{
    setState(s=> ({...s,[e.target.name]:e.target.value}));
  }

  const handleSubmit =(e)=>{
  e.preventDefault()

let {email} = state;

if (!isEmail(email)) { return message.error("Please enter a valid email address.") }

setIsProcessing(true)
if(email){

  sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    message.success("password reset send email")
    // ..
  })
  .catch((error) => {
    message.error(`Error ${error}`)
    
    // ..
  }).finally(()=>{
    setIsProcessing(false)
    navigate("/home")
    
  })
  
}
else{
  message.error("Please enter you email")
}
  }





  return (
   
    <main>
      <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light ">
        <div className="card shadow p-3" style={{width:500}}>
          <Title level={2} className="text-center py-2">Forgot Password</Title>
          <Form>
        <Row gutter={[20,20]} >
        
          <Col  span={20} offset={2}>
      <Input size="large" prefix={<MailOutlined />} placeholder='Enter your email'  onChange={handleChange} value={state.email} name="email"/>     
         
          </Col>
         
          <Col span={20} offset={2}>
      <Button type='primary' size="large" block  onClick={handleSubmit} loading={isProcessing} >Login</Button>
          </Col>
        </Row>             
      </Form>
      <Row>
        </Row> 
        </div>
      </div>
      </main>
   

  )
}
