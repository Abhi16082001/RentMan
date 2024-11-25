"use client"
import React from 'react'
import { Suspense } from 'react';
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { MdDelete } from "react-icons/md";
import { SiLevelsdotfyi } from "react-icons/si";
import { IoIosPerson } from "react-icons/io";
import { RiUserAddFill } from "react-icons/ri";
import { RiAddCircleFill } from "react-icons/ri";
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
  setalert("Adding Floor...")
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
      <div className="py-2 my-5  space-y-4 ">


      <div className="container w-11/12 lg:w-3/5 mx-auto p-4 space-y-3 rounded-md shadow-lg bg-indigo-200 bg-opacity-50">
<div className="flex justify-center gap-2 font-extrabold font-mono text-xl text-indigo-100"> 
<SiLevelsdotfyi size={25}/>
  <h1 className='text-center'>All Floors with Renters in Building</h1></div>
    {rent.map(r=>{
   return <div className='space-y-2 sm:space-y-3 text-lime-950 text-lg font-semibold bg-gradient-to-r from-purple-300 to-gray-250 rounded-md p-4 shadow-lg hover:cursor-pointer hover:opacity-80 container mx-auto' 
   key={r.floor}><span className="inline-block w-full sm:w-4/5" onClick={() => handleClick(r.uname,r.floor,r.uid)} > <IoIosPerson size={25}/> {r.uid}: {r.uname} {`-->`}  {r.floor}.</span> 
   <button className="hover:bg-red-200 transition duration-300  w-full sm:w-1/5  py-1.5 rounded-full bg-red-300 "
    onClick={() => deletefloor(r.uname,r.floor,r.uid)}> <MdDelete className='hover:text-red-500 text-red-700' style={{ margin: 'auto', display: 'block' }} size={25} />
</button> </div> 
  })}
  </div>
   {dalert && (
    <div className="text-center mt-4 text-red-200 font-semibold">
      {dalert}
    </div>
  )}


      <div className="container w-11/12 lg:w-3/5 mx-auto border-2 border-purple-500  p-6 rounded-lg shadow-lg">
    <div className='text-center text-purple-500 font-bold text-xl'> Add the renters with floors here !!</div>

        <div>{user?(<>
        <form className="space-y-4">
       <label htmlFor="floor" className="block text-md font-semibold text-purple-500">Floor Number/Name</label>
       <input value={rentmodel?.floor || ""} required type="text" name="floor" id="floor"
       className=" w-full px-4 py-2 border border-purple-500 text-purple-50 bg-purple-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
       onChange={onchange} />
       <br />
       <button className="flex justify-center gap-2 w-full py-2 mt-4 border-2 border-purple-500 bg-purple-600 bg-opacity-20 text-purple-500 font-semibold rounded-full hover:bg-purple-700 hover:text-purple-50 transition duration-300"
       onClick={addfloor}><RiAddCircleFill size={25} />
        Add Floor</button>  </form></> ):(
        <>
        <form className="space-y-4">
            <label htmlFor="uname" className="block text-md font-semibold text-purple-500">Renter Name</label>
            <input value={rentmodel?.uname || ""} required type="text" name="uname" id="uname" placeholder='Enter Renter Name'
            className=" w-full px-4 py-2 border border-purple-500 text-purple-50 bg-purple-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={onchange} />
            <label htmlFor="uid" className="block text-md font-semibold text-purple-500">Renter ID:</label>
            <input value={rentmodel?.uid || ""} required type="text" name="uid" id="uid" placeholder='Create Renter ID'
            className=" w-full px-4 py-2 border border-purple-500 text-purple-50 bg-purple-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={onchange} />
            <label htmlFor="pwd" className="block text-md font-semibold text-purple-500">Renter Password:</label>
            <input value={rentmodel?.pwd || ""} required type="text" name="pwd" id="pwd" placeholder='Create Renter Password'
            className=" w-full px-4 py-2 border border-purple-500 text-purple-50 bg-purple-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
            onChange={onchange} />
            <button  className=" flex justify-center gap-2 w-full py-2 mt-4 border-2 border-purple-500 bg-purple-600 bg-opacity-20 text-purple-500 font-semibold rounded-full hover:bg-purple-700 hover:text-purple-50 transition duration-300"
            onClick={addrenter}>
              <RiUserAddFill size={25} />
              Add Renter</button>
            </form>
            </>
       )}</div>

       </div>
     
       {alert && (
    <div className="text-center mt-4 text-purple-200 font-semibold">
      {alert}
    </div>
  )}


   

    </div>
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