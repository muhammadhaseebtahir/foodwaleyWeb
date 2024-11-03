import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { useAuthContext } from './AuthContext'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { fireStore } from '../config/firebase'
import { message } from 'antd'
const CartContext  = createContext()

export default function CartContextProvider({children}) {
  const {isAuthentaction,user}= useAuthContext()
  const [cartItems, setCartItems] = useState([]);
  const MAX_CART_ITEMS = 10;
  const [isProcesingId,setIsProcessingId] = useState(false)

  const fetchCart = useCallback(async () => {
    if (!isAuthentaction || !user) return;

    const cartDoc = await getDoc(doc(fireStore, "carts", user.uid));
    if (cartDoc.exists()) {
        const items = cartDoc.data().items || [];
        setCartItems(items.slice(0, MAX_CART_ITEMS));
    } else {
        setCartItems([]);
        // message.info("Your cart is empty. Time to fill it up with goodies! 🎁");
    }
}, [isAuthentaction, user]);
  
   // Add item to cart
   const addToCart = async (product,selectedSize,quantity) => {
    setIsProcessingId(true)
    // console.log("isAuthentication123",isAuthentaction);
    console.log("Adding to cart:", product, selectedSize, quantity);
  
      if (!isAuthentaction || !user) {
          message.warning("Oops! You need to log in before you can add awesome items to your cart!");
          console.warn("User must be authenticated to add items to the cart.");
    setIsProcessingId(false)
  
          return;
      }
  
      const existingProductIndex = cartItems.findIndex(item => item.randomId === product.randomId);
      let updatedCart = [];
  
      if (existingProductIndex !== -1) {
          // Product exists, update quantity
          updatedCart = cartItems.map((item, index) =>
              index === existingProductIndex ? { ...item } : item
          );
        } else {
          // New product
          if (cartItems.length >= MAX_CART_ITEMS) {
            message.warning("Whoa! Your cart is full! Maybe time for a checkout spree? 🏃‍♂️");
            console.warn("Cart is full. Cannot add more items.");
            setIsProcessingId(false);
            return;
          }
         
         const {dishName,description,imageUrl,newPrice,oldPrice,randomId,cuisine,category}=product
          const newCartItem = { dishName,description,imageUrl,category,cuisine,newPrice,oldPrice,randomId,quantity, selectedSize };
        updatedCart = [...cartItems, newCartItem].slice(0, MAX_CART_ITEMS);
          message.success("Added to cart! 🎉 Get ready for the shopping party!");
        }
        
        setCartItems(updatedCart);
        await setDoc(doc(fireStore, "carts", user.uid), { items: updatedCart });
        message.info("Updated quantity! More of the good stuff! 😋");
        setIsProcessingId(false);
  
  };

  const removeFromCart = async (itemId) => {
    if (!user) return;
    try {
      const cartRef = doc(fireStore, "carts", user.uid);
      // Retrieve the current cart items from Firestore
      const cartSnapshot = await getDoc(cartRef);
      if (cartSnapshot.exists()) {
        const currentCartItems = cartSnapshot.data().items || [];
        // Filter out the item to be removed
        const updatedCartItems = currentCartItems.filter(
          (item) => item.id !== itemId
        );
        setCartItems(updatedCartItems);
  
        // Update the Firestore cart document with the new array
        await updateDoc(cartRef, {
          items: updatedCartItems,
        });
  
        message.success("Item removed from cart");
      }
    } catch (error) {
      message.error("Failed to remove item from cart");
    }
  };

  useEffect(() => {
    fetchCart();
}, [fetchCart]);
  return (
    <CartContext.Provider   value={{addToCart,removeFromCart,isProcesingId}}>
      {children}
    </CartContext.Provider>
  )
}

export const UseCartContext =()=> useContext(CartContext)