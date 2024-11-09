"use client"
import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
export default function page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const robj = searchParams.get('robj');
  const drobj = robj ? JSON.parse(decodeURIComponent(robj)) : null;
  const [ralert, setralert] = useState("")
  const [dmodel, setdmodel]= useState({Rname:drobj.Rname})






const onchanger=(e) => {
  setdmodel({...dmodel,[e.target.name]:e.target.value})
  
}




const addetails = async (e) => {
setralert("Adding Details...")
e.preventDefault();
// const floor = flr; // Replace with the actual ID of the document you want to update
const co = { Bdetails:{"Bid":drobj.Bid,"floor":drobj.floor},...dmodel }; 
try{
const response= await fetch('api/details',{
method:'POST',
headers:{ 'Content-Type':'application/json'},
body: JSON.stringify(co),
});
console.log(response)
if(response.ok){
console.log("Detials Added Sucessfully ! ")
setralert("Detials Added Successfully !!")
setdmodel({})
}
else if(!response.ok || !response.success){
  setralert(response.message)
}
else{
console.log("Error adding detials !!")
}
}
catch(error){
console.error('Error:',error);
}
}









  return (
    <>
  <p>Floor: ${drobj.floor}</p>
  <p>Renter Name: ${drobj.Rname}</p>


      <form>
       <label htmlFor="month">Select Month and Year:</label>
       <input value={dmodel?.month || ""} type="month" id="month" name="month" onChange={onchanger}/>
        <label htmlFor="rent">Rent</label>
        <input value={dmodel?.rent || ""} required type="text" name="rent" id="rent" onChange={onchanger} />
        <label htmlFor="bill">Bill</label>
        <input value={dmodel?.bill || ""} required type="text" name="bill" id="bill" onChange={onchanger} />
        <br /> 
        <button className="bg-green-600" onClick={addetails}>Add Details</button>
      </form>
      <div className="text-green-600 text-center">{ralert}</div>


    
    </>
  );
}
