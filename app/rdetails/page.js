"use client"
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mobj = searchParams.get('mobj');
  const dmobj = mobj ? JSON.parse(decodeURIComponent(mobj)) : null;
    
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

  
      <div>These are the All Details</div>
      <p>Month: {dmobj.month}</p>
      <p>Floor Name: {dmobj.Bdetails.floor}</p>
      <p>Renter Name: {dmobj.Rname}</p>
      <p>Month Rent: {dmobj.rent}</p>
      <p>Electricity Bill: {dmobj.bill}</p>
      <p>Water Bill  :{dmobj.wbill}</p>
      <p>Maid Fee   :{dmobj.mfee}</p>
      <p>Parking Fee  :{dmobj.pfee}</p>
      <p>Monthly Total   :{dmobj.mtot}</p>
      <p>Previous Balance   :{dmobj.bal}</p>
      <p>Grand Total   :{dmobj.gtot}</p>
      <p>Padi this month:{dmobj.paid}</p>
      <p>Current Balance to Pay:{dmobj.topay} </p>
      <button className='bg-blue-500' onClick={() => handledit(dmobj)}>Edit Detials</button>
    
      

    </>
  );
}
