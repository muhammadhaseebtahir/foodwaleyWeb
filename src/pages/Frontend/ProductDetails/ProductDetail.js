import React, {  useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {review} from "../../../component/Asset/customerReview"
// import { mens } from "../../../component/Asset/card_images";


import { Rate, Space,Button } from "antd";
import { MinusOutlined, PlusOutlined,SafetyOutlined  } from '@ant-design/icons';
import Card from "../../../component/cards/Card";
import { UseCartContext } from "../../../context/CartContext";
// import { collection, getDocs } from "firebase/firestore";
// import { fireStore } from "../../../config/firebase";
import { UseProductsContext } from "../../../context/ProductContext";

const ButtonGroup = Button.Group;
export default function ProductDetail() {
    const {addToCart,isProcesingId} = UseCartContext()
const {products}= UseProductsContext()

    const location = useLocation();
    const navigate =useNavigate()
  const loaction = useLocation();
  const { item } = loaction.state || [];
  const [quantity,setQuantity] =useState(1)
  const [limit,setLimit] = useState(4)
  const [selectedSize, setSelectedSize] = useState(null);
  // const [selectedColor, setSelectedColor] = useState(null);

  // const [document, setDocument] = useState([]);
  // useEffect(() => {
  //   const fetchDocument = async () => {
  //           const array = [];
  //     const querySnapshot = await getDocs(collection(fireStore, "products"));
  //     querySnapshot.forEach((doc) => {
  //       let data = doc.data();
  //       array.push(data);        
  //    });
  //     setDocument(array);    
  //   };
  //   fetchDocument();
  // }, []);

  // const handleColorSelect = (color) => {setSelectedColor(color) };
  const handleSizeSelect = (size) => setSelectedSize(size);
  return (
    <div className="container">
      <div className="imageProduct d-flex my-5  gap-2 flex-wrap">
        <div className="verticalimage d-flex  flex-md-row flex-lg-column  justify-content-around">
          <div className="verticlaImage1 imagesmall ">
            <img src={item.imageUrl} className="w-100 h-100" alt="productImage" />
          </div>
          <div className="verticlaImage2  imagesmall  ">
            <img src={item.imageUrl} className="w-100 h-100" alt="productImage" />
          </div>
          <div className="verticlaImage3 imagesmall ">
            <img src={item.imageUrl} className="w-100 h-100" alt="productImage" />
          </div>
        </div>
        <div className="horizantelImage ">
          <img
            src={item.imageUrl}
            className="imagehorizantel"
            alt="productImage"
          />
        </div>
        <div className="productData  p-3">
               
                <h3 className="mb-0 " style={{ fontWeight: "900" }} >
            {item.dishName}
          </h3>                  
            <Space>
              <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                ${item.newPrice}
              </span>
              <del style={{ color: "#6c757d", fontSize: "20px" }}>
                ${item.oldPrice}
              </del>
              <span
                style={{
                  backgroundColor: "#ffc6ff",
                  opacity: "0.5",
                  padding: "0 15px",
                  color: "#ee4266",
                  borderRadius: "20px",
                  fontSize: "14px",
                }}
              >
                20%
              </span>
            </Space>
          
           <p style={{ color: "#6c757d", fontSize: "13px", paddingTop: "10px" }}>
            {item.description}
          </p>
          <Rate style={{ fontSize: "13px" }} disabled defaultValue={4} />
          <Space>
                </Space>
         <hr style={{color:"#adb5bd"}}/>
         <p style={{ color: "#6c757d", fontSize: "14px" ,marginBottom:"5px"}}>Choose Size</p>
            <Space>
          {item.sizes.map((size,index) => (
               <div 
               key={index}
               className={`sizeOption ${selectedSize === size ? 'active' : ''}`}
               onClick={() => handleSizeSelect(size)}
           >
               {size}
           </div>
          ))}
        </Space>
        <hr style={{color:"#adb5bd"}}/> 
        <Space  className="p-2">

        <ButtonGroup>
                <Button className="p-3"  onClick={()=>{ quantity<= 1 ? setQuantity(1):setQuantity(quantity-1)}}  icon={<MinusOutlined />} />
                <Button className="p-3">{quantity}</Button>
                <Button className="p-3" onClick={()=>{setQuantity(quantity+1)}} icon={<PlusOutlined />} />
        </ButtonGroup> 
 
                <Button  className=" text-light " style={{padding:"5px 100px", backgroundColor:"#fb8500", borderRadius:"20px" }}     loading={isProcesingId} onClick={()=>{addToCart(item,selectedSize,quantity)}}>Add to cart</Button>
      </Space>
        </div>

      </div>
      <div className="CustomerReview">
     <Space> <h5 className="pb-3">All Reviews </h5> <p style={{color:"#bbd1ea",fontSize:"14px"}}>({review.length})</p></Space>
      
      <div className="d-flex flex-wrap justify-content-around">

      {review.slice(0,limit).map((item, i) => (
        <div
             className="card  p-3" // Add margin here for spacing
            key={i}     style={{
            width: "550px",
            maxWidth: "100%", // Prevents overflow
            height: "170px", 
            overflow: "hidden",
            marginBottom:"8px"
            }}          >
            <Rate style={{ fontSize: "13px" }} disabled defaultValue={5} />
            <p className="fw-bold mb-1">{item.name} <SafetyOutlined style={{backgroundColor:"#0ead69",borderRadius:"30px"}}/></p>
            <p className="mb-0" style={{ fontSize: "14px", overflow: "auto" }}>{item.description}</p>
        </div>
        ))}
       
      </div>
      {limit< review.length?(
            <div className="text-center">
           <Button className="px-4 my-3" style={{borderRadius:"20px"}} onClick={()=>{setLimit(limit+2)}}>Load More Reviews</Button>
            </div>
        ):<div className="text-center">
        <Button className="px-3 my-4" style={{borderRadius:"20px"}} onClick={()=>{setLimit(4)}}>See Less</Button>
         </div>

        }
      </div>
     <div className="youLikeProduct mt-4">
        <h1 className="text-center" style={{fontWeight:"900"}}>YOU MIGHT ALSO LIKE</h1>
        <div className=" d-flex flex-wrap justify-content-around  mt-4">
          {products.slice(0, 8).map((item, i) => (
             <Card 
             key={i} 
             value={item} 
             onClick={() => {
               if (location.pathname === `/shop/product/${item.randomId}`) {
                 // Same route: update state only
                 navigate(`/shop/product/${item.randomId}`, { replace: true, state: { item } });
               } else {
                 // Different route: navigate normally
                 navigate(`/shop/product/${item.randomId}`, { state: { item } });
               }
             }} 
           />
          ))}
        </div>
     </div>
    </div>
  );
}
