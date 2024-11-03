import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAuthContext } from "../../context/AuthContext";

import {
  Badge,
  Button,
  Space,
  Dropdown,
  List,
  Avatar,
  Empty,
  Typography,
  message,
} from "antd";
import { fireStore } from "../../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { UseCartContext } from "../../context/CartContext";

const { Title } = Typography;
export default function Header() {
  const { isAuthentaction, user, isAdmin, handleLogout } = useAuthContext();
  const [Admin, setAdmin] = useState();
  const { removeFromCart } = UseCartContext();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    let Admin = isAdmin;
    setAdmin(Admin);
    const handleScreenSize = () => {
      if (window.innerWidth < 992) {
        setIsCartOpen(false);
            }
    };
    window.addEventListener("resize", handleScreenSize);

    const fetchCart = () => {
      if (!isAuthentaction || !user) return;

      const cartRef = doc(fireStore, "carts", user.uid);

      // Real-time listener for cart changes
      const unsubscribe = onSnapshot(cartRef, (cartDoc) => {
        if (cartDoc.exists()) {
          const items = cartDoc.data().items || [];
          setCartItems(items);
        } else {
          setCartItems([]);
          message.info(
            "Your cart is empty. Time to fill it up with goodies! 🎁"
          );
        }
      });

      return () => unsubscribe();
    };

    if (isAuthentaction) fetchCart();

    return () => window.removeEventListener("resize", handleScreenSize);
  }, [isAuthentaction, user, isAdmin]);

  const DropdownCart = ({ cart }) => {
    return (
      <div
        className="card"
        style={{
          width: "400px",
          maxHeight: cart.length > 5 ? "350px" : "auto",
          overflowY: cart.length > 5 ? "scroll" : "visible",
        }}
      >
        {cart.length > 0 ? (
          <List
            itemLayout="horizontal"
            dataSource={cart}
            renderItem={(item) => (
              <List.Item
                className="px-2"
                actions={[
                  <Button
                    key="list-loadmore-edit"
                    style={{ color: "red", border: "none", fontSize: "18px" }}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <DeleteOutlined />
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.imageUrl} size={70} shape="square" />}
                  title={<Title level={4}>{item.productName}</Title>}
                  description={`Price: $${item.newPrice}`}
                />
              </List.Item>
            )}
          />
        ) : (
          <Empty description={"No items in cart"} />
        )}
        <hr />
        <button
          className="btn btn-md my-2 mx-2 border wishList"
          onClick={() => {
            navigate("/shop/cart");
          }}
        >
          View Cart
        </button>
        <button className="btn btn-md my-2 mx-2 border wishList bg-dark text-light">
          CheckOut
        </button>
      </div>
    );
  };

  return (
    <header style={{ position: "sticky", zIndex: 1000, top: 0 }}>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
        <div className="container">
          <Link to="/" style={{ textDecoration: "none" }}>
            <h3 style={{ fontWeight: "bold", color: "black" }}>FOOD <span style={{color:"#f77f00",fontFamily:"inherit"}}> WALEY.</span>CO</h3>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/about"
                  className="nav-link active"
                  aria-current="page"
                >
                  About
                </Link>
              </li>

              

              <li className="nav-item">
                <Link
                  to="/contact"
                  className="nav-link active"
                  aria-current="page"
                >
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/shop/cart"
                  className="nav-link active"
                  aria-current="page"
                >
                  Order
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              {!isAuthentaction ? (
                <Button className=" text-light " style={{backgroundColor:"#fb8500"}} onClick={() => navigate("/auth/login")}>
                  Login
                </Button>
              ) : (
                <Space>
                  {!Admin ? (
                    <Button type="primary" onClick={handleLogout}>
                      Logout
                    </Button>
                  ) : (
                    <Space>
                      <Button className=" text-light " style={{backgroundColor:"#fb8500"}} onClick={handleLogout}>
                        Logout
                      </Button>
                      <Button
                             className=" text-light " style={{backgroundColor:"#fb8500"}}
                        onClick={() => navigate("/dashboard")}
                      >
                        Dashboard
                      </Button>
                    </Space>
                  )}
                  <Dropdown
                    className="d-sm-none d-md-block"
                    placement="bottomRight"
                    trigger={"click"}
                    dropdownRender={() => <DropdownCart cart={cartItems} />}
                  >
                    <Badge count={cartItems.length} showZero>
                      <ShoppingCartOutlined className="cart-count fs-3" />
                    </Badge>
                  </Dropdown>
                  {/* ************Small Screen******** */}

                  <Button className="d-sm-block d-md-none"
                    style={{
                      border: "none",
                      outline: "none",
                      backgroundColor: "transparent",
                    }}
                  >
                    <Badge count={cartItems.length} showZero>
                      <ShoppingCartOutlined
                        className="cart-count fs-3"
                        onClick={() => {
                          navigate("/shop/cart");
                        }}
                      />
                    </Badge>
                  </Button>
                </Space>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
