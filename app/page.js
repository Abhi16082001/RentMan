"use client"
import React from 'react'
import { useState, useEffect} from "react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { useData } from './context/DataContext';

export default function Page() {
  // const {setData}  = useData();
  const router = useRouter();
    const [umodel, setumodel] = useState(null)
    const [alert, setalert] = useState("")

    useEffect(() => {
      // setData(null);  // Set data to null when the page is visited
    }, []);
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
            router.push(`/owner?udtl=${ouser.uid}`);}
            else{
              router.push(`/usermonth?udtl=${ouser.uid}`);
            }
            // setData(ouser);
          }
          else{
            console.log("User is not Registered !!")
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
       
        <label htmlFor="uid">User ID:</label>
        <input value={umodel?.uid || ""} required type="text" name="uid" id="uid" onChange={onchange} />
        <label htmlFor="pwd">Enter Password:</label>
        <input value={umodel?.pwd || ""} required type="text" name="pwd" id="pwd" onChange={onchange} />
        <br /> 
        <button className="bg-blue-600" onClick={fetchuser}>Login</button>
      </form>
      <div className="text-green-600 text-center">{alert}</div>
      <div>Not Registered? </div>
      <Link  href="/register"> Register Here</Link>
  </>
  
    );
  }