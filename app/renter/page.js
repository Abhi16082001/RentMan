"use client"
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
export default function page() {
  const searchParams = useSearchParams();
    const bnm = searchParams.get('bnm');
  const [rentmodel, setrentmodel]= useState({})
  const [rent, setrent]=useState([])
  const [alert, setalert] = useState("")
  const [dalert, setdalert] = useState("")
useEffect(() => {
  const fetchbuild= async (param) => {
    const response= await fetch(`api/renter?bname=${encodeURIComponent(param)}`)
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    let rjson= await response.json()
    if(rjson.success){
    setrent(rjson.Build)}
    if(rjson.Build.length==0){ setdalert("No Floors added !")}
    else {
      console.log("No Floors found.");
      return [];
    }
  }
  fetchbuild(bnm)
  
},
[])

const onchange=(e) => {
  setrentmodel({...rentmodel,[e.target.name]:e.target.value})
  
}


const deletefloor = async (Rname,floor) => {
  setdalert(`Deleting Renter ${Rname} of ${floor} Floor...`)
  const co = { bnm,Rname,floor }; 
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
          throw new Error(data.message || 'Failed to delete the floor');
      }
      setdalert(` Renter in ${floor} Floor deleted successfully.`)
  } catch (erro) {
      console.log('Error:', erro);
  }
};


// const addfloor = async (e) => {
//   setalert("Adding Renter Floor...")
//   e.preventDefault();

//   const bname = bnm; // Replace with the actual ID of the document you want to update
//   const co = { bname,...rentmodel }; 
//   console.log(co)
//   console.log(JSON.stringify(co))
//   try{
//     const response= await fetch('api/renter',{
//       method:'PUT',
//       headers:{ 'Content-Type':'application/json'},
//       body: JSON.stringify(co),
//     });
//     if(response.ok){
//       console.log("Floor Added Sucessfully ! ")
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

const addfloor = async (e) => {
  setalert("Adding Renter Floor...")
  e.preventDefault();

  const Bname = bnm; // Replace with the actual ID of the document you want to update
  const co = { Bname,...rentmodel }; 
  try{
    const response= await fetch('api/renter',{
      method:'POST',
      headers:{ 'Content-Type':'application/json'},
      body: JSON.stringify(co),
    });
    if(response.ok){
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
    <h1>All Floors with Renters in Building</h1>
    {rent.map(r=>{
   return <div className="text-teal-700" key={r.floor}><p>The Renter name : {r.Rname} lives in  {r.floor}.</p> <button className="bg-red-500" onClick={() => deletefloor(r.Rname,r.floor)}>Delete</button> </div> 
  })}
    <div className="text-red-600 text-center">{dalert}</div>
    </>
  );
}
