import { message } from "antd"

window.randomId =()=>Math.random().toString(36).slice(2)
let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// window.isEmail = email => emailRegex.test(email)
const isEmail = email => emailRegex.test(email)

// toastify.js
window.toastify = (msg, type) => {
    switch (type) {
      case "success":
        message.success(msg);
        break;
      case "error":
        message.error(msg);
        break;
      case "warning":
        message.warning(msg);
        break;
      case "info":
        message.info(msg);
        break;
      default:
        message.info(msg);
    }
  };
  
  
  export {isEmail} 



