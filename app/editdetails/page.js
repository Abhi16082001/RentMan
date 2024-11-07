"use client"
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Home() {
    const searchParams = useSearchParams();
    const eobj = searchParams.get('eobj');
    const deobj = eobj ? JSON.parse(decodeURIComponent(eobj)) : null;
    const [dmodel, setdmodel]= useState({Rname:deobj.Rname,floor:deobj.Bdetails.floor,rent:deobj.rent,bill:deobj.bill,month:deobj.month})
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
        const bid=deobj.Bdetails.Bid
        const rid=deobj._id
        const co = {bid, rid,...dmodel }; 
      
        try{
          const response= await fetch('api/details',{
            method:'PUT',
            headers:{ 'Content-Type':'application/json'},
            body: JSON.stringify(co)
          });
          if(response.ok){
            console.log("Details Updated Sucessfully ! ")
            setalert("Details Updated Successfully !!")
           
          }
          else{
            console.log("Error Updating Details !!")
          }
        }
        catch(error){
      console.error('Error:',error);
        }

    }
    

return (
    <>
    <p>Floor: {dmodel.floor}</p>
    <p>Month: {dmodel.month}</p>
    <form>
  
        <label htmlFor="Rname">Renter Name:</label>
        <input value={dmodel?.Rname || ""} required type="text" name="Rname" id="Rname" onChange={onRchanger} />
        <label htmlFor="rent">Rent:</label>
        <input value={dmodel?.rent || ""} required type="text" name="rent" id="rent" onChange={onchanger} />
        <label htmlFor="bill">Bill:</label>
        <input value={dmodel?.bill || ""} required type="text" name="bill" id="bill" onChange={onchanger} />
        <br /> 
        <button className="bg-green-600" onClick={updatedetials}>Update Details</button>
      </form>
      <div className="text-green-600 text-center">{alert}</div>
    
    </>
);
}