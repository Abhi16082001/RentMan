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
    const bldngs = database.collection('renters');

    // Extract `bname` from the query parameters
    const { searchParams } = new URL(request.url);
    const bname = searchParams.get('bname');

    // Define the query filter
    const query = { Bname: bname };

    // Find all documents matching the query
    const Build = await bldngs.find(query).toArray();

    return NextResponse.json({ success: true, Build });
  } finally {
    // Ensure that the client closes when finished
    await client.close();
  }
}


// export async function PUT(request) {
//   // Replace the uri string with your connection string.
//   const uri = "mongodb+srv://mymarveluniverse108:UBDtVPAORAqwXmuZ@nextjs-cluster.tasg4.mongodb.net/";
//   let renters= await request.json();
//   const bname=renters.bname
//   const renter={"Rname":renters.Rname,"floor":renters.floor}
//   const client = new MongoClient(uri);
//     try {
//       const database = client.db('BuildingsDB');
//       const bldngs = database.collection('buildings');

//       const initialupdate= await bldngs.updateOne(
//         { Bname: bname }, // Find the document by ID
//         { $setOnInsert: { rentfloor: [] } }, // Initialize floor as an empty array if it doesn't exist
//         { upsert: true } // Create a new document if one does not exist
//       );
//       console.log(bname)
// console.log(renter)
//       const result = await bldngs.updateOne(
//         { Bname: bname}, // Find the document by ID
//         { $push: { rentfloor: renter } } // Assuming 'yourArrayField' is the field to update
//       );

//       if (result.modifiedCount === 0 && initialupdate.modifiedCount === 0)  {
//         return NextResponse.json({ ok: false, message: 'No documents updated' });
//       }

//       console.log("Updated sucessfully",result);
//     return NextResponse.json({ ok: true, modifiedCount: result.modifiedCount });
//     } 
//     catch (error) {
//       console.error("Failed to update the document:", error);
//       return NextResponse.json({ ok: false, error: error.message });
//     }
//     finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }

  export async function POST(request) {
    // Replace the uri string with your connection string.
    
    let bld= await request.json()
    
    const client = await getClient();
      try {
        const database = client.db('BuildingsDB');
        const bldngs = database.collection('renters');
        const Build = await  bldngs.insertOne(bld);
    
        console.log(Build);
        return NextResponse.json({Build,ok:true})
      } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
      }
    }


    export async function DELETE(request) {
      // Replace the uri string with your connection string.
      
      // Parse the request body to get the ID or any unique identifier for deletion
      const renter = await request.json(); // Assuming the request body contains the ID to delete
      const rname=renter.Rname
      const floor=renter.floor
      const bname=renter.bnm
  console.log(renter)
  const client = await getClient();
      try {
          const database = client.db('BuildingsDB');
          const bldngs = database.collection('renters');
  
          // Perform the delete operation
          const result = await bldngs.deleteOne({ Bname:bname,Rname: rname,floor:floor });
  
          if (result.deletedCount === 1) {
              console.log(`Successfully deleted the Renter ${rname} of ${floor} Floor`);
              return NextResponse.json({ message: `Renter ${rname} of ${floor} Floor deleted successfully.`, ok: true });
          } else {
              return NextResponse.json({ message: `No Renter ${rname} found in ${floor} Floor.`, ok: false }, { status: 404 });
          }
      } catch (error) {
          console.error('Error deleting Renter:', error);
          return NextResponse.json({ message: 'Internal Server Error', ok: false }, { status: 500 });
      } finally {
          // Ensures that the client will close when you finish/error
          await client.close();
      }
  }