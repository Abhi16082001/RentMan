"use client"
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
export default function page() {
  const searchParams = useSearchParams();
    const bnm = searchParams.get('bnm');
  const [rentmodel, setrentmodel]= useState({})
//   const [rent, setrent]=useState([])
  const [alert, setalert] = useState("")
  
// useEffect(() => {
//   const fetchbuild= async (param) => {
//     const response= await fetch(`api/building?id=${param}`)
//     let rjson= await response.json()
//     console.log(rjson.Build)
//     setrent(rjson.Build)
//   }
//   fetchbuild()
  
// },
// [])

const onchange=(e) => {
  setrentmodel({...rentmodel,[e.target.name]:e.target.value})
  
}


const addfloor = async (e) => {
  setalert("Adding Renter Floor...")
  e.preventDefault();

  const bname = bnm; // Replace with the actual ID of the document you want to update
  const co = { bname,...rentmodel }; 
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
    }
    else{
      console.log("Error adding Floor !!")
    }
  }
  catch(error){
console.error('Error:',error);
  }
}


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
    {/* <h1>All Floors with Renters in Building</h1>
    {rent.map(r=>{
   return <div key={r.Rname}><p>The Renter name : {r.Rname} lives in  {r.floor}.</p></div> 
  })} */}
    </>
  );
}
