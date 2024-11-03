import React from 'react'
import { useAuthContext } from '../../../context/AuthContext';
import { Button, Space } from 'antd';
import { ArrowLeftOutlined} from "@ant-design/icons";

import { useNavigate } from 'react-router-dom';

export default function Home() {
  const {user,handleLogout} = useAuthContext();
  const navigate = useNavigate()
  return (
    <div className='card shadow w-75 mt-5 p-3 d-flex flex-column justify-content-center align-items-center '>
      <h3>Email: {user.email}</h3>
      <h3>Uid: {user.uid}</h3>
      <div className="d-flex">
<Space>

      <Button danger onClick={handleLogout} >Logout</Button>
      <Button type='primary' onClick={()=>navigate("/")} ><ArrowLeftOutlined /> GoTo Frontend</Button>
</Space>
      </div>
    </div>
  )
}
