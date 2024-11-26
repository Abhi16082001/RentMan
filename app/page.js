"use client"
import React from 'react'
import { useState,useEffect} from "react";
import Link from 'next/link';
import { RiLoginCircleLine } from "react-icons/ri";
import { useRouter } from 'next/navigation';
import { ImUserPlus } from "react-icons/im";  
export default function Page() {
  const router = useRouter();
    const [umodel, setumodel] = useState(null)
    const [alert, setalert] = useState("")

  
    const onchange=(e) => {
        setumodel({
          ...umodel,
          [e.target.name]: e.target.value // Add an empty array if rentfloor does not exist
        });
    }


    const fetchuser = async (e) => {
        setalert("Fetching User...")
        e.preventDefault();
        try{
          const response= await fetch(`api/user?uid=${encodeURIComponent(umodel.uid)}&pwd=${encodeURIComponent(umodel.pwd)}`,{
            method:'GET',
            headers:{ 'Content-Type':'application/json'},
          });
          const data= await response.json()
          const ouser=data.userexistence
          console.log(ouser)
          if(data.ok){
            console.log("Logged in Sucessfully ! ")
            setalert("Logged in Sucessfully !!")
            setumodel({})
            const jouser=JSON.stringify(ouser)
            if(ouser.owner){
              console.log(jouser)

            router.push(`/owner?uid=${ouser.uid}&uname=${ouser.uname}`);}
       
          
            else{
              router.push(`/usermonth?uid=${ouser.uid}&uname=${ouser.uname}`);
            }}
            else{
              console.log("User is not Registered !!")
              setalert(data.message)
            }
          }
        
        catch(error){
      console.log('Error:',error);
        }
      }
      

    return (
  <>
   <div className=" py-2 my-5 space-y-4 ">
<div className="container  w-11/12 sm:w-3/5 mx-auto p-6 rounded-lg shadow-lg">
<form className='space-y-4'>
        <label htmlFor="uid" className="block text-md font-semibold text-cyan-200">User ID:</label>
        <input value={umodel?.uid || ""} required type="text" name="uid" id="uid"
        className="w-full p-3  text-cyan-50 border-2 border-cyan-500 bg-cyan-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-600"
        placeholder='Enter User ID'
        onChange={onchange} />
        <label htmlFor="pwd" className="block text-md font-semibold text-cyan-200">Enter Password:</label>
        <input value={umodel?.pwd || ""} required type="text" name="pwd" id="pwd"
        placeholder='Enter Password'
        className="text-cyan-50 w-full p-3 border-2 border-cyan-500 bg-cyan-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-600"
        onChange={onchange} />
        <br /> 
        <button   className=" flex justify-center items-center  w-full p-3 mt-4 border-2 border-cyan-500 bg-cyan-600 bg-opacity-20 text-cyan-500 font-semibold rounded-full hover:text-cyan-50 hover:bg-cyan-600 transition duration-300"
         onClick={fetchuser}>
       
       <RiLoginCircleLine size={30}  />
Log In
         </button>
      </form>
</div>
{alert && (
    <div className="text-center mt-4 text-cyan-200 font-semibold">
      {alert}
    </div> 
  )}

  <div className='container w-11/12 sm:w-3/5 mx-auto bg-blue-300 bg-opacity-50 p-5 rounded-md flex flex-col'>
      <div className='font-bold text-xl text-center text-cyan-50'>Not Registered? </div>
      <Link className='bg-blue-500 flex justify-center gap-2  rounded-md font-bold text-blue-950 hover:cursor-pointer hover:bg-blue-400 text-xl p-3 text-center'  href="/register"> 
      <ImUserPlus size={30}/>
      Register Here</Link>
      </div>
      </div>
  </>
  
    );
  }