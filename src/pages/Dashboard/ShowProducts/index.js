
import React, {  useState } from "react";
import { useNavigate } from "react-router-dom";

import { Space, Image, Button, message, Spin } from "antd";

import { fireStore, storage } from "../../../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { UseProductsContext } from "../../../context/ProductContext";




export default function ShowProduct() {
  const [limit, setLimit] = useState(5);
  const {products,setProducts} = UseProductsContext()
  const navigate = useNavigate(); 

  const handleDelete = async (itemId, image) => {
    const desertRef = ref(storage, image);
    try {
        await deleteObject(desertRef);
        await deleteDoc(doc(fireStore, "products", itemId));
        message.success("Successfully Deleted Product");

        setProducts((products) => 
            products.filter((item) => item.randomId !== itemId)
        );
    } catch (error) {
        message.error("Error Deleting Product");
    } finally {
        // If you have any cleanup actions, they can go here
    }
};
  

 
const contentStyle = {
  padding: 50,
  background: "rgba(0, 0, 0, 0.05)",
  borderRadius: 4,
};

const content = <div style={contentStyle} />;
  return (
    <div className="container">
      <h1 className="text-center my-4">All Products</h1>

      {/* <Table columns={columns} dataSource={document} rowKey="id" loading={isLoading} /> */}
      <div className="table-responsive">
        <table className="table table-hover align-middle">
          <thead>
          <tr>
              <th scope="col">#id</th>
              <th scope="col">Image</th>
              <th scope="col">Dish Name</th>
              <th scope="col">Category</th>
              <th scope="col">Old Price</th>
              <th scope="col">New Price</th>
              <th scope="col">Cuisine</th>
              <th scope="col">Description</th>
              <th scope="col">Action</th>
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
            // {
              products.slice(0, limit).map((items, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{i + 1}</th>
                    <th scope="row">
                      {" "}
                      <Image
                        width={80}
                        height={80}
                        src={items.imageUrl}
                        alt="Product Image"
                        style={{ objectFit: "cover", borderRadius: "50px" }}
                      />
                    </th>
                    <td>{items.dishName}</td>
                    <td>{items.category}</td>
                    <td>{items.oldPrice}</td>
                    <td>{items.newPrice}</td>
                    <td>{items.cuisine}</td>
                    <td>{items.description}</td>
                    <td>
                      <Space>
                        {" "}
                        <Button
                          onClick={() => {
                            navigate("/dashboard/updateProduct", {
                              state: items,
                            });
                          }}
                        >
                          Update
                        </Button>{" "}
                        <Button
                          danger
                          onClick={() =>
                            handleDelete(items.randomId, items.imageUrl)
                          }
                        >
                          Delete
                        </Button>
                      </Space>
                    </td>
                  </tr>
                );
              })
            )}
{/* //  } ) } */}
          </tbody>
        </table>
      </div>
      {limit < products.length ? (
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
      )}
    </div>
  );
}

