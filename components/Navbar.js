// "use client"
// import React from 'react'
// import Link from 'next/link'
// import { useData } from '@/app/context/DataContext';
// const Navbar = () => {
//   const {setData}  = useData();
//   const handleLogout = () => {
//     setData(null);  // Set the context data to null
//   };
//   const Data = useData();
// const user=Data.data
//   return (
//     <div>
//       This is the Navbar !!
//       <p>UserName: {user?user.uname:""}</p>
//       <p>User ID: {user?user.uid:""}</p>
//       <p>User Status: {user?(user.owner?"Owner":"Renter"):""}</p>
//       <Link onClick={handleLogout} className='bg-indigo-500' href="/">
//                 Log Out
//             </Link>
//     </div>
//   )
// }

// export default Navbar


"use client"
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
// import { useData } from '@/app/context/DataContext';  // Adjust the import path accordingly

const Navbar = () => {
  const router = useRouter();
  // const { data, setData } = useData();  // Access both data and setData in one hook

  // const handleLogout = (e) => {
  //   e.preventDefault();  // Prevent default link navigation behavior
  //   setData(null);  // Set the context data to null
  //   localStorage.removeItem('userData'); 
  //   router.push("/");
  // };

  return (
    <div>
      This is the Navbar !!
      {/* {data ? (
        <>
          <p>UserName: {data.uname}</p>
          <p>User ID: {data.uid}</p>
          <p>User Status: {data.owner ? "Owner" : "Renter"}</p>
        </>
      ) : (
        <p>No user data found.</p>
      )} */}

      {/* Use Link for navigation but prevent default link behavior on logout */}
      <Link  href="/" className='bg-indigo-500'>
        Log Out
      </Link>
    </div>
  )
}

export default Navbar;
