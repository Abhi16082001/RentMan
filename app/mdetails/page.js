"use client"
import { Suspense } from 'react';
import React from 'react'
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

// const page = () => {
 





export default function Page() {
  // <Suspense fallback={<div>Loading...</div>}>
    const router = useRouter();
  //   const [dalert, setdalert] = useState()
  //   const searchParams = useSearchParams();
  //   const robj = searchParams.get('robj');
  //   const drobj = robj ? JSON.parse(decodeURIComponent(robj)) : null;
  //   </Suspense>
  const [dalert, setdalert] = useState()
    const [ralert, setralert] = useState("")
    const [dmodel, setdmodel]= useState(null)
    const [drobj, setdrobj] = useState(null)
    const [md, setmd]=useState([])
    useEffect(() => {
    
        const fetchmdetails= async (bid,flr) => {
          const response= await fetch(`api/mdetails?Bid=${encodeURIComponent(bid)}&floor=${flr}`)
          let mjson= await response.json()
          console.log(mjson)
          setmd(mjson.mdtl)
          if(mjson.mdtl.length===0){
            setralert("No Month Details Addded !")
          }
        }
        if(drobj){
          console.log(drobj)
        fetchmdetails(drobj.Bid,drobj.floor)}
        
      },
      [drobj])


      const mdelete = async (mid) => {
        setdalert(`Deleting Month Detail ...`)
        // console.log(JSON.stringify({ bid}))
        try {
            const response = await fetch('/api/mdetails', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mid }), // Send the ID in the request body
            });
      
            const data = await response.json();
            if (!response.ok) {
              setdalert(data.message)
                throw new Error(data.message || 'Failed to delete the Building');
            }
      
            console.log(data.message); // Log success message
            setdalert(` Renter's Month Details deleted successfully.`)
        } catch (erro) {
            console.log('Error:', erro);
        }
      };

      const onchanger=(e) => {
        setdmodel({...dmodel,[e.target.name]:e.target.value})
        
      }


      const addetails = async (e) => {
        setralert("Adding Details...")
        e.preventDefault();
        // const floor = flr; // Replace with the actual ID of the document you want to update
        const co = { Bdetails:{"Bid":drobj.Bid,"floor":drobj.floor},...dmodel }; 
        try{
        const response= await fetch('api/details',{
        method:'POST',
        headers:{ 'Content-Type':'application/json'},
        body: JSON.stringify(co),
        });
        let data= await response.json()

        console.log(data)
        if(data.ok){
        console.log("Detials Added Sucessfully ! ")
        setralert("Detials Added Successfully !!")
        setdmodel({})
        }
        else if(!data.ok || !data.success){
          setralert(data.message)
        } 
        else{
        console.log("Error adding detials !!")
        }
        }
        catch(error){
        console.error('Error:',error);
        }
        }

      const handleClick = (mdt) => {
        const obj = mdt;
        const encodedObj = encodeURIComponent(JSON.stringify(obj));
        router.push(`/rdetails?mobj=${encodedObj}`);
      };
    //   const handladdm = (mdt) => {
    //     const obj = { Bid:drobj.Bid, Rname:drobj.Rname,floor:drobj.floor };
    //     const encodedObj = encodeURIComponent(JSON.stringify(obj));
    //     router.push(`/addrdetail?robj=${encodedObj}`);
    //   };

    return(
<>
<Suspense fallback={<div>Loading...</div>}>
        <LoadParams setDbobj={setdmodel} setdrobj={setdrobj} />

      </Suspense>
      <p>Floor: {drobj ? drobj.floor : "Loading..."}</p>
      <p>Renter Name: {drobj ? drobj.Rname : "Loading..."}</p>
{/* <p>Floor: {drobj.floor}</p>
  <p>Renter Name: {drobj.Rname}</p> */}


      <form>
       <label htmlFor="month">Select Month and Year:</label>
       <input value={dmodel?.month || ""} type="month" id="month" name="month" onChange={onchanger}/>
        <label htmlFor="rent">Monthly Rent: </label>
        <input value={dmodel?.rent || ""} required type="text" name="rent" id="rent" onChange={onchanger} />
        <label htmlFor="bill">Electricity Bill:</label>
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
        <button className="bg-green-600" onClick={addetails}>Add Month Details</button>
      </form>
      <div className="text-green-600 text-center">{ralert}</div>


<div>Here the Details of renter month wise</div>
    {md.map(m=>{
      return <div key={m._id}><button  className='text-teal-400 hover:cursor-pointer' onClick={() => handleClick(m)}>Renter {m.Rname} details of {m.month}.</button> <button className="bg-red-500" onClick={() => mdelete(m._id)}>Delete</button> </div> 
  })}
<div className="text-red-600 text-center">{dalert}</div>
  <br />
  {/* <button className='bg-blue-500' onClick={() => handladdm()}>Add New Month</button> */}
</>

    );}
    // export default page

    function LoadParams({ setDbobj ,setdrobj}) {

     
      const searchParams = useSearchParams();
      const robj = searchParams.get('robj');
      useEffect(() => {
        if (robj) {
          const drobj = robj ? JSON.parse(decodeURIComponent(robj)) : null;
          // const dbobj = JSON.parse(decodeURIComponent(bobj));
          setDbobj(
            {Rname:drobj.Rname}
          );
          setdrobj(drobj)
          console.log(drobj)
        }}, [robj, setDbobj, setdrobj]);
    
      return null;
    }