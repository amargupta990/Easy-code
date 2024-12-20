import { createContext, useContext, useEffect, useState } from "react"
import axios from "axios"
import { server } from "../main"
import toast, { Toaster } from "react-hot-toast"
import Loader from "../components/loader/Loader"
const UserContext= createContext()

export const UserContextProvider = ({children})=>{
    const [user,setUser]=useState([])
    const [isAuth,setIsAuth]=useState(false)
    const [btnLoading,setBtnLoading]=useState(false)
    const [loading,setLoading]=useState(true)

    async function loginUser(email, password,navigate){
        try {
            const {data}= await axios.post(`${server}/api/user/login`,{email,password})
           localStorage.setItem("token",data.token)
           toast.success("user logged in successfully")
           setUser(data.user)
           setIsAuth(true)
           setBtnLoading(false)
           navigate("/")
        } catch (error) {
           setIsAuth(false)
           setBtnLoading(false)
           toast.error(error.response.data.message)
            
        }
    }

    async function register(name ,email, password,navigate){
        try {
            const {data}= await axios.post(`${server}/api/user/resister`,{name,email,password})
            console.log(data);
            
           localStorage.setItem("activationToken",data.data)
           toast.success(data.messege )
           setBtnLoading(false)
           navigate("/verify")
        } catch (error) {
           setBtnLoading(false)
          
            
        }
    }

    async function fetchUser() {
        try {
            const {data}= await axios.get(`${server}/api/user/me`,{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            setIsAuth(true)
            setUser(data.data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
           console.log(error);
          
            
        }
    }
    
    async function verifyOtp (otp,navigate ){
        setBtnLoading(true)
        const activationToken=localStorage.getItem("activationToken")
        try {
            const {data}= await axios.post(`${server}/api/user/verify`,{otp ,activationToken})
            console.log(data);
            
            toast.success(data.messege)
            navigate("/login")
            localStorage.clear();
            setBtnLoading(false)
        } catch (error) {
            toast.error(error.response.data.messege)
            setLoading(false)
            console.log(error);
            
        }
    }



    useEffect(()=>{
        fetchUser()
    },)
    return (
    <UserContext.Provider value={{user,setUser,setIsAuth,isAuth,verifyOtp,loginUser,btnLoading,loading,Loader,register}}>
    {children}
    <Toaster/>
    </UserContext.Provider>
    )
}

export const UserData = ()=>useContext(UserContext)