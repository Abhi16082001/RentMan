

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";


const uri = "mongodb+srv://mymarveluniverse108:UBDtVPAORAqwXmuZ@nextjs-cluster.tasg4.mongodb.net/";
let client;
let clientPromise;

if (!client) {
  client = new MongoClient(uri, {
    maxPoolSize: 10,
    minPoolSize: 2,
  });
  clientPromise = client.connect();
}

export default async function getClient() {
  await clientPromise;
  return client;
}

export async function GET(request) {
// Replace the uri string with your connection string.



const client = await getClient();
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
  
  let bld= await request.json()
  const client = await getClient();
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


  export async function PUT(request) {
    // Replace the uri string with your connection string.
    
    let bld= await request.json()
    const oldbname=bld.bnm
    const own=bld.owner
    const bname=bld.Bname
    const client = await getClient();
      try {
        const database = client.db('BuildingsDB');
        const bldngs = database.collection('buildings');
        const rntrs = database.collection('renters');
        const result = await bldngs.updateMany(
          { Bname: oldbname }, // Find the document by ID
          { $set: { Bname:bname, owner:own } } // Assuming 'yourArrayField' is the field to update
        );
        const result2 = await rntrs.updateMany(
          { Bname: oldbname }, // Find the document by ID
          { $set: { Bname:bname } } // Assuming 'yourArrayField' is the field to update
        );
        if (result.modifiedCount === 0 || result2.modifiedCount===0)  {
          return NextResponse.json({ ok: false, message: 'Not updated' });
        }
  
        console.log("Updated sucessfully",result);
      return NextResponse.json({ ok: true, modifiedCount: result.modifiedCount });
      } 
      catch (error) {
        console.error("Failed to update the document:", error);
        return NextResponse.json({ ok: false, error: error.message });
      }
      finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }


 

export async function DELETE(request) {
    // Replace the uri string with your connection string.
    
    
    // Parse the request body to get the ID or any unique identifier for deletion
    const { bname } = await request.json(); // Assuming the request body contains the ID to delete
console.log(bname)
console.log({ bname })
const client = await getClient();
    try {
        const database = client.db('BuildingsDB');
        const bldngs = database.collection('buildings');

        // Perform the delete operation
        const result = await bldngs.deleteOne({ Bname: bname });

        if (result.deletedCount === 1) {
            console.log(`Successfully deleted the Building with Bname: ${bname}`);
            return NextResponse.json({ message: `Building ${bname} deleted successfully.`, ok: true });
        } else {
            return NextResponse.json({ message: `No Building found with Bname: ${bname}.`, ok: false }, { status: 404 });
        }
    } catch (error) {
        console.error('Error deleting Building:', error);
        return NextResponse.json({ message: 'Internal Server Error', ok: false }, { status: 500 });
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

    