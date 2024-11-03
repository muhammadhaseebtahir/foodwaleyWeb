import React, { useState } from "react";
import Index from "./Routes";
import {
  
  HomeOutlined,
  ProductOutlined,
  PlusOutlined,
  BarsOutlined,
  SettingOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;
function getItem(label, key, icon,onClick, children ) {
  return {
    key,
    icon,
    children,
    label,
    onClick,
  };
}

export default function App() {
 
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false);
  
  const items = [
    getItem('Home', '1',  <HomeOutlined />,() => navigate("/dashboard")),
  
    getItem('Products', 'sub1',<ProductOutlined />,()=>{},[
      getItem('Add   products', '3', <PlusOutlined />, () => navigate("/dashboard/addproduct")),
      getItem('All products', '4',<BarsOutlined />,()=>{navigate("/dashboard/showproducts")}),
      getItem('Final Order Products', '5',<BarsOutlined />,()=>{navigate("/dashboard/allorders")}),
      
    ]),
    getItem('Setting', 'sub2', <SettingOutlined />,()=>{}, [getItem('Account', '6')]),
    getItem('Profile', '9', <UserAddOutlined />),
  ];
  return (
    <Layout
      style={{
        minHeight: "100vh",
        
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Index />
      </Layout>
    </Layout>
  );
}
