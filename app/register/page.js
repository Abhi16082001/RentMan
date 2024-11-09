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

<form>
        <label htmlFor="uname">User Name:</label>
        <input value={umodel?.uname || ""} required type="text" name="uname" id="uname" onChange={onchange} />
        <label htmlFor="uid">User ID:</label>
        <input value={umodel?.uid || ""} required type="text" name="uid" id="uid" onChange={onchange} />
        <label htmlFor="pwd">Create Password:</label>
        <input value={umodel?.pwd || ""} required type="text" name="pwd" id="pwd" onChange={onchange} />
        <br /> 
        <button className="bg-green-600" onClick={adduser}>Register</button>
      </form>
      <div className="text-green-600 text-center">{alert}</div>
      <div>Already Registered? </div>
      <Link  href="/"> Login Here</Link>
  </>
  
    );
  }