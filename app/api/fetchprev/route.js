import { NextResponse } from "next/server";
import getClient from "@/lib/mongodb";
import { ObjectId } from 'mongodb';

export async function GET(request) {
 
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('uid');
  // Replace the uri string with your connection string.
  const client = await getClient();
    try {
      const database = client.db('BuildingsDB');
      const rntrs = database.collection('renters');
      // Query for a movie that has the title 'Back to the Future'
      // const query = { title: 'Back to the Future' };
      const query = { "uid": id, };
      const alluid = await rntrs.find(query).toArray();
      


if (alluid.length === 0) {
    console.log('No records found for the given user ID.');
    return NextResponse.json({success:false}) // Handle the case where no records are found
  }
  
  // Sort the records by the "month" field in descending order
  const sortedRecords = alluid.sort((a, b) => b.month.localeCompare(a.month));
  
  // Get the latest record
  const latestRecord = sortedRecords[0]; // The first record after sorting is the latest
  
  console.log('Latest record:', latestRecord);
  
  // If you only want the "month" field
  const latestMonth = latestRecord.month;
  console.log('Latest month:', latestMonth);
  

      return NextResponse.json({success:true,latestRecord})
    } finally {
      // Ensures that the client will close when you finish/error
      // await client.close();
    }
  }