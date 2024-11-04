

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
// Replace the uri string with your connection string.
const uri = "mongodb+srv://mymarveluniverse108:UBDtVPAORAqwXmuZ@nextjs-cluster.tasg4.mongodb.net/";


const client = new MongoClient(uri);
  try {
    const database = client.db('BuildingsDB');
    const bldngs = database.collection('buildings');

    // Query for a movie that has the title 'Back to the Future'
    // const query = { title: 'Back to the Future' };
    const query = {  };
    const Build = await bldngs.find(query).toArray();

    return NextResponse.json({success:true,Build})
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}


export async function POST(request) {
  // Replace the uri string with your connection string.
  const uri = "mongodb+srv://mymarveluniverse108:UBDtVPAORAqwXmuZ@nextjs-cluster.tasg4.mongodb.net/";
  let bld= await request.json()
  console.log(bld)
  const client = new MongoClient(uri);
    try {
      const database = client.db('BuildingsDB');
      const bldngs = database.collection('buildings');
      const Build = await bldngs.insertOne(bld);
  
      console.log(Build);
      return NextResponse.json({Build,ok:true})
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }