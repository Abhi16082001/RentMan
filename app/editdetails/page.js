"use client"
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Home() {
    const searchParams = useSearchParams();
    const eobj = searchParams.get('eobj');
    const deobj = eobj ? JSON.parse(decodeURIComponent(eobj)) : null;
    // const [dmodel, setdmodel]= useState({Rname:deobj.Rname,floor:deobj.Bdetails.floor,rent:deobj.rent,bill:deobj.bill,month:deobj.month})
    const [dmodel, setdmodel] = useState({...deobj})
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
    <p>Floor: {dmodel.Bdetails.floor}</p>
    <p>Month: {dmodel.month}</p>
    <form>
  
        <label htmlFor="Rname">Renter Name:</label>
        <input value={dmodel?.Rname || ""} required type="text" name="Rname" id="Rname" onChange={onRchanger} />
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
        <label htmlFor="topay">Current Balance to pay: </label>
        <input value={dmodel?.topay || ""} required type="text" name="topay" id="topay" onChange={onchanger} />
        <br /> 
        <button className="bg-green-600" onClick={updatedetials}>Update Details</button>
      </form>
      <div className="text-green-600 text-center">{alert}</div>
    
    </>
);
}