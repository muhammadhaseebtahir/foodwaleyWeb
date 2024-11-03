import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { fireStore } from '../../../config/firebase';
import {  Image, Button, message, Spin } from "antd";
import { useAuthContext } from '../../../context/AuthContext';

export default function FinalProducts() {
    const [products, setProducts] = useState([]);  
    const {user} =useAuthContext() 

    const fetchProducts = async () => {
        try {
            const querySnapshot = await getDocs(collection(fireStore, "finalProducts"));
            const productsArray = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productsArray);
        } catch (error) {
            console.error("Error fetching documents: ", error);
            message.error("Failed to fetch products.");
        }
    };

    useEffect(() => {
        fetchProducts(); // Initial fetch on component mount
    }, []);

    const contentStyle = {
        padding: 50,
        background: "rgba(0, 0, 0, 0.05)",
        borderRadius: 4,
    };

    const content = <div style={contentStyle} />;
    
    return (
        <div className="container">
            <h1 className="text-center my-4">All Products</h1>

            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th scope="col">#id</th>
                            <th scope="col">Image</th>
                            <th scope="col">User Name</th>
                            <th scope="col">Eamil</th>
                            <th scope="col">User UId</th>
                            <th scope="col">Dish Name</th>
                            <th scope="col">Cuisine</th>
                            <th scope="col">New Price</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan="9" className="text-center">
                                    <Spin tip="Loading" size="large">
                                        {content}
                                    </Spin>
                                </td>
                            </tr>
                        ) : (
                            products.map((product, i) => {
                                const { items } = product; // Destructure to get items
                                return (
                                    items.cartItems.map((item, j) => (
                                        <tr key={`${i}-${j}`}>
                                            <th scope="row">{j + 1}</th>
                                            <th scope="row">
                                                <Image
                                                    width={80}
                                                    height={80}
                                                    src={item.imageUrl}
                                                    alt="Product Image"
                                                    style={{ objectFit: "cover", borderRadius: "50px" }}
                                                />
                                            </th>
                                            <td>{user.fullName}</td>
                                            <td>{user.email}</td>
                                            <td>{item.dishName}</td>
                                            <td>{user.uid}</td>
                                            <td>{item.category}</td>
                                            <td>{item.newPrice}</td>
                                            <td>
                                               
                                                    <Button className='text-success' style={{borderColor:"green"}}>
                                                    Active
                                                    </Button>
                                                   
                                            </td>
                                        </tr>
                                    ))
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
            {/* {limit < products.length ? (
                <div className="row">
                    <div className="col text-center my-3">
                        <Button
                            type="primary"
                            onClick={() => {
                                setLimit(limit + 2);
                            }}
                        >
                            View more
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="row">
                    <div className="col text-center my-3">
                        <Button
                            onClick={() => {
                                setLimit(5);
                            }}
                        >
                            See less
                        </Button>
                    </div>
                </div>
            )} */}
        </div>
    );
}
