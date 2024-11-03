import React from "react";
import { Rate, Space} from "antd";


export default function Card({value,onClick}) {
  return (
    <>
      <div
        className="card " 
        onClick={onClick}     
        style={{border: "none",width: "14rem",outline: "none",boxShadow: "none", cursor:"pointer"}}>
        <div
          style={{
            height: "200px",
            objectFit: "cover",
            backgroundSize: "cover",
            overflow: "hidden",

          }}
        >
          <img src={value.imageUrl} className="card-img-top h-100" alt="cardImage"  />
        </div>

        <div className="card-body">
          <p  className="card-title fw-bold mb-0 " style={{fontSize:"13px"}}>{value.dishName}</p>
          <Rate style={{ fontSize: "13px" }} disabled defaultValue={4} />
         
            <Space >
              <span>${value.newPrice}</span>
              <del style={{ color: "#6c757d" }}>${value.oldPrice}</del>
              <span
                style={{
                  backgroundColor: "#ffc6ff",
                  opacity: "0.5",
                  padding: "0 10px",
                  color: "#ee4266",
                  borderRadius: "20px",
                  fontSize: "10px",
                }}
              >
                20%
              </span>
            </Space>
           
        </div>
      </div>
    </>
  );
}
