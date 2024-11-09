"use client"
import { Suspense } from 'react';
import React from 'react'
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
export default function Page() {
  const [bid, setbid] = useState()
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
    if(bid){
      // console.log(drobj)
    fetchmdetails(bid)}
    
  },
  [bid])


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

<div>Here the Details of renter month wise</div>
    {md.map(m=>{
      return <div key={m._id}><button  className='text-teal-400 hover:cursor-pointer' onClick={() => handleClick(m)}>Renter {m.uid}: {m.uname} with details of {m.month}.</button>  </div> 
  })}
  <div className="text-green-600 text-center">{ralert}</div>
  </>
  
    );
  }

  function LoadParams({ setDbobj }) {


    const searchParams = useSearchParams();
    const udtl = searchParams.get('udtl');
    useEffect(() => {
      if (udtl) {
      console.log(udtl)
       setDbobj(
          udtl
          
        );
      }}, [udtl, setDbobj]);
  
    return null;
  }
  