import { NextResponse } from "next/server";
import getClient from "@/lib/mongodb";
import { ObjectId } from 'mongodb';

export async function GET(request) {
  // Replace the uri string with your connection string.
  
  const client = await getClient();

  try {
    const database = client.db('BuildingsDB');
    const bldngs = database.collection('buildings');

    // Extract `bname` from the query parameters
    const { searchParams } = new URL(request.url);
    const bid = searchParams.get('bid');
console.log(bid)
    // Define the query filter
    const query = { _id: new ObjectId(bid) };

    // Find all documents matching the query
    const Build = await bldngs.findOne(query);
    const renters= Build.rentfloor
    return NextResponse.json({ success: true, renters });
  } finally {
    // Ensure that the client closes when finished
    // await client.close();
  }
}


export async function PUT(request) {
  // Replace the uri string with your connection string.
  
  let renters= await request.json();
  const bid=renters.Bid
  const renter={"uid":renters.uid,"uname":renters.uname,"floor":renters.floor}
  const client = await getClient();
    try {
      const database = client.db('BuildingsDB');
      const bldngs = database.collection('buildings');

      const initialupdate= await bldngs.updateOne(
        { _id:new ObjectId(bid) }, // Find the document by ID
        { $setOnInsert: { rentfloor: [] } }, // Initialize floor as an empty array if it doesn't exist
        { upsert: true } // Create a new document if one does not exist
      );
console.log(renter)


const building = await bldngs.findOne({ _id: new ObjectId(bid)});
const existingFloorIndex = await building.rentfloor.findIndex(item => item.floor === renters.floor);
if (existingFloorIndex !== -1) {
  // Floor exists; update the element
  building.rentfloor[existingFloorIndex] = { ...renter  };
} else {
      // const result = await bldngs.updateOne(
      //   { _id: new ObjectId(bid)}, // Find the document by ID
      //   { $push: { rentfloor: renter } } // Assuming 'yourArrayField' is the field to update
      // );
      building.rentfloor.push(renter );
    }
    const result=await bldngs.updateOne(
      { _id: new ObjectId(bid)},
      { $set: { rentfloor: building.rentfloor } }
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
      // await client.close();
    }
  }




    export async function DELETE(request) {
      // Replace the uri string with your connection string.
      
      // Parse the request body to get the ID or any unique identifier for deletion
      const renter = await request.json(); // Assuming the request body contains the ID to delete
      const unm=renter.uname
      const rid=renter.uid
      const floor=renter.floor
      const Bid=renter.bid
  console.log(renter) 
  const client = await getClient();
      try {
          const database = client.db('BuildingsDB');
          const bldngs = database.collection('buildings');
          const rntrs= database.collection('renters');
          const usrs= database.collection('users');
          const query = {
            "Bdetails.Bid": Bid,
            "Bdetails.floor": floor,
          };
          const document = await rntrs.findOne(query);
          if(document){
            return NextResponse.json({ message: `Cannot Delete due to some data in ${floor} Floor, Delete that first.`, ok: false }, { status: 404 });
          }
          
          // Perform the delete operation
          else{
          const result = await bldngs.updateOne(
            {_id: new ObjectId(Bid) }, // Query condition to match the document
            { 
              $pull: { 
                rentfloor: { uname:unm, floor:floor } // Object condition to match in the array
              }
            }
          )
  
          const result2 = await usrs.deleteOne({ uid: rid });

          if (result.modifiedCount === 1 && result2.deletedCount === 1) {
              console.log(`Successfully deleted the Renter ${unm} of ${floor} Floor`);
              return NextResponse.json({ message: `Renter ${unm} of ${floor} Floor deleted successfully.`, ok: true });
          } else {
              return NextResponse.json({ message: `No Renter ${unm} found in ${floor} Floor.`, ok: false }, { status: 404 });
          }}
      } catch (error) {
          console.error('Error deleting Renter:', error);
          return NextResponse.json({ message: 'Internal Server Error', ok: false }, { status: 500 });
      } finally {
          // Ensures that the client will close when you finish/error
          // await client.close();
      }
  }