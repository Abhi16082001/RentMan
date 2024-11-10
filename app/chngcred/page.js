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
      <div>{umodel?(umodel.owner?(<>
      <p>Owner ID:{umodel?.uid||""}</p>
      </>):(<>
        <p>Renter ID:{umodel?.uid || ""}  </p>
        <p>Renter Name:{umodel?.uname || ""}</p>
      </>)):"Loading"}</div>

      <div>{umodel?(umodel.owner?(<>
     
        <form>
        <label htmlFor="uname">New User Name:</label>
        <input value={umodel?.uname || ""} required type="text" name="uname" id="uname" onChange={onchange} />

        <label htmlFor="pwd">New Password:</label>
        <input value={umodel?.pwd || ""} required type="text" name="pwd" id="pwd" onChange={onchange} />
        <br /> 
        <button className="bg-green-600" onClick={chnguser}>Change Credentials</button>
      </form>

      </>):(<>
      
        <form>
        <label htmlFor="pwd">New Password:</label>
        <input value={umodel?.pwd || ""} required type="text" name="pwd" id="pwd" onChange={onchange} />
        <br /> 
        <button className="bg-green-600" onClick={chnguser}>Change Password</button>
      </form>

      </>)):"Loading"}</div>

      <div className="text-green-600 text-center">{alert}</div>
   


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