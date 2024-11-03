import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { auth, fireStore } from '../config/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { message } from 'antd';
// import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';


const Auth = createContext()
const initiaState ={isAuthentaction :false, user:{},isAdmin:false}

const reducer = (AuthState,{type,payload})=>{
    switch(type){
   case "SET_LOGGED_IN":
   return {...AuthState,isAuthentaction:true,user:payload.user,isAdmin:payload.isAdmin};
   case "SET_LOGGED_OUT":
    return initiaState;
    default:
        return AuthState
}

}



export default function AuthContextProvider({children}) {

  // const navigate =useNavigate()  
const [AuthState,dispatch] = useReducer(reducer,initiaState)
const [isApploading,setIsApploading] = useState(true)

useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
        if (user) {
                  const uid = user.uid;
          readUserProfile(uid)
        } else {
            dispatch({type:"SET_LOGGED_OUT"})
          setIsApploading(false)
        }
      });
})

const readUserProfile =async(uid)=>{
       
    const docRef = doc(fireStore, "user", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        const userData =docSnap.data()
        const isAdmin = userData.role.includes("admin")
        dispatch({type:"SET_LOGGED_IN",payload:{user:userData,isAdmin}})
        setIsApploading(false)

    //   console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
   
   
    }
const handleLogout =()=>{
    signOut(auth).then(() => {
        dispatch({ type: "SET_LOGGED_OUT" });
        message.success("Successfully logged out");
        // navigate("/auth/login");
      }).catch(() => {
        message.error("Error in logout");
      });
}

  return (
    <Auth.Provider value={{...AuthState,dispatch,handleLogout,isApploading,setIsApploading}}>
      {children}
    </Auth.Provider>
  )
}


export const useAuthContext = ()=>useContext(Auth)