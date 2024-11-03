import React, { useRef, useState } from "react";

import Card from "../../../component/cards/Card";
// import {  womens } from "../../../component/Asset/card_images";
import {review} from "../../../component/Asset/customerReview"
import { instagrame } from "../../../component/Asset/logo";
import image1 from "../../../component/Asset/logo/resturent image1.jpg";
import image2 from "../../../component/Asset/logo/resturent 2.jpeg";
import image3 from "../../../component/Asset/logo/resturent 3.jpg";
import image4 from "../../../component/Asset/logo/returent 4.jpeg";


import {InstagramOutlined, LeftCircleOutlined,RightCircleOutlined} from "@ant-design/icons";
import { Button, Col, Row, Image, Space, Rate, Carousel } from "antd";
import { useNavigate } from "react-router-dom";

// import { fireStore } from "../../../config/firebase";
// import { collection, getDocs } from "firebase/firestore";
import { UseProductsContext } from "../../../context/ProductContext";

export default function NewArrival() {
  // const [document, setDocument] = useState([]);
const {products} = UseProductsContext()


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

  const navigate =useNavigate()

  const [limit, setLimit] = useState(4);
  const carouselRef = useRef(null);
  const handleNext = () => {
    carouselRef.current.next();
  };
  const handlePrev = () => {
    carouselRef.current.prev();
  };

  const carouselSettings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 3, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time

    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="container">
      <div className="newArrivals">
        <h1 className="text-center py-4 fw-bold">NEW ARRIVALS</h1>
        <div className=" d-flex flex-wrap justify-content-around  mt-4">
          {products.slice(0, limit).map((item, i) => (
            <Card key={i} value={item} onClick={()=>{navigate(`shop/product/${item.randomId}`,{state:{item}})}} />
          ))}
        </div>
        {limit < products.length ? (
          <div className=" text-center my-3">
            <Button
              className=" px-3"
              style={{ borderRadius: "20px" }}
              onClick={() => {
                setLimit(limit + 4);
              }}
            >
              View more
            </Button>
          </div>
        ) : (
          <div className=" text-center my-3">
            <Button
              className=" px-3"
              style={{ borderRadius: "20px" }}
              onClick={() => {
                setLimit(4);
              }}
            >
              View less
            </Button>
          </div>
        )}
      </div>
      <hr />
      <div className="topSelling">
        <h1 className="text-center py-4 fw-bold">TOP SELLING</h1>
        <div className="d-flex flex-wrap justify-content-around">
          {products.slice(0, limit).map((item, i) => (
            <Card key={i} value={item} onClick={()=>{navigate(`shop/product/${item.randomId}`,{state:{item}})}} />
            
            // <Card key={i} value={item} onClick={()=>{navigate(`shop/product/${item.randomId}`,{state:{item}})}}/>
          ))}
        </div>
        {limit < products.length ? (
          <div className="text-center ">
            <Button
              className="px-3"
              style={{ borderRadius: "20px" }}
              onClick={() => {
                setLimit(limit + 4);
              }}
            >
              View more
            </Button>
          </div>
        ) : (
          <div className="text-center ">
            <Button
              className="px-3"
              style={{ borderRadius: "20px" }}
              onClick={() => {
                setLimit(4);
              }}
            >
              View less
            </Button>
          </div>
        )}
      </div>

      <div
        className="brosweDressStyle mt-5  mb-3 pb-lg-4 "
        style={{ borderRadius: "30px", backgroundColor: "#F0F0F0" }}
      >
        <h2 className="text-center pt-5 pb-3" style={{ fontWeight: "700" }}>
          FOOD <span style={{color:"#f77f00"}}> WALEY </span> VIEW
        </h2>
        <Row gutter={[16, 16]} >
          <Col
            sm={{ span: 20, offset: 2 }}
            md={{ span: 8 }}
            style={{
              borderRadius: "10px",
              height: "200px",
              overflow: "hidden",
            }}
          >
            <img
              src={image1}
              alt="resturentImage"
              className="w-100 h-100 rounded-4"
              style={{ objectFit: "cover" }}
            />
          </Col>
          <Col
            sm={{ span: 22, offset: 1 }}
            md={{ span: 12 }}
            style={{
              borderRadius: "10px",
              height: "200px",
              overflow: "hidden",
            }}
          >
            <img
              src={image2}
                alt="resturentImage"
             className="h-100 w-100 rounded-4"
              style={{ objectFit: "cover", backgroundSize: "cover" }}
            />
          </Col>
          <Col
            sm={{ span: 22, offset: 1 }}
            md={{ span: 13 }}
            style={{
              borderRadius: "10px",
              height: "200px",
              overflow: "hidden",
            }}
          >
            <img
              src={image4}
               alt="resturentImage"
              className="h-100 w-100 rounded-4"
              style={{ objectFit: "cover", backgroundSize: "cover" }}
            />
          </Col>
          <Col
            sm={{ span: 22, offset: 1 }}
            md={{ span: 8, offset: 1 }}
            style={{
              borderRadius: "10px",
              height: "200px",
              overflow: "hidden",
            }}
          >
            <img
              src={image3}
             alt="resturentImage"
              className="w-100 h-100 rounded-4"
              style={{ objectFit: "cover", }}
            />
          </Col>
        </Row>
      </div>
    <div className="ourCustomer mt-4 mb-5">
      <div className="d-flex  align-items-center justify-content-between ">

<h2 className="fw-bold">OUR HAPPY <span style={{fontFamily:"revert"}}> CUSTOMERS </span></h2>
<div className="icon ">

<Space>
            <LeftCircleOutlined
              className="next-prve fs-4 rounded-circle"
              onClick={handlePrev}
              />
            <RightCircleOutlined
              className="next-prve fs-4 rounded-circle"
              onClick={handleNext}
              />
          </Space>
              </div>
      </div>
        <div className="gap-4">
    <Carousel {...carouselSettings} ref={carouselRef}>
        {review.map((item, i) => (
        <div
            className="card  p-3" // Add margin here for spacing
            key={i}     style={{
            width: "250px",
            maxWidth: "100%", // Prevents overflow
            height: "200px", 
            overflow: "hidden",
            }}          >
            <Rate style={{ fontSize: "13px" }} disabled defaultValue={5} />
            <p className="fw-bold mb-1">{item.name}</p>
            <p className="mb-0" style={{ fontSize: "14px", overflow: "auto" }}>{item.description}</p>
        </div>
        ))}
    </Carousel>
    </div>
    </div>
    <div className="my-5 px-5" style={{ backgroundColor: "#f0efeb" }}>
        <h2 className="text-center py-3">Follow Us on Instagram</h2>
        <Carousel autoplay {...carouselSettings}>
          {instagrame.map((items, i) => (
            <div
              key={i}
              className="py-4 image-container d-flex justify-content-center "
            >
              <Image
              className="bg-light"
                preview={false}
                src={items.image}
                
                width="200px"
                style={{ objectFit: "cover" }}
              />
              <div className="overlay-cont">
                <InstagramOutlined />
              </div>
            </div>
          ))}
        </Carousel>
      </div>


    </div>
  );
}
