"use client"
import React from 'react'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
export default function Home() {

  const [bldmodel, setbldmodel]= useState({})
  const [bld, setbld]=useState([])
  const [alert, setalert] = useState("")
  const [dalert, setdalert] = useState("")
  const router = useRouter();
useEffect(() => {
  const fetchbuild= async () => {
    const response= await fetch('api/building')
    let bjson= await response.json()
    console.log(bjson.Build)
    setbld(bjson.Build)
  }
  fetchbuild()
  
},
[])

const onchange=(e) => {
  setbldmodel({
    ...bldmodel,
    [e.target.name]: e.target.value,
    rentfloor: bldmodel.rentfloor || [] // Add an empty array if rentfloor does not exist
  });
  
}

const handleClick = (bnm,owner,bid) => {
  const obj = { bname: bnm, id:bid, own:owner  };
  const encodedObj = encodeURIComponent(JSON.stringify(obj));
  router.push(`/renter?bobj=${encodedObj}`);
};

const handledit=(bid,bnm,owner) => {
  const obj = { bname: bnm, id:bid, own:owner  };
  const encodedObj = encodeURIComponent(JSON.stringify(obj));
  router.push(`/editbuilding?bobj=${encodedObj}`);
}


// In your component file

const deletebuilding = async (bid) => {
  setdalert(`Deleting Building...`)
  console.log(JSON.stringify({ bid}))
  try {
      const response = await fetch('/api/building', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ bid }), // Send the ID in the request body
      });

      const data = await response.json();
      if (!response.ok) {
        setdalert(data.message)
          throw new Error(data.message || 'Failed to delete the Building');
      }

      console.log(data.message); // Log success message
      setdalert(` Building deleted successfully.`)
  } catch (erro) {
      console.log('Error:', erro);
  }
};



const addbuilding = async (e) => {
  setalert("Adding Building...")
  e.preventDefault();
  try{
    const response= await fetch('api/building',{
      method:'POST',
      headers:{ 'Content-Type':'application/json'},
      body: JSON.stringify(bldmodel)
    });
    if(response.ok){
      console.log("Building Added Sucessfully ! ")
      setalert("Building Added Successfully !!")
      setbldmodel({})
    }
    else{
      console.log("Error adding Building !!")
    }
  }
  catch(error){
console.error('Error:',error);
  }
}


  return (
    <>
    <div> Hi this is the new rent man app</div>

    <form>
        <label htmlFor="Bname">Building Name</label>
        <input  pattern="^(?!\s*$).+" // Ensures that input is not just spaces
  title="This field cannot be empty or just spaces" value={bldmodel?.Bname || ""} required type="text" name="Bname" id="Bname" onChange={onchange} />
        <label htmlFor="owner">Owner Name</label>
        <input  pattern="^(?!\s*$).+" // Ensures that input is not just spaces
  title="This field cannot be empty or just spaces" value={bldmodel?.owner || ""} required type="text" name="owner" id="owner" onChange={onchange} />
        <br /> 
        <button className="bg-green-600" onClick={addbuilding}>Add Building</button>
      </form>
      <div className="text-green-600 text-center">{alert}</div>
    <h1>All Buildings</h1>
    {bld.map(b=>{
      return <div key={b._id}><button  className='text-teal-400 hover:cursor-pointer' onClick={() => handleClick(b.Bname,b.owner,b._id)}>The building name : {b.Bname} is owned by {b.owner}.</button> <button className="bg-green-500" onClick={() => handledit(b._id,b.Bname,b.owner)}>Edit</button> <button className="bg-red-500" onClick={() => deletebuilding(b._id)}>Delete</button> </div> 
  })}
   <div className="text-red-600 text-center">{dalert}</div>
    </>
  );
}
