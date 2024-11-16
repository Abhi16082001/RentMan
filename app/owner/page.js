"use client"
import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [bid, setbid] = useState({});
  const [bldmodel, setbldmodel] = useState({ rentfloor: [] });
  const [bld, setbld] = useState([]);
  const [alert, setalert] = useState("");
  const [balert, setbalert] = useState("");
  const [dalert, setdalert] = useState("");
  // const searchParams = useSearchParams();
  // const udtl = searchParams.get('udtl');
  const fetchbuild = async (uid) => {
    const response = await fetch(`/api/building?uid=${uid}`);
    let bjson = await response.json();
    setbld(bjson.Build);
    console.log(bld)
    if (bjson.Build.length === 0) setbalert("No Buildings Added");
  };

  useEffect(() => {
    if (bid.uid) fetchbuild(bid.uid);
  }, [bid.uid]);

  const onchange = (e) => {
    setbldmodel({
      ...bldmodel,
      [e.target.name]: e.target.value,
      rentfloor: bldmodel.rentfloor || [],
    });
  };

  const handleClick = (bnm, bid) => {
    const obj = { bname: bnm, id: bid };
    const encodedObj = encodeURIComponent(JSON.stringify(obj));
    router.push(`/renter?bobj=${encodedObj}`);
  };

  const handledit = (bid, bnm) => {
    const obj = { bname: bnm, id: bid };
    const encodedObj = encodeURIComponent(JSON.stringify(obj));
    router.push(`/editbuilding?bobj=${encodedObj}`);
  };

  const chncred= (udtl) => {
    const obj = { ...udtl, owner: true };
    const eObj = encodeURIComponent(JSON.stringify(obj));
    router.push(`/chngcred?udtl=${eObj}`);
  };

  const deletebuilding = async (bid) => {
    setdalert("Deleting Building...");
    try {
      const response = await fetch('/api/building', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bid }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to delete the Building');
      setdalert("Building deleted successfully.");
    } catch (error) {
      setdalert("Error deleting building.");
      console.error('Error:', error);
    }
  };

  const addbuilding = async (e) => {
    e.preventDefault();
    setalert("Adding Building...");
    const co = { uid:bid.uid, ...bldmodel };
    try {
      const response = await fetch('/api/building', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(co),
      });
      if (response.ok) {
        setalert("Building Added Successfully!");
        setbldmodel({});
      } else {
        setalert("Error in adding Building.");
      }
    } catch (error) {
      setalert("Error in adding Building.");
      console.error('Error:', error);
    }
  };

  return (
    <>
    <div className="py-2 my-5  space-y-4 ">
    <Suspense fallback={<div>Loading...</div>}>
      <LoadParams setDbobj={setbid} />
      </Suspense>

 <div className="container w-11/12 sm:w-3/5 mx-auto p-4 space-y-3 bg-blue-300 bg-opacity-15  rounded-md shadow-lg">
  <div className="flex justify-center font-extrabold text-xl text-blue-200 font-mono"><h1>YOUR DASHBOARD</h1></div>
 <div className="font-semibold text-blue-500 text-md bg-blue-500 bg-opacity-5 rounded-md p-3 space-y-2"> <p>OWNER ID: {bid?bid.uid:"Loading..."}</p>
  <p>OWNER NAME: {bid?bid.uname:"Loading..."}</p> </div>
  <div className="flex justify-center">
    <button className=" w-full  p-2 border-2 border-blue-500 bg-blue-500 bg-opacity-10  rounded-full font-semibold text-blue-500  hover:bg-blue-700 hover:text-blue-50 " onClick={() => chncred(bid)}>
      Change Credentials
    </button>
  </div>
</div>  
 

<div className="container w-11/12 sm:w-3/5 mx-auto border-2 border-green-500  p-6 rounded-lg shadow-lg">
  <form onSubmit={addbuilding} className="space-y-4">
    <label htmlFor="Bname" className="block text-md font-semibold text-green-500">
      Building Name/Number
    </label>
    <input
      pattern="^(?!\s*$).+"
      title="This field cannot be empty or just spaces"
      value={bldmodel?.Bname || ""}
      required
      type="text"
      name="Bname"
      id="Bname"
      onChange={onchange}
      className=" w-full px-4 py-2 border border-green-500 text-green-50 bg-green-600 bg-opacity-20 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
      placeholder="Enter building name"
    />
    
    <button
      type="submit"
      className="w-full py-2 mt-4 border-2 border-green-500 bg-green-600 bg-opacity-5 text-green-500 font-semibold rounded-full hover:bg-green-700 hover:text-green-50 "
    >
      Add Building
    </button>
  </form>
  
  {alert && (
    <div className="text-center mt-4 text-green-200 font-semibold">
      {alert}
    </div>
  )}
</div>

<div className="container w-11/12 sm:w-3/5 mx-auto p-4 space-y-3 rounded-md shadow-lg bg-teal-200 bg-opacity-50">
      <div className="flex justify-center font-extrabold font-mono text-xl text-teal-100"><h1>ALL BUILDINGS/APARTMENTS</h1></div>
      {bld.map((b) => (
        <div key={b._id}
            className='space-y-2 sm:space-y-3 text-teal-950 text-lg font-semibold bg-gradient-to-r from-cyan-400 to-green-300 rounded-md p-4 shadow-lg hover:cursor-pointer hover:opacity-80 container mx-auto'
            
          >
             
           <span onClick={() => handleClick(b.Bname, b._id)} className="inline-block w-full sm:w-3/5">{b.Bname}</span>
          <button className="hover:bg-green-700 text-white   w-1/2 sm:w-1/5  py-0 sm:py-1.5 rounded-full bg-green-500 " onClick={() => handledit(b._id, b.Bname)}>Edit</button>
          <button className="hover:bg-red-700 text-white   w-1/2 sm:w-1/5  py-0 sm:py-1.5 rounded-full bg-red-500 " onClick={() => deletebuilding(b._id)}>Delete</button>
        </div> 
      ))}
         {dalert && (
    <div className="text-center mt-4 text-red-200 font-semibold">
      {dalert}
    </div>
  )}


{balert && (
    <div className="text-center mt-4 text-green-200 font-semibold">
      {balert}
    </div>
  )}

      </div>
      </div>
    </>
  );
}

// function LoadParams({ setDbobj }) {
//   const searchParams = useSearchParams();
//   const udtl = searchParams.get('udtl');

//   useEffect(() => {
//     if (udtl) setDbobj(udtl);
//   }, [udtl, setDbobj]);

//   return null;
// }
function LoadParams({ setDbobj }) {
  const searchParams = useSearchParams();
  const id = searchParams.get('uid');
  const name = searchParams.get('uname');
  console.log(id,name)
const udtl={"uid":id,"uname":name}
console.log(udtl)
  useEffect(() => {
    if (id && name) {
   
      setDbobj(udtl);
    }
  }, [id,name, setDbobj]);

  return null;
}