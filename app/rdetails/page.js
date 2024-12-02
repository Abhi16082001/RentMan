"use client"
import React from 'react'
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BiSolidEditAlt } from "react-icons/bi";
export default function Page() {
  const router = useRouter();
  const [dmobj, setdmobj] = useState(null)
  // <Suspense fallback={<div>Loading...</div>}>
  // const searchParams = useSearchParams();
  // const mobj = searchParams.get('mobj');
  // const dmobj = mobj ? JSON.parse(decodeURIComponent(mobj)) : null;
  // </Suspense>
    // const [bld, setbld]=useState({})
    // const [rid, setrid] = useState()
    // const [bid, setbid] = useState()
    // const [flr, setflr] = useState()
    // const [alert, setalert] = useState()
    
    
    
//     useEffect(() => {
//       const fetchdetails= async (bid,flr,mnth) => {
//         const response= await fetch(`api/details?bid=${bid}&floor=${flr}&mnth=${mnth}`)
//         let djson= await response.json()
//         if(!djson.success){
// setalert("This month data is not added !!")
//         }
//         else{
//         setbld(djson.details)
//         setrid(djson.details._id)
//         setbid(djson.details.Bdetails.Bid)
//         setflr(djson.details.Bdetails.floor)
//       setalert(`${mnth} Data is here`)}
        
//       }
//       fetchdetails(drobj.Bid,drobj.floor,"2024-10")
      
//     },
//     [])


    const handledit=(dmobj) => {
      // const obj = dmobj;
      const obj=JSON.stringify(dmobj)
      console.log(obj)
      // const encodedObj = encodeURIComponent(JSON.stringify(obj));
      router.push(`/editdetails?eobj=${obj}`);
    }

 

  return (
    <>
<Suspense fallback={<div>Loading...</div>}>
        <LoadParams setDbobj={setdmobj} />
      </Suspense>
      <div className="container w-11/12 lg:w-3/5 mx-auto my-5 p-4 space-y-3 rounded-md shadow-lg bg-indigo-500 bg-opacity-50">
      <div className="flex justify-center font-extrabold underline font-mono text-xl text-indigo-100"> <h1 className='text-center'>All Details of Renter of Chosen Month </h1></div>
      <div className='bg-gradient-to-r from-indigo-400 to-rose-300 p-3 rounded-sm text-lg  font-semibold font-mono sm:flex flex-row  gap-20 md:gap-60'>
        <div><p>Renter ID: {dmobj?dmobj.uid: "Loading..."}</p>
      <p>Renter Name: {dmobj?dmobj.uname: "Loading..."}</p>
      <p>Renter Move-in Date: {dmobj?dmobj.rdate: "Loading..."} </p></div>
     <div> <p>Floor Name: {dmobj?dmobj.Bdetails.floor: "Loading..."}</p>
      <p>Month: {dmobj?dmobj.month: "Loading..."}</p></div>
      </div>
   { dmobj?.issub?( <> <div className='bg-gradient-to-r from-yellow-100 to-cyan-200 p-3 rounded-lg text-lg text-blue-900 font-semibold font-mono sm:flex flex-row  gap-20 md:gap-60'>
        <div>
        <p>Sub-Meter Installed: {"Yes"}</p>
          <p>Sub-Meter Previous Reading: {dmobj?dmobj.pread: "Loading..."}</p>
      </div>
     <div> 
      <p>{`Rate [Rs. per unit]`}: {dmobj?dmobj.rate: "Loading..."}</p>
     <p>Sub-Meter Current Reading: {dmobj?dmobj.cread: "Loading..."}</p>
      </div>
      </div></>):(<></>)}
      <div className=' space-y-2 p-4 grid grid-cols-1 sm:grid-cols-2   gap-5'>

     <div className='bg-gradient-to-r from-yellow-100 to-cyan-200 p-3  rounded-lg text-lg text-blue-900 font-semibold font-mono'>
      <p>Month Rent: {dmobj?dmobj.rent: "Loading..."}</p>
      <p>Maid Fee   :{dmobj?dmobj.mfee: "Loading..."}</p>
      <p>Parking Fee  :{dmobj?dmobj.pfee: "Loading..."}</p> </div>

      <div className='bg-gradient-to-r from-yellow-100 to-cyan-200 p-3  rounded-lg text-lg text-blue-900 font-semibold font-mono'>
      <p>E-Meter No.: {dmobj?dmobj.emtr: "Loading..."}</p>
        <p>Electricity Bill: {dmobj?dmobj.bill: "Loading..."}</p>
      <p>Water Bill  :{dmobj?dmobj.wbill: "Loading..."}</p> </div>

      <div className='bg-gradient-to-r from-yellow-100 to-cyan-200 p-3  rounded-lg text-lg text-blue-900 font-semibold font-mono'>
      <p>Previous Balance   :{dmobj?dmobj.bal: "Loading..."}</p>
        <p>This Month Total   :{dmobj?dmobj.mtot: "Loading..."}</p>
      <p>Grand Total   :{dmobj?dmobj.gtot: "Loading..."}</p></div>

      <div className='bg-gradient-to-r from-yellow-100 to-cyan-200 p-3  rounded-lg text-lg text-blue-900 font-semibold font-mono'><p>Paid this month:{dmobj?dmobj.paid: "Loading..."}</p>
      <p>Paid On: {dmobj?dmobj.pddt: "Loading..."}</p>
      <p>Current Balance to Pay:{dmobj?dmobj.topay:"Loading ..."} </p></div>
      </div>
      <button className=" flex justify-center items-center bg-yellow-500 bg-opacity-25 w-full p-2.5 rounded-full border-2 border-yellow-500 text-yellow-50  text-lg font-semibold hover:bg-yellow-200 hover:text-blue-950 " 
       onClick={() => handledit(dmobj)}><BiSolidEditAlt   size={30}/> Edit
</button>
      </div>

    </>
  );
}

function LoadParams({ setDbobj }) {

  const searchParams = useSearchParams();
  const mobj = searchParams.get('mobj');
  

  // const own = searchParams.get('owner');
  // const bid = searchParams.get('bid');
  useEffect(() => {
    if (mobj) {
      const dmobj = mobj ? JSON.parse(decodeURIComponent(mobj)) : null;
      // const dbobj = JSON.parse(decodeURIComponent(bobj));
      setDbobj(
        {...dmobj}
      );
    }}, [mobj, setDbobj]);

  return null;
}