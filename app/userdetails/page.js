"use client"
import React from 'react'
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
export default function Page() {
  const [dmobj, setdmobj] = useState(null)
    return (
  <>
  <Suspense fallback={<div>Loading...</div>}>
        <LoadParams setDbobj={setdmobj} />
      </Suspense>
  
      <div>These are the All Details</div>
      <p>Month: {dmobj?dmobj.month: "Loading..."}</p>
      <p>Floor Name: {dmobj?dmobj.Bdetails.floor: "Loading..."}</p>
      <p>Renter ID: {dmobj?dmobj.uid: "Loading..."}</p>
      <p>Renter Name: {dmobj?dmobj.uname: "Loading..."}</p>
      <p>Month Rent: {dmobj?dmobj.rent: "Loading..."}</p>
      <p>Electricity Bill: {dmobj?dmobj.bill: "Loading..."}</p>
      <p>Water Bill  :{dmobj?dmobj.wbill: "Loading..."}</p>
      <p>Maid Fee   :{dmobj?dmobj.mfee: "Loading..."}</p>
      <p>Parking Fee  :{dmobj?dmobj.pfee: "Loading..."}</p>
      <p>Monthly Total   :{dmobj?dmobj.mtot: "Loading..."}</p>
      <p>Previous Balance   :{dmobj?dmobj.bal: "Loading..."}</p>
      <p>Grand Total   :{dmobj?dmobj.gtot: "Loading..."}</p>
      <p>Paid this month:{dmobj?dmobj.paid: "Loading..."}</p>
      <p>Paid On: {dmobj?dmobj.pddt: "Loading..."}</p>
      <p>Current Balance to Pay:{dmobj?dmobj.topay:"Loading ..."} </p>
  </>
  
    );
  }

  function LoadParams({ setDbobj }) {

    const searchParams = useSearchParams();
    const mobj = searchParams.get('mobj');
    useEffect(() => {
      if (mobj) {
        const dmobj = mobj ? JSON.parse(decodeURIComponent(mobj)) : null;
        setDbobj(
          {...dmobj}
        );
      }}, [mobj, setDbobj]);
  
    return null;
  }