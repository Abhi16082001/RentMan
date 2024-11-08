"use client"
import React from 'react'
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
export default function page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bobj = searchParams.get('bobj');
  // const robj = searchParams.get('robj');
  // const drobj = robj ? JSON.parse(decodeURIComponent(robj)) : null;
    const dbobj = bobj ? JSON.parse(decodeURIComponent(bobj)) : null;
    const bid=dbobj.id
  const [rentmodel, setrentmodel]= useState({})
  const [rent, setrent]=useState([])
  const [alert, setalert] = useState("")
  const [dalert, setdalert] = useState("")
useEffect(() => {
  const fetchfloor= async (param) => {
    const response= await fetch(`api/renter?bid=${encodeURIComponent(param)}`)
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    let rjson= await response.json()
    if(rjson.success){
    setrent(rjson.renters)
    if(rjson.renters.length==0){ setdalert("No Floors added !")}
  }
   
    else {
      console.log("No Floors found.");
      return [];
    }
  }
  fetchfloor(bid)
  
},
[])

const onchange=(e) => {
  setrentmodel({...rentmodel,[e.target.name]:e.target.value})
  
}

// const handleClick = (rname,flr) => {
//   const obj = { Bid:bid, Rname:rname,floor:flr };
//   const encodedObj = encodeURIComponent(JSON.stringify(obj));
//   router.push(`/rdetails?robj=${encodedObj}`);
// };
const handleClick = (rname,flr) => {
  const obj = { Bid:bid,Rname:rname,floor:flr };
  const encodedObj = encodeURIComponent(JSON.stringify(obj));
  router.push(`/mdetails?robj=${encodedObj}`);
};

// const handleClick2 = (rname,flr) => {
//   const obj = { Bid:bid, Rname:rname,floor:flr };
//   const encodedObj = encodeURIComponent(JSON.stringify(obj));
//   router.push(`/addrdetail?robj=${encodedObj}`);
// };









const deletefloor = async (Rname,floor) => {
  setdalert(`Deleting Renter ${Rname} of ${floor} Floor...`)
  const co = { bid,Rname,floor }; 
  try {
      const response = await fetch('/api/renter', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(co), // Send the ID in the request body
      });

      const data = await response.json();
      if (!response.ok) {
        setdalert(data.message)
          throw new Error(data.message || 'Failed to delete the floor');
      }
      setdalert(` Renter in ${floor} Floor deleted successfully.`)
  } catch (erro) {
      console.log('Error:', erro);
  }
};


const addfloor = async (e) => {
  setalert("Adding Renter Floor...")
  e.preventDefault();

  const Bid = bid; // Replace with the actual ID of the document you want to update
  const co = { Bid,...rentmodel };
  const Rname=rentmodel.Rname;
  const floor=rentmodel.floor;
  console.log(co)
  console.log(JSON.stringify(co))
  try{
    const response= await fetch('api/renter',{
      method:'PUT',
      headers:{ 'Content-Type':'application/json'},
      body: JSON.stringify(co),
    });
    if(response.ok){
      console.log("Floor Added Sucessfully ! ")
      setalert("Floor Added Successfully !!")
      setrentmodel({})
      // handleClick2(Rname,floor)
      
    }
    else{
      console.log("Error adding Floor !!")
    }
  }
  catch(error){
console.error('Error:',error);
  }
}

// const addfloor = async (e) => {
//   setalert("Adding Renter Floor...")
//   e.preventDefault();

//   const Bname = bnm; // Replace with the actual ID of the document you want to update
//   const co = { Bname,...rentmodel }; 
//   try{
//     const response= await fetch('api/renter',{
//       method:'POST',
//       headers:{ 'Content-Type':'application/json'},
//       body: JSON.stringify(co),
//     });
//     if(response.ok){
//       setalert("Floor Added Successfully !!")
//       setrentmodel({})
//     }
//     else{
//       console.log("Error adding Floor !!")
//     }
//   }
//   catch(error){
// console.error('Error:',error);
//   }
// }

  return (
    <>
    <div> Add the renters with floors here !!</div>

    <form>
        <label htmlFor="Rname">Renter Name</label>
        <input value={rentmodel?.Rname || ""} required type="text" name="Rname" id="Rname" onChange={onchange} />
        <label htmlFor="floor">Floor Number/Name</label>
        <input value={rentmodel?.floor || ""} required type="text" name="floor" id="floor" onChange={onchange} />
        <br /> 
        <button className="bg-green-600" onClick={addfloor}>Add Renter/Floor</button>
      </form>
      <div className="text-green-600 text-center">{alert}</div>


   

    <h1>All Floors with Renters in Building</h1>
    {rent.map(r=>{
   return <div className="text-teal-700" key={r.floor}><p onClick={() => handleClick(r.Rname,r.floor)} >The Renter name : {r.Rname} lives in  {r.floor}.</p> <button className="bg-red-500" onClick={() => deletefloor(r.Rname,r.floor)}>Delete</button> </div> 
  })}
    <div className="text-red-600 text-center">{dalert}</div>
    </>
  );
}
