import { NextResponse } from "next/server";
import getClient from "@/lib/mongodb";
import { ObjectId } from 'mongodb';

export async function GET(request) {
    // Replace the uri string with your connection string.
    const client = await getClient();
      try {
        const database = client.db('BuildingsDB');
        const bldngs = database.collection('renters');
        const { searchParams } = new URL(request.url);
        const uid = searchParams.get('uid');
        const query = {
            "uid": uid,
          };
        
        // Query for a movie that has the title 'Back to the Future'
        // const query = { title: 'Back to the Future' };
        const mdtl = await bldngs.find(query).toArray();
    
        return NextResponse.json({success:true,mdtl})
      } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
      }
    }