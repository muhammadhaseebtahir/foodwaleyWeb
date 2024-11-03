import React, { useCallback, useEffect, useState } from "react";
import { Button, Image, Empty, Input } from "antd";
import { DeleteOutlined, MinusOutlined, PlusOutlined,TagOutlined,ArrowRightOutlined } from "@ant-design/icons";
// import shirt from "../../../component/Asset/logo/Rectangle 2.png"
import { doc, getDoc } from "firebase/firestore";
import { fireStore } from "../../../config/firebase";
import { useAuthContext } from "../../../context/AuthContext";
import { UseCartContext } from "../../../context/CartContext";
import { useNavigate } from "react-router-dom";

const ButtonGroup = Button.Group;

export default function Order() {

  const { user } = useAuthContext();
  const navigate =useNavigate()
  const [quantity, setQuantity] = useState(1);
  const { removeFromCart } = UseCartContext();
  const [cartItems, setCartItems] = useState([]);

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

  // console.log("cartItems",cartItems);
  // Using useMemo to calculate the total price
  const totalPrice = cartItems.reduce((total, item) => {
    return total + (item.newPrice * item.quantity); // Assuming item.newPrice is the price and item.quantity is the quantity
  }, 0);
  return (
    <div className="container mb-5">
      <h1 className="p-4" style={{ fontWeight: "900" }}>
        YOUR CART
      </h1>
      <div className="d-flex flex-wrap justify-content-between">
      <div
        className="CartMainBox border w-100 w-md-50  p-3 rounded-5 mb-sm-3 mb-md-0"
      >
        {cartItems.length > 0 ? (
          <div>
            {cartItems.map((item, i) => (
              <div
                className=" p-2  d-flex"
                key={i}
                style={{ outline: "none", border: "none" }}
              >
                <Image
                  src={item.imageUrl}
                  width={130}
                  height={100}
                  className="rounded-3"
                
                />

                <div className="ProductData w-100 d-flex justify-content-between ">
                  <div className="leftSide py-1 px-3">
                    <p className="mb-0 fw-bold " style={{ fontSize: "14px" }}>
                      {item.dishName}
                    </p>
                    <p
                      className="mb-0"
                      style={{ fontSize: "12px", color: "#ced4da" }}
                    >
                      {" "}
                      <span style={{ color: "#6c757d" }}>Size:</span>{" "}
                      {item.selectedSize}{" "}
                    </p>
                    <p style={{ fontSize: "12px", color: "#ced4da" }}>
                      {" "}
                      <span style={{ color: "#6c757d" }}>Color:</span>{" "}
                      {item.selectedColor}{" "}
                    </p>
                    <p className="mb-0 fw-bold" style={{ fontSize: "15px" }}>
                      ${item.newPrice}
                    </p>
                  </div>
                  <div className="rightSide  d-flex flex-end flex-column justify-content-between">
                    <Button
                      style={{ color: "red", border: "none", fontSize: "18px" }}
                      onClick={() => removeFromCart(item.id)}
                    >
                      <DeleteOutlined />
                    </Button>
                    <ButtonGroup>
                      <Button
                        onClick={() => {
                          quantity <= 1
                            ? setQuantity(1)
                            : setQuantity(quantity - 1);
                        }}
                        icon={<MinusOutlined />}
                      />
                      <Button>{quantity}</Button>
                      <Button
                        onClick={() => {
                          setQuantity(quantity + 1);
                        }}
                        icon={<PlusOutlined />}
                      />
                    </ButtonGroup>
                  </div>
                </div>
               <hr/>
              </div>
            ))}
          </div>
        ) : (
          <Empty description={"No items in cart"} />
        )}
      </div>
      <div className="AmountBox border rounded-5 p-5">
      <h5>Order Summary</h5>
      {cartItems.map((item, index) => (
        <div className="subTotal" key={index}>
          <p style={{ color: "#adb5bd" }}>{item.dishName}:</p>
          <p>${item.newPrice * item.quantity}</p>
        </div>
      ))}
      <hr />
      <div className="subTotal">
        <p>Total:</p>
        <p>${totalPrice}</p>
      </div>
      <div className="subTotal">
        <Input
          type="text"
          prefix={<TagOutlined />}
          className="bg-light rounded-5"
          placeholder="Add promo code"
        />
        <Button className="bg-dark text-light px-4 rounded-5 ms-1">Apply</Button>
      </div>
      <div className="text-center mt-3">
      <Button className="text-light px-5 rounded-5 " style={{backgroundColor:"#f77f00"}} onClick={()=>{navigate('/shop/cart/checkout')}}>Go to Checkout <ArrowRightOutlined /></Button>
      </div>
        
    
    </div>


</div>


    </div>
  );
}
