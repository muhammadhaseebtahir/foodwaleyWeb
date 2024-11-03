import React, { useState } from 'react';
import { Col, Input, Row, Button, Form, Upload, message, Select } from 'antd';
import ImgCrop from 'antd-img-crop';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { fireStore, storage } from '../../../config/firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useAuthContext } from '../../../context/AuthContext';

const { TextArea } = Input;
const { Option } = Select;

const initialize = { 
  dishName: "", 
  category: "", 
  oldPrice: "", 
  newPrice: "", 
  cuisine: "", 
  description: "", 
  imageUrl: "", 
  sizes: [], 
  // colors: [] 
};

export default function AddProduct() {
  const { isAuthentaction, user } = useAuthContext();
  const [state, setState] = useState(initialize);
  const [fileList, setFileList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }));
  };

  const handleSizeChange = (value) => {
    setState(s => ({ ...s, sizes: value }));
  };

  // const handleColorChange = (value) => {
  //   setState(s => ({ ...s, colors: value }));
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    if (!isAuthentaction || !user) {
      setIsProcessing(false);
      message.warning("You need to log in before adding products.");
      return;
    }

    const { dishName, category, description, oldPrice, newPrice, cuisine, sizes, colors } = state;
    if (!dishName || !category || !description || fileList.length === 0) {
      setIsProcessing(false);
      return message.warning("Please fill all required fields.");
    }

    const formData = {
      dishName: dishName.trim(),
      category: category.trim(),
      oldPrice,
      newPrice,
      cuisine: cuisine.trim(),
      description: description.trim(),
      sizes,
      // colors,
      randomId: window.randomId(),
      dateCreated: serverTimestamp()
    };

    createData(formData);
  };

  const createData = async (formData) => {
    try {
      const file = fileList[0].originFileObj;
      const imageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(imageRef, file);
      const imageUrl = await getDownloadURL(imageRef);

      await setDoc(doc(fireStore, "products", formData.randomId), {
        ...formData,
        imageUrl
      });

      message.success("Dish added successfully!");
      setIsProcessing(false);
      setState(initialize);
      setFileList([]);
    } catch (error) {
      console.error("Error adding dish: ", error);
      message.error("Failed to add dish.");
      setIsProcessing(false);
    }
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const imgWindow = window.open(src);
    imgWindow.document.write(`<img src="${src}" />`);
  };

  return (
    <div className="container d-flex flex-column align-items-center">
      <h1 className="text-center py-3">Add Dish</h1>
      <div className="p-3 card shadow w-75">
        <Form>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12}>
              <label>Dish Name:</label>
              <Input
                type="text"
                name="dishName"
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
                placeholder="Select sizes (if applicable)"
                onChange={handleSizeChange}
                value={state.sizes}
              >
                {["Small", "Medium", "Large","XLarge"].map(size => (
                  <Option key={size} value={size}>{size}</Option>
                ))}
              </Select>
            </Col>
            {/* <Col xs={24} sm={12}>
              <label>Colors:</label>
              <Select
                mode="multiple"
                placeholder="Select colors (if applicable)"
                onChange={handleColorChange}
                value={state.colors}
              >
                {["Red", "Green", "Yellow", "Blue", "White"].map(color => (
                  <Option key={color} value={color}>{color}</Option>
                ))}
              </Select>
            </Col> */}
            <Col xs={24}>
              <ImgCrop rotationSlider>
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 5 && '+ Upload'}
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
                Add Dish
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
