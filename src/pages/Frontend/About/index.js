import React from 'react';
import { Layout, Row, Col, Card, Typography, Divider } from "antd";
import { PhoneOutlined, MailOutlined, HomeOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export default function About() {
  return (
    <Layout style={{ backgroundColor: "#f0f2f5" }}>
      <Content style={{ padding: '50px' }}>
        <Card 
          bordered={false}
          style={{ backgroundColor: "#ffffff", borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}
        >
          <Title level={2} style={{ color: '#f77f00', textAlign: 'center' }}>
            About Foodwaley
          </Title>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#595959' }}>
            Welcome to Foodwaley, your go-to destination for delicious meals that tantalize your taste buds! We pride ourselves on serving high-quality dishes made from the freshest ingredients, ensuring a delightful dining experience for every guest.
          </Paragraph>
          <Paragraph style={{ fontSize: '16px', lineHeight: '1.8', color: '#595959' }}>
            Our mission is to bring joy through food. Whether you’re dining in or ordering for delivery, we are committed to providing an exceptional experience with every meal. Explore our diverse menu crafted with love and passion for food.
          </Paragraph>
          <Divider />
          <Title level={3} style={{ color: '#1890ff', textAlign: 'center' }}>
            Contact Us
          </Title>
          <Row gutter={[16, 16]} justify="center" style={{ marginTop: '20px' }}>
            <Col xs={24} sm={12} md={8}>
              <Card 
                hoverable
                style={{ textAlign: 'center', backgroundColor: '#e6f7ff', borderRadius: '10px' }}
              >
                <PhoneOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
                <Paragraph style={{ fontSize: '16px', marginTop: '10px', color: '#595959' }}>
                  +92 300 1234567
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card 
                hoverable
                style={{ textAlign: 'center', backgroundColor: '#fff1b8', borderRadius: '10px' }}
              >
                <MailOutlined style={{ fontSize: '24px', color: '#faad14' }} />
                <Paragraph style={{ fontSize: '16px', marginTop: '10px', color: '#595959' }}>
                  support@foodwaley.com
                </Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Card 
                hoverable
                style={{ textAlign: 'center', backgroundColor: '#ffe7ba', borderRadius: '10px' }}
              >
                <HomeOutlined style={{ fontSize: '24px', color: '#fa8c16' }} />
                <Paragraph style={{ fontSize: '16px', marginTop: '10px', color: '#595959' }}>
                  123 Food Street, Lahore, Pakistan
                </Paragraph>
              </Card>
            </Col>
          </Row>
        </Card>
      </Content>
    </Layout>
  );
};
