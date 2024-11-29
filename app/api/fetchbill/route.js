import { NextResponse } from "next/server";
import getClient from "@/lib/mongodb";

export async function GET(request) {
 
    const { searchParams } = new URL(request.url);
    const meter = searchParams.get('meter');
    const mnth = searchParams.get('month');
  // Replace the uri string with your connection string.
  const client = await getClient();
    try {
      const database = client.db('BuildingsDB');
      const rntrs = database.collection('renters');
      // Query for a movie that has the title 'Back to the Future'
      // const query = { title: 'Back to the Future' };
      const query = { "month": mnth,"emtr":meter,"issub":true };
      const alluid = await rntrs.findOne(query);
      


if (!alluid) {
    console.log('No records found for the given user ID.');
    return NextResponse.json({success:false}) // Handle the case where no records are found
  }
  
  // Sort the records by the "month" field in descending order

  
  // Get the latest record
 
  
  console.log('Other side bill record:', alluid);
  
  // If you only want the "month" field
  const ebill = alluid.bill;
  console.log('Ebill of other side:', ebill);
   

      return NextResponse.json({success:true,ebill})
    } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
    }
  }