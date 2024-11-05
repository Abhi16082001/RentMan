import React from 'react'
import Link from 'next/link'
const Navbar = () => {
  return (
    <div>
      This is the Navbar !!
      <Link className='bg-indigo-500' href="/">
                Go to Home Page
            </Link>
    </div>
  )
}

export default Navbar
