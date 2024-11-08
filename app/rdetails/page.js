"use client"
import React from 'react'
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  
      <div>These are the All Details</div>
      <p>Month: {dmobj?dmobj.month: "Loading..."}</p>
      <p>Floor Name: {dmobj?dmobj.Bdetails.floor: "Loading..."}</p>
      <p>Renter Name: {dmobj?dmobj.Rname: "Loading..."}</p>
      <p>Month Rent: {dmobj?dmobj.rent: "Loading..."}</p>
      <p>Electricity Bill: {dmobj?dmobj.bill: "Loading..."}</p>
      <p>Water Bill  :{dmobj?dmobj.wbill: "Loading..."}</p>
      <p>Maid Fee   :{dmobj?dmobj.mfee: "Loading..."}</p>
      <p>Parking Fee  :{dmobj?dmobj.pfee: "Loading..."}</p>
      <p>Monthly Total   :{dmobj?dmobj.mtot: "Loading..."}</p>
      <p>Previous Balance   :{dmobj?dmobj.bal: "Loading..."}</p>
      <p>Grand Total   :{dmobj?dmobj.gtot: "Loading..."}</p>
      <p>Padi this month:{dmobj?dmobj.paid: "Loading..."}</p>
      <p>Current Balance to Pay:{dmobj?dmobj.topay:"Loading ..."} </p>
      <button className='bg-blue-500' onClick={() => handledit(dmobj)}>Edit Detials</button>
    
      

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