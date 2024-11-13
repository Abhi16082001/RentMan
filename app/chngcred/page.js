"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation';
import { useState,Suspense,useEffect} from 'react';
export default function Page()  {


    const [umodel, setumodel] = useState({})
    const [alert, setalert] = useState("")


    const chnguser = async (e) => {
        setalert("Registering User as Owner...")
        e.preventDefault();
        try{
          const response= await fetch('api/user',{
            method:'PUT',
            headers:{ 'Content-Type':'application/json'},
            body: JSON.stringify(umodel)
          });
          const data= await response.json()
          if(data.ok){
            console.log("User Updated Sucessfully ! ")
            setalert("User Updated Sucessfully !!")
            setumodel({})
          }
          else{
            console.log("Error Updating User !!")
            console.log(data)
            // setalert("Error Registering User!!")
            setalert(data.message)
          }
        }
        catch(error){
      console.error('Error:',error);
        }
      }
      


    const onchange=(e) => {
        setumodel({
          ...umodel,
          [e.target.name]: e.target.value // Add an empty array if rentfloor does not exist
        });
    }
    return(
<>
<Suspense fallback={<div>Loading...</div>}>
        <LoadParams setDbobj={setumodel} />
      </Suspense>
      <div className=" py-2 my-5 space-y-4 ">
     
      <div className='container w-11/12 sm:w-3/5 font-bold text-xl rounded-md p-4 text-blue-50 mx-auto bg-blue-500 bg-opacity-50'>
      {umodel?(umodel.owner?(<>
     
      <p >Owner ID:   {umodel?.uid||""}</p>
      </>):(<>
        <p>Renter ID:   {umodel?.uid || ""}  </p>
        <p>Renter Name:   {umodel?.uname || ""}</p>
      </>)):"Loading"}</div>

      <div>{umodel?(umodel.owner?(<>
        <div className="container  w-11/12 sm:w-3/5 mx-auto p-6 rounded-lg shadow-lg">
        <form className='space-y-4'> 
        <label htmlFor="uname" className="block text-md font-semibold text-blue-200"
        >New User Name:</label>
        <input value={umodel?.uname || ""} required type="text" name="uname" id="uname" placeholder='Enter Username'
        className="w-full p-3  text-blue-50 border-2 border-blue-500 bg-blue-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
        onChange={onchange} />

        <label htmlFor="pwd" className="block text-md font-semibold text-blue-200">New Password:</label>
        <input value={umodel?.pwd || ""} required type="text" name="pwd" id="pwd"  placeholder='Enter Password'
        className="w-full p-3  text-blue-50 border-2 border-blue-500 bg-blue-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
        onChange={onchange} />
        <br /> 
        <button className="w-full mt-4 p-3  text-blue-200 border-2 border-blue-500 bg-blue-600 bg-opacity-20 font-semibold rounded-full hover:bg-blue-700 hover:text-blue-50 transition duration-300"
         onClick={chnguser}>Change Credentials</button>
      </form>
</div>
      </>):(<>
        <div className="container  w-11/12 sm:w-3/5 mx-auto p-6 rounded-lg shadow-lg">
        <form className='space-y-4'>
        <label htmlFor="pwd" className="block text-md font-semibold text-blue-200">New Password:</label>
        <input value={umodel?.pwd || ""} required type="text" name="pwd" id="pwd"  placeholder='Enter New Password'
        className="w-full p-3  text-blue-50 border-2 border-blue-500 bg-blue-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
        onChange={onchange} />
        <br /> 
        <button className="w-full mt-4 p-3  text-blue-200 border-2 border-blue-500 bg-blue-600 bg-opacity-20 font-semibold rounded-full hover:bg-blue-700 hover:text-blue-50 transition duration-300"
         onClick={chnguser}>Change Password</button>
      </form>
</div>
      </>)):"Loading"}</div>

      {alert && (
    <div className="text-center mt-4 text-blue-200 font-semibold">
      {alert}
    </div> 
  )}
   </div>

</> );
}

function LoadParams({ setDbobj }) {

    const searchParams = useSearchParams();
    const bobj = searchParams.get('udtl');
    // const own = searchParams.get('owner');
    // const bid = searchParams.get('bid');
    useEffect(() => {
      if (bobj) {
        const dbobj = bobj ? JSON.parse(decodeURIComponent(bobj)) : null;
        // const dbobj = JSON.parse(decodeURIComponent(bobj));
        setDbobj(
          {uid:dbobj.uid,uname:dbobj.uname,owner:dbobj.owner}
        );
      }}, [bobj, setDbobj]);
  
    return null;
  }