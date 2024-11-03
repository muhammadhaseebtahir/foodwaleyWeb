import React from "react";
import { Image, Button } from "antd";
import heroImage from "../../../component/Asset/logo/hero.png";
import heroImage2 from "../../../component/Asset/logo/hero.png";


export default function Herobar() {
 

  return (
    <div className="hero-section">
  <div className="d-none d-md-block">
 <div
  className="d-flex flex-md-row flex-column "
  style={{ height: "90vh", backgroundColor: "#F2F0F1" }}
>
  {/* Left side with text content */}
  <div className="p-4 d-flex flex-column justify-content-center" style={{ flex: "1", width: "50%" }}>
    <h1 className="hero-title">EXPLORE OUR DELICIOUS MENU</h1>

    <p style={{ color: "#6c757d" }}>
      Dive into a world of flavors with our curated selection of dishes, crafted
      to tantalize your taste buds and make every meal a memorable experience.
    </p>
    
    <button
      size="large"
      className="btn shop-now-button"
      style={{ marginTop: "20px", width: "150px" }} // Adjust width here
    >
      Order Now
    </button>

    <div className="evaluation-shop mt-4 d-flex flex-wrap justify-content-between">
      <div className="box text-center">
        <h3>100+</h3>
        <p>Signature Dishes</p>
      </div>
      <div className="box text-center">
        <h3>500+</h3>
        <p>Happy Customers</p>
      </div>
      <div className="box text-center">
        <h3>24/7</h3>
        <p>Delivery Service</p>
      </div>
    </div>
  </div>

  {/* Right side with background image */}
  <div
    style={{
      backgroundImage: `url(${heroImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      flex: "1",
      height: "100%",
    }}
  ></div>
</div>
</div>

      {/* **********Small Screen********* */}
      <div
        className="hero d-block d-md-none"
        style={{ backgroundColor: "#F2F0F1" }}
      >
        <div className="div ">
          <h1 className="hero-title">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>

          <p className="text-1" style={{ color: "#6c757d" }}>
            Browse through our diverse range of meticulously crafted
            garments,designed <br /> to bring out your individuality and cater
            to your sense of style.
          </p>
          <Button size="large" className="shop-now-button">
            Shop Now
          </Button>
          <div className="evaluation-shop mt-4 d-flex flex-wrap justify-content-between">
            <div className="box ">
              <h3>200+</h3>
              <p>International Brands</p>
            </div>
            <div className="box ">
              <h3>2,000+</h3>
              <p>High-Quality Products</p>
            </div>
            <div className="box">
              <h3>30,000+</h3>
              <p>Happy Customer</p>
            </div>
          </div>
        </div>
        <div
          className="image w-100 text-center"
          style={{
            height: "350px",
            objectFit: "cover",
            backgroundSize: "cover",
            overflow: "hidden",
          }}
        >
          <Image src={heroImage2} preview={false} style={{ height: "100%" }} />
        </div>
      </div>

      <div className="brands  py-xsm-3 py-md-4 d-flex  justify-content-around align-items-center" style={{backgroundColor:"#f77f00"}}>
  
        <p className="brand " style={{ fontFamily: "revert" }}>
         QUICK BITES
        </p>
        <p className="brand" style={{ fontFamily: "cursive" }}>
          FAST FEST
        </p>
        <p className="brand" style={{ fontFamily: "inherit" }}>
          KFC
        </p>
        <p className="brand" style={{ fontFamily: "initial" }}>
          BURGER JUNCTION
        </p>
        <p className="brand" style={{ fontFamily: "monospace" }}>
          Mc Donald
        </p>
       

      </div>
    </div>
  );
}
