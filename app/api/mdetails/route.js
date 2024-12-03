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
    const bid = searchParams.get('Bid');
    const flr = searchParams.get('floor');
    const query = {
        "Bdetails.Bid": bid,
        "Bdetails.floor": flr,
      };
    
    // Query for a movie that has the title 'Back to the Future'
    // const query = { title: 'Back to the Future' };
    const mdtl = await bldngs.find(query).toArray();
    mdtl.sort((a, b) => new Date(b.month) - new Date(a.month));
    return NextResponse.json({success:true,mdtl})
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}


export async function DELETE(request) {
    // Replace the uri string with your connection string.
    
    
    // Parse the request body to get the ID or any unique identifier for deletion
    const {mid} = await request.json(); // Assuming the request body contains the ID to delete

const client = await getClient();
    try {
        const database = client.db('BuildingsDB');
        const bldngs = database.collection('renters');
        // Perform the delete operation
      
        const result = await bldngs.deleteOne({_id: new ObjectId(mid)  });

        if (result.deletedCount === 1) {
            console.log(`Successfully deleted the Month details`);
            return NextResponse.json({ message: `Month details deleted successfully.`, ok: true });
        } else {
            return NextResponse.json({ message: `No month details found with ID: ${mid}.`, ok: false }, { status: 404 });
        }
     
    } catch (error) {
        console.error('Error deleting Month details:', error);
        return NextResponse.json({ message: 'Internal Server Error', ok: false }, { status: 500 });
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}