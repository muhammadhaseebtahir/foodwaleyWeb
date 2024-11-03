import { collection, getDocs } from 'firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { fireStore } from '../config/firebase';

 const ProductsContext = createContext();

 export default function  ProductContext  ({ children })  {
    const [products, setProducts] = useState([]);   


    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(fireStore, "products"));
        const productsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsArray);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };
  
    useEffect(() => {
      fetchProducts(); // Initial fetch on component mount
    }, []);

  return (
    <ProductsContext.Provider value={{products,setProducts,fetchProducts}}>
      {children}
    </ProductsContext.Provider>
  );
};

// export default ProductsContextProvider ;
export const UseProductsContext=()=>useContext(ProductsContext)
