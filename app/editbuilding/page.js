"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation';
import { useState,Suspense } from 'react';
export default function Page()  {
  // <Suspense fallback={<div>Loading...</div>}>
  //   const searchParams = useSearchParams();
  //   const bobj = searchParams.get('bobj');
  //   // const own = searchParams.get('owner');
  //   // const bid = searchParams.get('bid');
  //   const dbobj = bobj ? JSON.parse(decodeURIComponent(bobj)) : null;
  //   </Suspense>
    const bid=dbobj.id
    const [bldmodel, setbldmodel]= useState(null)
    const [alert, setalert] = useState("")
  
    const updatebuilding = async (e) => {
        setalert("Updating Building...")
        e.preventDefault();
        const co = { bid,...bldmodel }; 
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

    <div>Edit the building:</div>
    <form>
        <label htmlFor="Bname">Building Name</label>
        <input value={bldmodel?.Bname || ""} required type="text" name="Bname" id="Bname" onChange={onchange} />
        <label htmlFor="owner">Owner Name</label>
        <input value={bldmodel?.owner || ""} required type="text" name="owner" id="owner" onChange={onchange} />
        <br /> 
        <button className="bg-green-600" onClick={updatebuilding}>Update</button>
      </form>
      <div className="text-green-600 text-center">{alert}</div>
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
        {Bname:dbobj.bname,owner:dbobj.own}
      );
    }}, [bobj, setDbobj]);

  return null;
}