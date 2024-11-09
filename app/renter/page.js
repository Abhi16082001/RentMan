"use client"
import React from 'react'
import { Suspense } from 'react';
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
export default function Page() {
  const router = useRouter();
  // <Suspense fallback={<div>Loading...</div>}>
  // const searchParams = useSearchParams();
  // const bobj = searchParams.get('bobj');
  // // const robj = searchParams.get('robj');
  // // const drobj = robj ? JSON.parse(decodeURIComponent(robj)) : null;
  //   const dbobj = bobj ? JSON.parse(decodeURIComponent(bobj)) : null;

  //   </Suspense>
  const [bid, setbid] = useState()
    const [user, setuser] = useState(false)
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
  if(bid){
  fetchfloor(bid)}
  
},
[bid])

const onchange=(e) => {
  setrentmodel({...rentmodel,[e.target.name]:e.target.value})
  
}

// const handleClick = (rname,flr) => {
//   const obj = { Bid:bid, Rname:rname,floor:flr };
//   const encodedObj = encodeURIComponent(JSON.stringify(obj));
//   router.push(`/rdetails?robj=${encodedObj}`);
// };
const handleClick = (unm,flr,uid) => {
  const obj = { Bid:bid,uname:unm,floor:flr,uid:uid };
  const encodedObj = encodeURIComponent(JSON.stringify(obj));
  router.push(`/mdetails?robj=${encodedObj}`);
};

// const handleClick2 = (rname,flr) => {
//   const obj = { Bid:bid, Rname:rname,floor:flr };
//   const encodedObj = encodeURIComponent(JSON.stringify(obj));
//   router.push(`/addrdetail?robj=${encodedObj}`);
// };









const deletefloor = async (uname,floor,uid) => {
  setdalert(`Deleting Renter ${uname} of ${floor} Floor...`)
  const co = { bid,uname,floor,uid }; 
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

const addrenter = async (e) => {
  setalert("Adding Renter ...")
  e.preventDefault();

  // Replace with the actual ID of the document you want to update
  const co = { owner:false,...rentmodel };
  // const Rname=rentmodel.Rname;
  // const floor=rentmodel.floor;
  console.log(co)
  console.log(JSON.stringify(co))
  try{
    const response= await fetch('api/user',{
      method:'POST',
      headers:{ 'Content-Type':'application/json'},
      body: JSON.stringify(co),
    });
    const data= await response.json()
    if(data.ok){
      console.log("Renter Registered Sucessfully ! ")
      setalert("Renter Registered Sucessfully !!")
     setuser(true)
    }
    else{
      console.log("Error Registering Renter !!")
      console.log(data)
      // setalert("Error Registering User!!")
      setalert(data.message)
    }
  }
  catch(error){
console.error('Error:',error);
  }
}

const addfloor = async (e) => {
  setalert("Adding Renter Floor...")
  e.preventDefault();

  const Bid = bid; // Replace with the actual ID of the document you want to update
  const co = { Bid,...rentmodel };
  // const Rname=rentmodel.Rname;
  // const floor=rentmodel.floor;
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
<Suspense fallback={<div>Loading...</div>}>
        <LoadParams setDbobj={setbid} />
      </Suspense>

    <div> Add the renters with floors here !!</div>

        <div>{user?(<>
        <form>
       <label htmlFor="floor">Floor Number/Name</label>
       <input value={rentmodel?.floor || ""} required type="text" name="floor" id="floor" onChange={onchange} />
       <br />
       <button className="bg-green-600" onClick={addfloor}>Add Floor</button>  </form></> ):(
        <>
        <form>
            <label htmlFor="uname">Renter Name</label>
            <input value={rentmodel?.uname || ""} required type="text" name="uname" id="uname" onChange={onchange} />
            <label htmlFor="uid">Renter ID:</label>
            <input value={rentmodel?.uid || ""} required type="text" name="uid" id="uid" onChange={onchange} />
            <label htmlFor="pwd">Renter Password:</label>
            <input value={rentmodel?.pwd || ""} required type="text" name="pwd" id="pwd" onChange={onchange} />
            <button className="bg-green-600" onClick={addrenter}>Add Renter</button>
            </form>
            </>
       )}</div>
     
      <div className="text-green-600 text-center">{alert}</div>


   

    <h1>All Floors with Renters in Building</h1>
    {rent.map(r=>{
   return <div className="text-teal-700" key={r.floor}><p onClick={() => handleClick(r.uname,r.floor,r.uid)} >The Renter {r.uid}: {r.uname} lives in  {r.floor}.</p> <button className="bg-red-500" onClick={() => deletefloor(r.uname,r.floor,r.uid)}>Delete</button> </div> 
  })}
    <div className="text-red-600 text-center">{dalert}</div>
    </>
  );
}

function LoadParams({ setDbobj }) {


  const searchParams = useSearchParams();
  const bobj = searchParams.get('bobj');
    

  // const robj = searchParams.get('robj');
  // const drobj = robj ? JSON.parse(decodeURIComponent(robj)) : null;
    
  

  // const own = searchParams.get('owner');
  // const bid = searchParams.get('bid');
  useEffect(() => {
    if (bobj) {
      const dbobj = bobj ? JSON.parse(decodeURIComponent(bobj)) : null;
      // const dbobj = JSON.parse(decodeURIComponent(bobj));
      setDbobj(
        dbobj.id
        
      );
    }}, [bobj, setDbobj]);

  return null;
}