"use client"
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
export default function Page()  {
    const searchParams = useSearchParams();
    const bnm = searchParams.get('bnm');
    const own = searchParams.get('owner');
    const [bldmodel, setbldmodel]= useState({Bname:bnm,owner:own})
    const [alert, setalert] = useState("")
  
    const updatebuilding = async (e) => {
        setalert("Updating Building...")
        e.preventDefault();
        const co = { bnm,...bldmodel }; 
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


