"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation';
import { useState,useEffect} from 'react';
import { Suspense } from 'react';
import { MdSecurityUpdate } from "react-icons/md";
export default function Page() {
  // <Suspense fallback={<div>Loading...</div>}>
  //   const searchParams = useSearchParams();
  //   const eobj = searchParams.get('eobj');
  //   const deobj = eobj ? JSON.parse(decodeURIComponent(eobj)) : null;
  //   </Suspense>
    // const [dmodel, setdmodel]= useState({Rname:deobj.Rname,floor:deobj.Bdetails.floor,rent:deobj.rent,bill:deobj.bill,month:deobj.month})
    const [dmodel, setdmodel] = useState(null)
    const [alert, setalert] = useState("")
    const onchanger=(e) => {
        setdmodel({...dmodel,[e.target.name]:e.target.value})
        
      }

      const onRchanger=(e) => {
        if(dmodel.month===getCurrentMonthYear()){setdmodel({...dmodel,[e.target.name]:e.target.value});}
        
      }

      const getCurrentMonthYear = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;  // Months are 0-based, so add 1
        console.log(`${year}-${month < 10 ? `0${month}` : month}`)
        return `${year}-${month < 10 ? `0${month}` : month}`;  // Ensure two-digit month
      };

    const updatedetials= async (e) => {
      
      
        setalert("Updating Details...")
        e.preventDefault();

        // const bid=deobj.Bdetails.Bid
        // const rid=deobj._id
        // const co = {bid, rid,...dmodel }; 
        console.log(dmodel)
        const co={...dmodel};
        console.log(co)
        console.log(JSON.stringify(co))
      
        try{
          const response= await fetch('api/details',{
            method:'PUT',
            headers:{ 'Content-Type':'application/json'},
            body: JSON.stringify(co)
          });
          // const data=response.json()
          if(response.ok){
            console.log("Details Updated Sucessfully ! ")
            setalert("Details Updated Successfully !!")
           
          }
          else{
            console.log("Error Updating Details !!")
            setalert("Failed to update Details !!")
          }
        }
        catch(error){
      console.error('Error:',error);
        }

    }



    const handledrop = (event) => {
      const value = event.target.value === "true"; // Convert string "true"/"false" to a boolean
      setdmodel({...dmodel,[event.target.name]:value})
    };

    const calbill = async (mtr,mnth,uid) => {
      setdmodel({...dmodel,bill:"Calculating..."})
      let pread= parseFloat(dmodel.pread);
      let cread= parseFloat(dmodel.cread);
      let rate= parseFloat(dmodel.rate);
      let bses= parseFloat(dmodel.bsesbill);
     
      let ebill=0
if(!pread){ pread=0}
if(!cread){ cread=0}
if(!rate){ rate=0}
if(!bses){ bses=0}
if(dmodel.issub){
console.log(pread,cread,rate)
ebill=(cread-pread)*rate
}
else{
const obill = await fetchbill(mtr,mnth,uid);
console.log(obill)
if(obill && obill!=2){
  ebill=bses-obill
}
else if(obill==2){
  ebill=bses/2
}
else{
ebill=bses
}
}
setdmodel({...dmodel,bill:ebill})
    };

    const fetchbill = async (mtr,mnth,uid) => {
      try {
        const response = await fetch(`/api/fetchbill?meter=${encodeURIComponent(mtr)}&month=${encodeURIComponent(mnth)}&id=${encodeURIComponent(uid)}`); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
      
        const data= await response.json()
       if(data.success){
        const ebill=data.ebill
        console.log('Fetched bill:', ebill);
        return ebill;}
        else if(data.ok && !data.success){return 2;}
        else{return null}
      } catch (error) {
        console.log('Error fetching data:', error);

      }
    };


    const handletotal = () => {
      let rent= parseFloat(dmodel.rent);
      let mfee= parseFloat(dmodel.mfee);
      let pfee= parseFloat(dmodel.pfee);
      let bill= parseFloat(dmodel.bill);
      let wbill= parseFloat(dmodel.wbill);
      if(!rent){rent=0}
      if(!mfee){mfee=0}
      if(!pfee){pfee=0}
      if(!bill){bill=0}
      if(!wbill){wbill=0}
      const total=rent+mfee+pfee+bill+wbill
      
      if(total===0 || !total){
        setdmodel({...dmodel,mtot:"0"})
      }
     else{ setdmodel({...dmodel,mtot:total})}
    };
  
    const handlegtot = () => {
      const mtot= parseFloat(dmodel.mtot);
      let bal= parseFloat(dmodel.bal);
      if(!bal){bal=0}
      const gtotal=mtot+bal
      if(gtotal===0 || !gtotal){
        setdmodel({...dmodel,gtot:"0"})
      }
     else{ setdmodel({...dmodel,gtot:gtotal})}
    };
    const handletopay = () => {
      const gtot= parseFloat(dmodel.gtot);
      let paid= parseFloat(dmodel.paid);
      if(!paid){paid=0}
      const topay=gtot-paid
      console.log(topay)
     if(topay===0 || !topay){
        setdmodel({...dmodel,topay:"0"})
      }
     else{ setdmodel({...dmodel,topay:topay})}
    };
    

return (
    <>
<Suspense fallback={<div>Loading...</div>}>
        <LoadParams setDbobj={setdmodel} />
      </Suspense>
      <div className=" py-2 my-5 space-y-4 ">


      <div className='container w-11/12 sm:w-3/5 font-extrabold font-mono text-xl rounded-md p-4 text-blue-950 mx-auto bg-gradient-to-r from-cyan-400 to-emerald-300 '>
    <p>Floor: {dmodel?dmodel.Bdetails.floor:"Loading..."}</p>
    <p>Month: {dmodel?dmodel.month:"Loading..."}</p>
    <p>Renter ID: {dmodel?dmodel.uid:"Loading..."}</p>
  </div>


  <div className="container w-11/12 lg:w-3/5 mx-auto  border-2 border-emerald-500 space-y-3 p-6 rounded-lg shadow-lg">
      <div className="flex justify-center font-extrabold bg-emerald-500 bg-opacity-25 rounded-xl p-2 font-mono text-xl text-blue-200"><h1 className='text-center'>Edit Month Details </h1></div>
    <form className='space-y-4'>
  
        <label  className="block text-md font-semibold text-emerald-500" 
        htmlFor="uname">Renter Name:</label>
        <input value={dmodel?.uname || ""} required type="text" name="uname" id="uname" 
        className=" w-full px-4 py-2 border border-emerald-500 text-emerald-50 bg-emerald-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
        onChange={onRchanger} />
        <label  className="block text-md font-semibold text-emerald-500" 
        htmlFor="uname">Renter Move-in Date:</label>
        <input value={dmodel?.rdate || ""} required type="text" name="uname" id="uname" 
        className=" w-full px-4 py-2 border border-emerald-500 text-emerald-50 bg-emerald-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
        onChange={onRchanger} />
        <label  className="block text-md font-semibold text-emerald-500" 
        htmlFor="rent">Rent:</label>
        <input value={dmodel?.rent || ""} required type="text" name="rent" id="rent"
        className=" w-full px-4 py-2 border border-emerald-500 text-emerald-50 bg-emerald-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
         onChange={onchanger} />

<label  className="block text-md font-semibold text-emerald-500" htmlFor="emtr">Electricity Meter No.: </label>
        <input value={dmodel?.emtr || ""} required type="text" name="emtr" id="emtr" 
        className=" w-full px-4 py-2 border border-emerald-500 text-emerald-50 bg-emerald-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
        onChange={onchanger} />
        <label  className="block text-md font-semibold text-emerald-500" htmlFor="emtr">Is Sub-meter installed: </label>
       <select  name="issub" id="issub" value={dmodel?.issub !== null ? String(dmodel?.issub) : ""}  onChange={handledrop}
        className="border-2 border-emerald-500 text-emerald-500 bg-emerald-400 bg-opacity-25 rounded-full p-2" >
        <option  value="">Select Yes or No</option>
        <option value="true">Yes</option>
        <option value="false">No</option>
      </select>
      {dmodel?.issub? (<>
        <label  className="block text-md font-semibold text-emerald-500" htmlFor="pread">Sub-meter previous reading:</label>
        <input value={dmodel?.pread || ""} required type="text" name="pread" id="pread" 
        className=" w-full px-4 py-2 border border-emerald-500 text-emerald-50 bg-emerald-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
        onChange={onchanger} />
       
        <label  className="block text-md font-semibold text-emerald-500" htmlFor="rate">{`Rate[Rs. per unit]`}:</label>
        <input value={dmodel?.rate || ""} required type="text" name="rate" id="rate" 
        className=" w-full px-4 py-2 border border-emerald-500 text-emerald-50 bg-emerald-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
        onChange={onchanger} />
      </>): (<>
      </>) }

      {dmodel?.issub?(<> 
         <label  className="block text-md font-semibold text-emerald-500" htmlFor="cread">Sub-meter current reading:</label>
        <input value={dmodel?.cread || ""} required type="text" name="cread" id="cread" 
        className=" w-full px-4 py-2 border border-emerald-500 text-emerald-50 bg-emerald-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
        onChange={onchanger} /></>):(<>
  <label  className="block text-md font-semibold text-emerald-500" htmlFor="bsesbill">Electricity Meter bill by BSES:</label>
        <input value={dmodel?.bsesbill || ""} required type="text" name="bsesbill" id="bsesbill" 
        className=" w-full px-4 py-2 border border-emerald-500 text-emerald-50 bg-emerald-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
        onChange={onchanger} />
        </>)}

        <label  className="block text-md font-semibold text-emerald-500" htmlFor="bill">
        <p className='  text-center bg-emerald-500 bg-opacity-50 hover:bg-emerald-700 hover:cursor-pointer  p-2 rounded-full text-emerald-50' onClick={() =>calbill(dmodel.emtr,dmodel.month,dmodel.uid)}> Calculate Renter Electricity Bill:</p></label>
        <input value={dmodel?.bill || ""} required type="text" name="bill" id="bill"
        className=" w-full px-4 py-2 border border-emerald-500 text-emerald-50 bg-emerald-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
         onChange={onchanger} />
        <label  className="block text-md font-semibold text-emerald-500" 
        htmlFor="wbill">Water Bill:</label>
        <input value={dmodel?.wbill || ""} required type="text" name="wbill" id="wbill"
        className=" w-full px-4 py-2 border border-emerald-500 text-emerald-50 bg-emerald-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
         onChange={onchanger} />
        <label  className="block text-md font-semibold text-emerald-500" 
        htmlFor="mfee">Maid Fee:</label>
        <input value={dmodel?.mfee || ""} required type="text" name="mfee" id="mfee"
        className=" w-full px-4 py-2 border border-emerald-500 text-emerald-50 bg-emerald-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
         onChange={onchanger} />
        <label  className="block text-md font-semibold text-emerald-500" 
        htmlFor="pfee">Parking Fee:</label>
        <input value={dmodel?.pfee || ""} required type="text" name="pfee" id="pfee"
        className=" w-full px-4 py-2 border border-emerald-500 text-emerald-50 bg-emerald-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
         onChange={onchanger} />
        <label  className="block text-md font-semibold text-emerald-500" 
        htmlFor="mtot">
          <p className=' text-center bg-emerald-500 bg-opacity-50 hover:bg-emerald-700 hover:cursor-pointer  p-2 rounded-full text-emerald-50' onClick={() =>handletotal()}> Calculate Monthly Total :</p></label>
        <input value={dmodel?.mtot || ""} required type="text" name="mtot" id="mtot"
        className=" w-full px-4 py-2 border border-emerald-500 text-emerald-50 bg-emerald-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
         onChange={onchanger} />
        <label  className="block text-md font-semibold text-emerald-500" 
        htmlFor="bal">Previous Balance:</label>
        <input value={dmodel?.bal || ""} required type="text" name="bal" id="bal"
        className=" w-full px-4 py-2 border border-emerald-500 text-emerald-50 bg-emerald-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
         onChange={onchanger} />
        <label  className="block text-md font-semibold text-emerald-500" 
        htmlFor="gtot">
        <p className=' text-center bg-emerald-500 hover:bg-emerald-700 hover:cursor-pointer  bg-opacity-50 p-2 rounded-full text-emerald-50' onClick={() =>handlegtot()}> Calculate Grand Total :</p></label>
        <input value={dmodel?.gtot || ""} required type="text" name="gtot" id="gtot"
        className=" w-full px-4 py-2 border border-emerald-500 text-emerald-50 bg-emerald-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
         onChange={onchanger} />
        <label  className="block text-md font-semibold text-emerald-500" 
        htmlFor="paid">Paid this Month: </label>
        <input value={dmodel?.paid || ""} required type="text" name="paid" id="paid"
        className=" w-full px-4 py-2 border border-emerald-500 text-emerald-50 bg-emerald-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
         onChange={onchanger} />
        <label  className="block text-md font-semibold text-emerald-500" 
        htmlFor="pddt">Paid on which Date: </label>
        <input value={dmodel?.pddt || ""} required type="text" name="pddt" id="pddt"
        className=" w-full px-4 py-2 border border-emerald-500 text-emerald-50 bg-emerald-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
         onChange={onchanger} />
        <label  className="block text-md font-semibold text-emerald-500" 
        htmlFor="topay">
        <p className=' text-center bg-emerald-500  hover:bg-emerald-700 hover:cursor-pointer  bg-opacity-50 p-2 rounded-full text-emerald-50' onClick={() =>handletopay()}> Calculate Current Balance Amount To pay :</p></label>
        <input value={dmodel?.topay || ""} required type="text" name="topay" id="topay"
        className=" w-full px-4 py-2 border border-emerald-500 text-emerald-50 bg-emerald-600 bg-opacity-5 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-600"
         onChange={onchanger} />
        <br /> 
        <button className="w-full flex justify-center gap-2  py-2 mt-4  bg-emerald-500  text-white font-semibold rounded-md hover:bg-emerald-700  transition duration-300"
         onClick={updatedetials}>
          <MdSecurityUpdate size={25}/>
          Update Details</button>
      </form>
      </div>
      <div className="text-green-600 text-center">{alert}</div>
    
    
    
    </div>
    </>
);
}

function LoadParams({ setDbobj }) {
  const searchParams = useSearchParams();
  const eobj = searchParams.get('eobj');

 
  // const own = searchParams.get('owner');
  // const bid = searchParams.get('bid');
  useEffect(() => {
    if (eobj) {
      const deobj = eobj ? JSON.parse(decodeURIComponent(eobj)) : null;
      // const dbobj = JSON.parse(decodeURIComponent(bobj));
      setDbobj(
        {...deobj}
      );
    }}, [eobj, setDbobj]);

  return null;
}