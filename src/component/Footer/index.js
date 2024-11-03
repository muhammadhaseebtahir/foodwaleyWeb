import React from 'react';
import { Row, Col, Typography, Input, Button, Space } from "antd";
import { FacebookFilled, TwitterSquareFilled, InstagramFilled } from "@ant-design/icons";
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="container">
          <Row gutter={[16, 16]} className="footer-content">
            <Col xs={24} sm={12} md={6}>
              <Title level={4} className="footer-title">
                About Foodwaley
              </Title>
              <Text className="footer-text">
                At Foodwaley, we serve delicious meals made with the freshest ingredients. Join us for a memorable dining experience!
              </Text>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Title level={4} className="footer-title">
                Quick Links
              </Title>
              <ul className="footer-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/menu">Menu</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Title level={4} className="footer-title">
                Contact Us
              </Title>
              <Text className="footer-text">
                Email: support@foodwaley.com <br />
                Phone: +92 300 1234567 <br />
                Address: 123 Food Street, Lahore, Pakistan
              </Text>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Title level={4} className="footer-title">
                Newsletter
              </Title>
              <Space direction="vertical">
                <Text className="footer-text">
                  Subscribe to our newsletter for the latest updates and special offers.
                </Text>
                <Input placeholder="Enter your email" className="newsletter-input" />
                <Button type="primary">Subscribe</Button>
              </Space>
            </Col>
          </Row>
          <Row justify="center" className="social-icons">
            <Space size="middle">
              <FacebookFilled style={{ fontSize: '24px', color: '#3b5998' }} />
              <TwitterSquareFilled style={{ fontSize: '24px', color: '#1da1f2' }} />
              <InstagramFilled style={{ fontSize: '24px', color: '#e1306c' }} />
            </Space>
          </Row>
          <Row justify="center" className="footer-bottom">
            <Col>
              <Text className="footer-text">
                &copy; 2024 Foodwaley. All Rights Reserved.
              </Text>
            </Col>
          </Row>
        </div>
      </footer>
    </>
  );
}
