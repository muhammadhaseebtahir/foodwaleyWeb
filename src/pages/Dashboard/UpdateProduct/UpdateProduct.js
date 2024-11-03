import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { fireStore, storage } from '../../../config/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Col, Input, Row, Button, Form, Upload, message, Select } from 'antd';
import ImgCrop from 'antd-img-crop';

const { TextArea } = Input;
const { Option } = Select;

export default function UpdateProduct() {
  const location = useLocation();
  const dataItem = location.state || {};  
  const [state, setState] = useState(dataItem);
  const [fileList, setFileList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  };

  const handleSizeChange = (sizes) => {
    setState((s) => ({ ...s, sizes }));
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const { dishName, category, oldPrice, newPrice, cuisine, description, sizes } = state;
    let imageUrl = state.imageUrl || ""; 

    try {
      if (fileList.length > 0) {
        const image = fileList[0].originFileObj;
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageUrl = await getDownloadURL(imageRef);
      }

      const updatedProduct = {
        ...dataItem,
        dishName,
        category,
        oldPrice,
        newPrice,
        cuisine,
        description,
        sizes,
       
        imageUrl,
      };
      
      await updateDoc(doc(fireStore, "products", dataItem.randomId), updatedProduct);

      message.success("Product updated successfully!");
      navigate('/dashboard'); 
    } catch (error) {
      console.error("Error updating product: ", error);
      message.error("Failed to update product.");
    } finally {
      setIsProcessing(false);
    }
  };

  const onImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await getDownloadURL(ref(storage, `images/${file.name}`));
    }
    const imgWindow = window.open(src);
    imgWindow?.document.write(`<img src="${src}" style="max-width: 100%;">`);
  };

  return (
    <div className='bg-light'>
      <div className="container d-flex  flex-column align-items-center">
        <h1 className='text-center pt-5' style={{ color: "#495057" }}>Update Product</h1>
        
        <div className="p-3 card shadow w-75">
          <Form>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12}>
                <label>Dish Name:</label>
                <Input
                  type="text"
                  name="productName"
                  onChange={handleChange}
                  value={state.dishName}
                />
              </Col>
              <Col xs={24} sm={12}>
                <label>Category:</label>
                <Input
                  type="text"
                  name="category"
                  onChange={handleChange}
                  value={state.category}
                />
              </Col>
              <Col xs={24} sm={12}>
                <label>Old Price:</label>
                <Input
                  type="text"
                  name="oldPrice"
                  onChange={handleChange}
                  value={state.oldPrice}
                />
              </Col>
              <Col xs={24} sm={12}>
                <label>New Price:</label>
                <Input
                  type="text"
                  name="newPrice"
                  onChange={handleChange}
                  value={state.newPrice}
                />
              </Col>
              <Col xs={24} sm={12}>
                <label>Cuisine:</label>
                <Input
                  type="text"
                  name="cuisine"
                  onChange={handleChange}
                  value={state.cuisine}
                 placeholder='Enter cuisine type (Italian, Chinese, Indian, etc.)'
                />
              </Col>
              <Col xs={24}>
                <label>Description:</label>
                <TextArea
                  name="description"
                  onChange={handleChange}
                  value={state.description}
                  rows={4}
                />
              </Col>
              <Col xs={24} sm={12}>
                <label>Sizes:</label>
                <Select
                  mode="multiple"
                  placeholder="Select sizes"
                  onChange={handleSizeChange}
                  value={state.sizes || []}
                >
                  {["S", "M", "L", "XL", "XXL"].map(size => (
                    <Option key={size} value={size}>{size}</Option>
                  ))}
                </Select>
              </Col>
             
              <Col xs={24}>
                <label>Image Upload:</label>
                <ImgCrop rotationSlider>
                  <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onChange={onImageChange}
                    onPreview={onPreview}
                    beforeUpload={() => false}  // Prevent auto upload
                  >
                    {fileList.length < 1 && '+ Upload'}
                  </Upload>
                </ImgCrop>
              </Col>
            </Row>
            <Row>
              <Col span={10} offset={7}>
                <Button className='w-100'
                  type="primary"
                  size="large"
                  onClick={handleSubmit}
                  loading={isProcessing}
                >
                  Update Product
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </div>
  );
}
