"use client"
import { Suspense } from 'react';
import React from 'react'
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
export default function Page() {
  const [bid, setbid] = useState({})
  const [md, setmd]=useState([])
  const [ralert, setralert] = useState("")
  const router = useRouter();
  useEffect(() => {
    
    const fetchmdetails= async (id) => {
      const response= await fetch(`api/urenter?uid=${encodeURIComponent(id)}`)
      let mjson= await response.json()
      console.log(mjson)
      setmd(mjson.mdtl)
      if(mjson.mdtl.length===0){
        setralert("No DATA to show !")
      }
    }
    if(bid.uid){
      // console.log(drobj)
    fetchmdetails(bid.uid)}
    
  },
  [bid.uid])

  const chncred= (udtl) => {
    const obj = { ...udtl, owner: false };
    const eObj = encodeURIComponent(JSON.stringify(obj));
    router.push(`/chngcred?udtl=${eObj}`);
  };

  const handleClick = (mdt) => {
    const obj = mdt;
    const encodedObj = encodeURIComponent(JSON.stringify(obj));
    router.push(`/userdetails?mobj=${encodedObj}`);
  };

    return (
  <>
<Suspense fallback={<div>Loading...</div>}>
        <LoadParams setDbobj={setbid} />

      </Suspense>

      <div className="py-2 my-5  space-y-4 ">


      <div className="container w-11/12 lg:w-3/5 mx-auto  space-y-3 p-6 rounded-lg shadow-lg">
      <div className="flex justify-center font-extrabold text-xl text-blue-200 font-mono"><h1>YOUR DASHBOARD</h1></div>
      <div className="font-semibold text-cyan-100 text-md bg-blue-500 bg-opacity-20 rounded-md p-3 space-y-2"> 
       
        <p>RENTER ID: {bid?bid.uid:"Loading..."}</p>
      <p>RENTER NAME: {bid?bid.uname:"Loading..."}</p> 
</div>
<button className=" w-full  p-2 border-2 border-cyan-500 bg-cyan-500 bg-opacity-20  rounded-full font-semibold text-cyan-500  hover:bg-cyan-700 hover:text-cyan-50 transition duration-300" 
onClick={() =>chncred(bid)} >Change Password</button>

</div>

      <div className="flex justify-center font-extrabold bg-blue-500 bg-opacity-25 rounded-xl p-2 font-mono text-xl text-violet-500"><h1>Here the Details Month wise </h1></div>
      <div className="container w-11/12 lg:w-3/5 mx-auto p-4 space-y-3 rounded-md shadow-lg bg-blue-200 bg-opacity-20">
      <div className=' grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 p-1 gap-5 '>
    {md.map(m=>{
      return <div key={m._id} className='rounded-lg font-mono hover:cursor-pointer p-4 bg-gradient-to-r from-cyan-400 to-green-300'
      onClick={() => handleClick(m)}>
       <p className=' text-indigo-900 text-sm font-semibold'> Renter ID:  {m.uid}</p>
       <p className=' text-indigo-900 text-sm font-semibold'> Renter Name :{m.uname}</p> 
       <p className=' text-indigo-900 text-xl font-bold'> Month: {m.month}      </p> 
       </div>
  })}
  </div>
  <div className="text-green-600 text-center">{ralert}</div>
  </div>
  </div>
  </>
  
    );
  }

  // function LoadParams({ setDbobj }) {


  //   const searchParams = useSearchParams();
  //   const udtl = searchParams.get('udtl');
  //   useEffect(() => {
  //     if (udtl) {
  //     console.log(udtl)
  //      setDbobj(
  //         udtl
          
  //       );
  //     }}, [udtl, setDbobj]);
  
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