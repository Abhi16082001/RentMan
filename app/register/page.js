"use client"
import React from 'react'
import { useState} from "react";
import Link from 'next/link';
export default function Page() {

 
    const [umodel, setumodel] = useState({owner:true})
    const [alert, setalert] = useState("")


    const onchange=(e) => {
        setumodel({
          ...umodel,
          [e.target.name]: e.target.value // Add an empty array if rentfloor does not exist
        });
    }


    const adduser = async (e) => {
        setalert("Registering User as Owner...")
        e.preventDefault();
        try{
          const response= await fetch('api/user',{
            method:'POST',
            headers:{ 'Content-Type':'application/json'},
            body: JSON.stringify(umodel)
          });
          const data= await response.json()
          if(data.ok){
            console.log("User Registered Sucessfully ! ")
            setalert("User Registered Sucessfully !!")
            setumodel({})
          }
          else{
            console.log("Error Registering User !!")
            console.log(data)
            // setalert("Error Registering User!!")
            setalert(data.message)
          }
        }
        catch(error){
      console.error('Error:',error);
        }
      }
      

    return (
  <>
   <div className=" py-2 my-5 space-y-4 ">
   <div className="container  w-11/12 sm:w-3/5 mx-auto p-6 rounded-lg shadow-lg">
<form className='space-y-4'>
        <label htmlFor="uname" className="block text-md font-semibold text-blue-200">User Name:</label>
        <input value={umodel?.uname || ""} 
        placeholder='Enter Username'
        className="w-full p-3  text-cyan-50 border-2 border-blue-500 bg-blue-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
        required type="text" name="uname" id="uname" onChange={onchange} />
        <label htmlFor="uid" className="block text-md font-semibold text-blue-200">User ID:</label>
        <input value={umodel?.uid || ""} 
        placeholder='Create User ID'
        className="w-full p-3  text-blue-50 border-2 border-blue-500 bg-blue-600 bg-opacity-5 rounded-full blue:outline-none focus:ring-2 focus:ring-blue-600"
        required type="text" name="uid" id="uid" onChange={onchange} />
        <label htmlFor="pwd" className="block text-md font-semibold text-blue-200">Create Password:</label>
        <input value={umodel?.pwd || ""} 
        placeholder='Create Password'
        className="w-full p-3  text-blue-50 border-2 border-blue-500 bg-blue-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
        required type="text" name="pwd" id="pwd" onChange={onchange} />
        <br /> 
        <button 
        className="w-full mt-4 p-3  text-blue-200 border-2 border-blue-500 bg-blue-600 bg-opacity-20 font-semibold rounded-full hover:bg-blue-700 hover:text-blue-50 transition duration-300"
         onClick={adduser}>Register</button>
      </form>
      </div>
      {alert && (
    <div className="text-center mt-4 text-blue-200 font-semibold">
      {alert}
    </div> 
  )}
     <div className='container w-11/12 sm:w-3/5 mx-auto bg-blue-300 bg-opacity-50 p-5 rounded-md flex flex-col'>
      <div className='font-bold text-xl text-center text-blue-50'>Already Registered? </div>
      <Link className='bg-cyan-500 rounded-md font-bold text-cyan-950 hover:cursor-pointer hover:bg-cyan-400 text-xl p-3 text-center'  href="/"> Login Here</Link>
      </div>
      </div>
  </>
  
    );
  }