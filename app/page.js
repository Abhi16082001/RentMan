"use client"
import { useState, useEffect } from "react";
export default function Home() {

  const [bldmodel, setbldmodel]= useState({})
  const [bld, setbld]=useState([])
  const [alert, setalert] = useState("")
  
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
  setbldmodel({...bldmodel,[e.target.name]:e.target.value})
  
}


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
        <input value={bldmodel?.Bname || ""} required type="text" name="Bname" id="Bname" onChange={onchange} />
        <label htmlFor="owner">Owner Name</label>
        <input value={bldmodel?.owner || ""} required type="text" name="owner" id="owner" onChange={onchange} />
        <br /> 
        <button className="bg-green-600" onClick={addbuilding}>Add Building</button>
      </form>
      <div className="text-green-600 text-center">{alert}</div>
    <h1>All Buildings</h1>
    {bld.map(b=>{
   return <div key={b.Bname}><p>The building name : {b.Bname} is owned by {b.owner}.</p>
   </div> 
   
  })}
    </>
  );
}
