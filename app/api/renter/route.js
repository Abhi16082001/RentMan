import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

// export async function GET(request) {
// // Replace the uri string with your connection string.
// const uri = "mongodb+srv://mymarveluniverse108:UBDtVPAORAqwXmuZ@nextjs-cluster.tasg4.mongodb.net/";
// const client = new MongoClient(uri);
//   try {
//     const database = client.db('BuildingsDB');
//     const bldngs = database.collection('buildings');

//     // Query for a movie that has the title 'Back to the Future'
//     // const query = { title: 'Back to the Future' };
//     const query = { Bname:"Tower 1" };
//     const Build = await bldngs.find(query).toArray();
//     // console.log(Build);
//     if("Bname" in Build[0]){

//         return NextResponse.json(Build[0])
//     }else {return NextResponse.json("ye galat hai")}
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }


export async function PUT(request) {
  // Replace the uri string with your connection string.
  const uri = "mongodb+srv://mymarveluniverse108:UBDtVPAORAqwXmuZ@nextjs-cluster.tasg4.mongodb.net/";
  let renters= await request.json();
  const bname=renters.bname
  const renter={"Rname":renters.Rname,"floor":renters.floor}
  const client = new MongoClient(uri);
    try {
      const database = client.db('BuildingsDB');
      const bldngs = database.collection('buildings');

      const initialupdate= await bldngs.updateOne(
        { Bname: bname }, // Find the document by ID
        { $setOnInsert: { rentfloor: [] } }, // Initialize floor as an empty array if it doesn't exist
        { upsert: true } // Create a new document if one does not exist
      );
      console.log(bname)
console.log(renter)
      const result = await bldngs.updateOne(
        { Bname: bname}, // Find the document by ID
        { $push: { rentfloor: renter } } // Assuming 'yourArrayField' is the field to update
      );

      if (result.modifiedCount === 0 && initialupdate.modifiedCount === 0)  {
        return NextResponse.json({ ok: false, message: 'No documents updated' });
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

  // export async function POST(request) {
  //   // Replace the uri string with your connection string.
  //   const uri = "mongodb+srv://mymarveluniverse108:UBDtVPAORAqwXmuZ@nextjs-cluster.tasg4.mongodb.net/";
  //   let bld= await request.json()
    
  //   const client = new MongoClient(uri);
  //     try {
  //       const database = client.db('BuildingsDB');
  //       const bldngs = database.collection('buildings');
  //       const Build = await bldngs(bld);
    
  //       console.log(Build);
  //       return NextResponse.json({Build,ok:true})
  //     } finally {
  //       // Ensures that the client will close when you finish/error
  //       await client.close();
  //     }
  //   }