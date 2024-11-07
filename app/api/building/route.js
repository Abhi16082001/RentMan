import { NextResponse } from "next/server";
import getClient from "@/lib/mongodb";
import { ObjectId } from 'mongodb';
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
    // await client.close();
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
      // await client.close();
    }
  }


  export async function PUT(request) {
    // Replace the uri string with your connection string.
    
    let bld= await request.json()
    const bid=bld.bid
    const own=bld.owner
    const bname=bld.Bname
    const client = await getClient();
      try {
        const database = client.db('BuildingsDB');
        const bldngs = database.collection('buildings');
        // const rntrs = database.collection('renters');
        const result = await bldngs.updateMany(
          { _id:new ObjectId(bid) }, // Find the document by ID
          { $set: { Bname:bname, owner:own } } // Assuming 'yourArrayField' is the field to update
        );
        // const result2 = await rntrs.updateMany(
        //   { Bname: oldbname }, // Find the document by ID
        //   { $set: { Bname:bname } } // Assuming 'yourArrayField' is the field to update
        // ); add result2.modifiedcount ===0 in the just below if statement
        if (result.modifiedCount === 0)  {
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
        // await client.close();
      }
    }


 

export async function DELETE(request) {
    // Replace the uri string with your connection string.
    
    
    // Parse the request body to get the ID or any unique identifier for deletion
    const {bid} = await request.json(); // Assuming the request body contains the ID to delete

const client = await getClient();
    try {
        const database = client.db('BuildingsDB');
        const bldngs = database.collection('buildings');
        const document = await bldngs.findOne({ _id: new ObjectId(bid),rentfloor:[] });
        // Perform the delete operation
        if(document){
        const result = await bldngs.deleteOne({_id: new ObjectId(bid)  });

        if (result.deletedCount === 1) {
            console.log(`Successfully deleted the Building with Bname: ${bid}`);
            return NextResponse.json({ message: `Building ${bid} deleted successfully.`, ok: true });
        } else {
            return NextResponse.json({ message: `No Building found with Bname: ${bid}.`, ok: false }, { status: 404 });
        }}
      else{
        return NextResponse.json({ message: `This building ${bid} is having floors, first delete them to delete building.`, ok: false }, { status: 404 });
      }
    } catch (error) {
        console.error('Error deleting Building:', error);
        return NextResponse.json({ message: 'Internal Server Error', ok: false }, { status: 500 });
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}

    