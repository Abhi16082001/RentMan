"use client"
import React from 'react'
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
// import { useData } from '@/app/context/DataContext';
export default function Page() {
  const router = useRouter();
  // const Data = useData();
  // const user=Data.data
  // console.log(user)
  const [bid, setbid] = useState()
  const [bldmodel, setbldmodel]= useState({})
  const [bld, setbld]=useState([])
  const [alert, setalert] = useState("")
  const [dalert, setdalert] = useState("")
  const fetchbuild= async (uid) => {

    const response= await fetch(`api/building?uid=${uid}`)
    let bjson= await response.json()
    console.log(bjson.Build)
    setbld(bjson.Build)
    if(bjson.Build.length==0){
      setalert("No Buildings Added")
    }
    


  }
  useEffect(() => {
    console.log(bid)
  if(bid) fetchbuild(bid);
  
},
[bid])

const onchange=(e) => {
  setbldmodel({
    ...bldmodel,
    [e.target.name]: e.target.value,
    rentfloor: bldmodel.rentfloor || [] // Add an empty array if rentfloor does not exist
  });
  
}

const handleClick = (bnm,bid) => {
  const obj = { bname: bnm, id:bid  };
  const encodedObj = encodeURIComponent(JSON.stringify(obj));
  router.push(`/renter?bobj=${encodedObj}`);
};

const handledit=(bid,bnm) => {
  const obj = { bname: bnm, id:bid  };
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
  const co = { uid:bid,...bldmodel };
  console.log(co)
  e.preventDefault();
  try{
    const response= await fetch('api/building',{
      method:'POST',
      headers:{ 'Content-Type':'application/json'},
      body: JSON.stringify(co)
    });
    if(response.ok){
      console.log("Building Added Sucessfully ! ")
      setalert("Building Added Successfully !!")
      setbldmodel({})
    }
    else{
      console.log("Error adding Building !!")
      setalert("Error in adding Building !!")
    }
  }
  catch(error){
console.error('Error:',error);
  }
}


  return (
    <>
<Suspense fallback={<div>Loading...</div>}>
        <LoadParams setDbobj={setbid} />

      </Suspense>

    <div> Hi this is the new rent man app</div>

    <form>
        <label htmlFor="Bname">Building Name</label>
        <input  pattern="^(?!\s*$).+" // Ensures that input is not just spaces
  title="This field cannot be empty or just spaces" value={bldmodel?.Bname || ""} required type="text" name="Bname" id="Bname" onChange={onchange} />
        {/* <label htmlFor="owner">Owner Name</label>
        <input  pattern="^(?!\s*$).+" // Ensures that input is not just spaces
  title="This field cannot be empty or just spaces" value={bldmodel?.owner || ""} required type="text" name="owner" id="owner" onChange={onchange} /> */}
        <br /> 
        <button className="bg-green-600" onClick={addbuilding}>Add Building</button>
      </form>
      <div className="text-green-600 text-center">{alert}</div>
    <h1>All Buildings</h1>
    {bld.map(b=>{
      return <div key={b._id}><button  className='text-teal-400 hover:cursor-pointer' onClick={() => handleClick(b.Bname,b._id)}>Building name : {b.Bname} .</button> <button className="bg-green-500" onClick={() => handledit(b._id,b.Bname)}>Edit</button> <button className="bg-red-500" onClick={() => deletebuilding(b._id)}>Delete</button> </div> 
  })}
   <div className="text-red-600 text-center">{dalert}</div>
    </>
  );
}

function LoadParams({ setDbobj }) {


  const searchParams = useSearchParams();
  const udtl = searchParams.get('udtl');
    

  // const robj = searchParams.get('robj');
  // const drobj = robj ? JSON.parse(decodeURIComponent(robj)) : null;
    
  

  // const own = searchParams.get('owner');
  // const bid = searchParams.get('bid');
  useEffect(() => {
    if (udtl) {
    console.log(udtl)
      // const dbobj = JSON.parse(decodeURIComponent(bobj));
     setDbobj(
        udtl
        
      );
    }}, [udtl, setDbobj]);

  return null;
}




// "use client"
// import React, { useState, useEffect, Suspense } from "react";
// import { useRouter, useSearchParams } from 'next/navigation';

// export default function Page() {
//   const router = useRouter();
//   const [bid, setbid] = useState();
//   const [bldmodel, setbldmodel] = useState({ rentfloor: [] });
//   const [bld, setbld] = useState([]);
//   const [alert, setalert] = useState("");
//   const [dalert, setdalert] = useState("");
//   // const searchParams = useSearchParams();
//   // const udtl = searchParams.get('udtl');
//   const fetchbuild = async (uid) => {
//     const response = await fetch(`/api/building?uid=${uid}`);
//     let bjson = await response.json();
//     setbld(bjson.Build);
//     console.log(bld)
//     if (bjson.Build.length === 0) setalert("No Buildings Added");
//   };

//   useEffect(() => {
//     if (bid) fetchbuild(bid);
//   }, [bid]);

//   const onchange = (e) => {
//     setbldmodel({
//       ...bldmodel,
//       [e.target.name]: e.target.value,
//       rentfloor: bldmodel.rentfloor || [],
//     });
//   };

//   const handleClick = (bnm, bid) => {
//     const obj = { bname: bnm, id: bid };
//     const encodedObj = encodeURIComponent(JSON.stringify(obj));
//     router.push(`/renter?bobj=${encodedObj}`);
//   };

//   const handledit = (bid, bnm) => {
//     const obj = { bname: bnm, id: bid };
//     const encodedObj = encodeURIComponent(JSON.stringify(obj));
//     router.push(`/editbuilding?bobj=${encodedObj}`);
//   };

//   const deletebuilding = async (bid) => {
//     setdalert("Deleting Building...");
//     try {
//       const response = await fetch('/api/building', {
//         method: 'DELETE',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ bid }),
//       });

//       const data = await response.json();
//       if (!response.ok) throw new Error(data.message || 'Failed to delete the Building');
//       setdalert("Building deleted successfully.");
//     } catch (error) {
//       setdalert("Error deleting building.");
//       console.error('Error:', error);
//     }
//   };

//   const addbuilding = async (e) => {
//     e.preventDefault();
//     setalert("Adding Building...");
//     const co = { uid:bid, ...bldmodel };
//     try {
//       const response = await fetch('/api/building', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(co),
//       });
//       if (response.ok) {
//         setalert("Building Added Successfully!");
//         setbldmodel({});
//       } else {
//         setalert("Error in adding Building.");
//       }
//     } catch (error) {
//       setalert("Error in adding Building.");
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <>
//     <Suspense fallback={<div>Loading...</div>}>
//       <LoadParams setDbobj={setbid} />
//       </Suspense>
//       <div>Hi, this is the new rent man app</div>

//       <form onSubmit={addbuilding}>
//         <label htmlFor="Bname">Building Name</label>
//         <input
//           pattern="^(?!\s*$).+"
//           title="This field cannot be empty or just spaces"
//           value={bldmodel?.Bname || ""}
//           required
//           type="text"
//           name="Bname"
//           id="Bname"
//           onChange={onchange}
//         />
//         <br />
//         <button type="submit" className="bg-green-600">Add Building</button>
//       </form>
//       <div className="text-green-600 text-center">{alert}</div>

//       <h1>All Buildings</h1>
//       {bld.map((b) => (
//         <div key={b._id}>
//           <button
//             className='text-teal-400 hover:cursor-pointer'
//             onClick={() => handleClick(b.Bname, b._id)}
//           >
//             Building name : {b.Bname}.
//           </button>
//           <button className="bg-green-500" onClick={() => handledit(b._id, b.Bname)}>Edit</button>
//           <button className="bg-red-500" onClick={() => deletebuilding(b._id)}>Delete</button>
//         </div>
//       ))}
//       <div className="text-red-600 text-center">{dalert}</div>
//     </>
//   );
// }

// function LoadParams({ setDbobj }) {
//   const searchParams = useSearchParams();
//   const udtl = searchParams.get('udtl');

//   useEffect(() => {
//     if (udtl) setDbobj(udtl);
//   }, [udtl, setDbobj]);

//   return null;
// }
