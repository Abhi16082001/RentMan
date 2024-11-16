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
  const [warn, setwarn] = useState(false)
  const [mon, setmon] = useState("")
  const [wid, setwid] = useState("")
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
     
      const handledel = (mid,mn) => {
       setwid(mid);
       setwarn(true);
       setmon(mn);
       console.log(wid, warn)
       
      };


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
      <div className="py-2 my-5  space-y-4 ">

      
      <div className='bg-gradient-to-r from-sky-500 to-green-400 text-center flex justify-around p-4 text-sky-50 font-bold text-md rounded-md'>
      <span>Renter ID: {drobj ? drobj.uid : "Loading..."} </span>
      <span>Renter Name: {drobj ? drobj.uname : "Loading..."}</span>
        <span>Floor: {drobj ? drobj.floor : "Loading..."}</span>
        
      </div>


      <div className="container w-11/12 lg:w-3/5 mx-auto p-4 space-y-3 rounded-md shadow-lg bg-blue-200 bg-opacity-20">
<div className="flex justify-center font-extrabold font-mono text-xl text-indigo-400"><h1>Here the Details of renter month wise</h1></div>
<div className=' grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 p-1 gap-5 '>
    {md.map(m=>{
      return <div key={m._id} className='rounded-lg font-mono hover:cursor-pointer p-4 bg-gradient-to-r from-green-200 to-blue-300'> 
       {(warn && wid===m.uid && mon==m.month)?(<><div onClick={() => handleClick(m)}>
       <p className=' text-indigo-900 text-sm font-semibold'> Renter ID:  {m.uid}</p>
       <p className=' text-indigo-900 text-sm font-semibold'> Renter Name :{m.uname}</p> 
       <p className=' text-indigo-900 text-sm font-bold'> Month: {m.month}      </p>  
       <p className=' text-red-500 text-sm font-bold'> Deletion ! Sure ?</p>
       </div>
       <div className='space-y-2'>
       <button className="bg-red-500 w-full text-white hover:bg-red-600 rounded-lg" 
       onClick={() => mdelete(m._id)}>Yes</button>
       <button className="bg-green-500 w-full text-white hover:bg-green-600 rounded-lg" 
       onClick={() =>setwarn(false)}>No</button></div>
       </>):
       (<>
       <div onClick={() => handleClick(m)}>
       <p className=' text-indigo-900 text-sm font-semibold'> Renter ID:  {m.uid}</p>
       <p className=' text-indigo-900 text-sm font-semibold'> Renter Name :{m.uname}</p> 
       <p className=' text-indigo-900 text-lg font-bold'> Month: {m.month}      </p>  </div>
       <button className="bg-red-500 w-full text-white hover:bg-red-600 rounded-lg" 
       onClick={() =>handledel(m.uid,m.month)}>Delete</button>
       </>)
       }</div>
         
  })}
  </div>

  {ralert && (
    <div className="text-center mt-4 text-sky-200 font-semibold">
      {ralert}
    </div>
  )}
  </div>
  {dalert && (
    <div className="text-center mt-4 text-red-200 font-semibold">
      {dalert}
    </div>
  )} 

      <div className="container w-11/12 lg:w-3/5 mx-auto  border-2 border-sky-500 space-y-3 p-6 rounded-lg shadow-lg">
      <div className="flex justify-center font-extrabold bg-blue-500 bg-opacity-55 rounded-xl p-2 font-mono text-xl text-blue-400"><h1>Add New Month Details </h1></div>
      <form className="space-y-4">
       <label  className="block text-md font-semibold text-sky-500" htmlFor="month">Select Month and Year:</label>
       <input value={dmodel?.month || ""} type="month" id="month" name="month" 
       className=" w-full px-4 py-2 border border-sky-500 text-sky-50 bg-sky-600 bg-opacity-25 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-600"
       onChange={onchanger} />
        <label  className="block text-md font-semibold text-sky-500" htmlFor="rent">Monthly Rent: </label>
        <input value={dmodel?.rent || ""} required type="text" name="rent" id="rent" 
        className=" w-full px-4 py-2 border border-sky-500 text-sky-50 bg-sky-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-600"
        onChange={onchanger} />
        <label  className="block text-md font-semibold text-sky-500" htmlFor="bill">Electricity Bill:</label>
        <input value={dmodel?.bill || ""} required type="text" name="bill" id="bill" 
        className=" w-full px-4 py-2 border border-sky-500 text-sky-50 bg-sky-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-600"
        onChange={onchanger} />
        <label  className="block text-md font-semibold text-sky-500" htmlFor="wbill">Water Bill:</label>
        <input value={dmodel?.wbill || ""} required type="text" name="wbill" id="wbill" 
        className=" w-full px-4 py-2 border border-sky-500 text-sky-50 bg-sky-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-600"
        onChange={onchanger} />
        <label  className="block text-md font-semibold text-sky-500" htmlFor="mfee">Maid Fee:</label>
        <input value={dmodel?.mfee || ""} required type="text" name="mfee" id="mfee" 
        className=" w-full px-4 py-2 border border-sky-500 text-sky-50 bg-sky-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-600"
        onChange={onchanger} />
        <label  className="block text-md font-semibold text-sky-500" htmlFor="pfee">Parking Fee:</label>
        <input value={dmodel?.pfee || ""} required type="text" name="pfee" id="pfee" 
        className=" w-full px-4 py-2 border border-sky-500 text-sky-50 bg-sky-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-600"
        onChange={onchanger} />
        <label  className="block text-md font-semibold text-sky-500" htmlFor="mtot">Monthly Total:</label>
        <input value={dmodel?.mtot || ""} required type="text" name="mtot" id="mtot" 
        className=" w-full px-4 py-2 border border-sky-500 text-sky-50 bg-sky-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-600"
        onChange={onchanger} />
        <label  className="block text-md font-semibold text-sky-500" htmlFor="bal">Previous Balance:</label>
        <input value={dmodel?.bal || ""} required type="text" name="bal" id="bal" 
        className=" w-full px-4 py-2 border border-sky-500 text-sky-50 bg-sky-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-600"
        onChange={onchanger} />
        <label  className="block text-md font-semibold text-sky-500" htmlFor="gtot">Grand Total:</label>
        <input value={dmodel?.gtot || ""} required type="text" name="gtot" id="gtot" 
        className=" w-full px-4 py-2 border border-sky-500 text-sky-50 bg-sky-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-600"
        onChange={onchanger} />
        <label  className="block text-md font-semibold text-sky-500" htmlFor="paid">How much Paid this Month: </label>
        <input value={dmodel?.paid || ""} required type="text" name="paid" id="paid" 
        className=" w-full px-4 py-2 border border-sky-500 text-sky-50 bg-sky-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-600"
        onChange={onchanger} />
        <label  className="block text-md font-semibold text-sky-500" htmlFor="pddt">Paid on which Date: </label>
        <input value={dmodel?.pddt || ""} required type="text" name="pddt" id="pddt" 
        className=" w-full px-4 py-2 border border-sky-500 text-sky-50 bg-sky-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-600"
        onChange={onchanger} />
        <label  className="block text-md font-semibold text-sky-500" htmlFor="topay">Current Balance to pay: </label>
        <input value={dmodel?.topay || ""} required type="text" name="topay" id="topay" 
        className=" w-full px-4 py-2 border border-sky-500 text-sky-50 bg-sky-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-sky-600"
        onChange={onchanger} />
        <br /> 
        <button className="w-full py-2 mt-4  bg-sky-500 bg-opacity-80 text-white font-semibold rounded-full hover:bg-sky-700  transition duration-300"
         onClick={addetails}>Add Month Details</button>
      </form>
      </div>
    


  <br />
</div>
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
            {uname:drobj.uname,uid:drobj.uid}
          );
          setdrobj(drobj)
          console.log(drobj)
        }}, [robj, setDbobj, setdrobj]);
    
      return null;
    }