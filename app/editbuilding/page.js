"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation';
import { useState,Suspense,useEffect} from 'react';
import { PiBuildingsFill } from "react-icons/pi";
export default function Page()  {
  // <Suspense fallback={<div>Loading...</div>}>
  //   const searchParams = useSearchParams();
  //   const bobj = searchParams.get('bobj');
  //   // const own = searchParams.get('owner');
  //   // const bid = searchParams.get('bid');
  //   const dbobj = bobj ? JSON.parse(decodeURIComponent(bobj)) : null;
  //   </Suspense>
    // const bid=dbobj.id
    const [bldmodel, setbldmodel]= useState(null)
    const [alert, setalert] = useState("")
  
    const updatebuilding = async (e) => {
        setalert("Updating Building...")
        e.preventDefault();
        const co = {...bldmodel }; 
        console.log(bldmodel)
        console.log(co)
        try{
          const response= await fetch('api/building',{
            method:'PUT',
            headers:{ 'Content-Type':'application/json'},
            body: JSON.stringify(co)
          });
          if(response.ok){
            console.log("Building Updated Sucessfully ! ")
            setalert("Building Updated Successfully !!")
           
          }
          else{
            console.log("Error Updating Building !!")
          }
        }
        catch(error){
      console.error('Error:',error);
        }
      }

      const onchange=(e) => {
        setbldmodel({...bldmodel,[e.target.name]:e.target.value})
        
      }
      


  return (<>

<Suspense fallback={<div>Loading...</div>}>
        <LoadParams setDbobj={setbldmodel} />
      </Suspense>
      <div className="py-5 my-5  space-y-4 ">
      <div className="container w-11/12 lg:w-3/5 mx-auto border-2 border-indigo-500  p-6 rounded-lg shadow-lg">
      <div className='text-center text-indigo-500 font-bold text-xl'> <h1 className='text-center'>Edit the building:</h1> </div>
    <form className="space-y-4">
        <label htmlFor="Bname" className="block text-md font-semibold text-indigo-500">Building Name</label>
        <input value={bldmodel?.Bname || ""} required type="text" name="Bname" id="Bname" placeholder='Enter New Building Name'
         className=" w-full px-4 py-2 border border-indigo-500 text-indigo-50 bg-indigo-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-600" 
         onChange={onchange} />
        
        <br /> 
        <button className="w-full flex justify-center gap-2  py-2 mt-4 border-2 border-indigo-500 bg-indigo-600 bg-opacity-20 text-indigo-500 font-semibold rounded-full hover:bg-indigo-700 hover:text-indigo-50 transition duration-300"
        onClick={updatebuilding}>
          <PiBuildingsFill size={25}/>
          Update Building</button>
      </form>
      </div>
      {alert && (
    <div className="text-center mt-4 text-indigo-200 font-semibold">
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
  // const own = searchParams.get('owner');
  // const bid = searchParams.get('bid');
  useEffect(() => {
    if (bobj) {
      const dbobj = bobj ? JSON.parse(decodeURIComponent(bobj)) : null;
      // const dbobj = JSON.parse(decodeURIComponent(bobj));
      setDbobj(
        {bid:dbobj.id,Bname:dbobj.bname}
      );
    }}, [bobj, setDbobj]);

  return null;
}