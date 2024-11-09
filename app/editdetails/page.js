"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation';
import { useState,useEffect} from 'react';
import { Suspense } from 'react';
export default function Page() {
  // <Suspense fallback={<div>Loading...</div>}>
  //   const searchParams = useSearchParams();
  //   const eobj = searchParams.get('eobj');
  //   const deobj = eobj ? JSON.parse(decodeURIComponent(eobj)) : null;
  //   </Suspense>
    // const [dmodel, setdmodel]= useState({Rname:deobj.Rname,floor:deobj.Bdetails.floor,rent:deobj.rent,bill:deobj.bill,month:deobj.month})
    const [dmodel, setdmodel] = useState(null)
    const [alert, setalert] = useState("")
    const onchanger=(e) => {
        setdmodel({...dmodel,[e.target.name]:e.target.value})
        
      }

      const onRchanger=(e) => {
        if(dmodel.month===getCurrentMonthYear()){setdmodel({...dmodel,[e.target.name]:e.target.value});}
        
      }

      const getCurrentMonthYear = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;  // Months are 0-based, so add 1
        console.log(`${year}-${month < 10 ? `0${month}` : month}`)
        return `${year}-${month < 10 ? `0${month}` : month}`;  // Ensure two-digit month
      };

    const updatedetials= async (e) => {
      
      
        setalert("Updating Details...")
        e.preventDefault();

        // const bid=deobj.Bdetails.Bid
        // const rid=deobj._id
        // const co = {bid, rid,...dmodel }; 
        console.log(dmodel)
        const co={...dmodel};
        console.log(co)
        console.log(JSON.stringify(co))
      
        try{
          const response= await fetch('api/details',{
            method:'PUT',
            headers:{ 'Content-Type':'application/json'},
            body: JSON.stringify(co)
          });
          // const data=response.json()
          if(response.ok){
            console.log("Details Updated Sucessfully ! ")
            setalert("Details Updated Successfully !!")
           
          }
          else{
            console.log("Error Updating Details !!")
            setalert("Failed to update Details !!")
          }
        }
        catch(error){
      console.error('Error:',error);
        }

    }
    

return (
    <>
<Suspense fallback={<div>Loading...</div>}>
        <LoadParams setDbobj={setdmodel} />
      </Suspense>

    <p>Floor: {dmodel?dmodel.Bdetails.floor:"Loading..."}</p>
    <p>Month: {dmodel?dmodel.month:"Loading..."}</p>
    <p>Renter ID: {dmodel?dmodel.uid:"Loading..."}</p>
    <form>
  
        <label htmlFor="uname">Renter Name:</label>
        <input value={dmodel?.uname || ""} required type="text" name="uname" id="uname" onChange={onRchanger} />
        <label htmlFor="rent">Rent:</label>
        <input value={dmodel?.rent || ""} required type="text" name="rent" id="rent" onChange={onchanger} />
        <label htmlFor="bill">Bill:</label>
        <input value={dmodel?.bill || ""} required type="text" name="bill" id="bill" onChange={onchanger} />
        <label htmlFor="wbill">Water Bill:</label>
        <input value={dmodel?.wbill || ""} required type="text" name="wbill" id="wbill" onChange={onchanger} />
        <label htmlFor="mfee">Maid Fee:</label>
        <input value={dmodel?.mfee || ""} required type="text" name="mfee" id="mfee" onChange={onchanger} />
        <label htmlFor="pfee">Parking Fee:</label>
        <input value={dmodel?.pfee || ""} required type="text" name="pfee" id="pfee" onChange={onchanger} />
        <label htmlFor="mtot">Monthly Total:</label>
        <input value={dmodel?.mtot || ""} required type="text" name="mtot" id="mtot" onChange={onchanger} />
        <label htmlFor="bal">Previous Balance:</label>
        <input value={dmodel?.bal || ""} required type="text" name="bal" id="bal" onChange={onchanger} />
        <label htmlFor="gtot">Grand Total:</label>
        <input value={dmodel?.gtot || ""} required type="text" name="gtot" id="gtot" onChange={onchanger} />
        <label htmlFor="paid">Paid this Month: </label>
        <input value={dmodel?.paid || ""} required type="text" name="paid" id="paid" onChange={onchanger} />
        <label htmlFor="pddt">Paid on which Date: </label>
        <input value={dmodel?.pddt || ""} required type="text" name="pddt" id="pddt" onChange={onchanger} />
        <label htmlFor="topay">Current Balance to pay: </label>
        <input value={dmodel?.topay || ""} required type="text" name="topay" id="topay" onChange={onchanger} />
        <br /> 
        <button className="bg-green-600" onClick={updatedetials}>Update Details</button>
      </form>
      <div className="text-green-600 text-center">{alert}</div>
    
    </>
);
}

function LoadParams({ setDbobj }) {
  const searchParams = useSearchParams();
  const eobj = searchParams.get('eobj');

 
  // const own = searchParams.get('owner');
  // const bid = searchParams.get('bid');
  useEffect(() => {
    if (eobj) {
      const deobj = eobj ? JSON.parse(decodeURIComponent(eobj)) : null;
      // const dbobj = JSON.parse(decodeURIComponent(bobj));
      setDbobj(
        {...deobj}
      );
    }}, [eobj, setDbobj]);

  return null;
}