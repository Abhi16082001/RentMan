import { NextResponse } from "next/server";
import getClient from "@/lib/mongodb";
import { ObjectId } from 'mongodb';


export async function GET(request) {
    const client = await getClient();
  
    try {
      const database = client.db('BuildingsDB');
      const bldngs = database.collection('renters');
  
      // Extract `bid` and `floor` from the query parameters
      const { searchParams } = new URL(request.url);
      const bid = searchParams.get('bid');
      const flr = searchParams.get('floor');
      const mnth= searchParams.get('mnth');
      // Define the query filter using dot notation
      const query = {
        "Bdetails.Bid": bid,
        "Bdetails.floor": flr,
        "month":mnth,
      };
     
      const Detail = await bldngs.findOne(query);
      const details = Detail ? Detail : null;
      console.log(details)
      return NextResponse.json({details, success: true });
    } catch (error) {
      console.error('Error fetching data:', error);
      return NextResponse.json({ success: false, error: error.message });
    } finally {
    //   await client.close();
    }
  }
  

    export async function POST(request) {
        // Replace the uri string with your connection string.
        
        let bld= await request.json()
        let mnth=bld.month
        let bid=bld.Bdetails.Bid
        let flr=bld.Bdetails.floor
        const client = await getClient();
          try {
            const database = client.db('BuildingsDB');
            const bldngs = database.collection('renters');
            const query = {
              "Bdetails.Bid": bid,
              "Bdetails.floor": flr,
              "month":mnth,
            };
            const existingmonth = await bldngs.findOne(query);
            if (existingmonth) {
              // return NextResponse.json({ok:false, success: false, message: `${mnth} Data already exist, You can just edit it.` });
              return NextResponse.json({ success: false, ok:false,message: `${mnth} Data already exist, You can just edit it.` });
            }
            else{
            const Build = await  bldngs.insertOne(bld);
        
            console.log(Build);
            return NextResponse.json({Build,ok:true})}
          } finally {
            // Ensures that the client will close when you finish/error
            // await client.close();
          }
        }



        export async function PUT(request) {
          // Replace the uri string with your connection string.
          
          let bld= await request.json()
          const rdetails={Rname:bld.Rname, month:bld.month,rent:bld.rent,bill:bld.bill,}
          const bdetails={Bid:bld.bid,floor:bld.floor}
          const client = await getClient();
            try {
              const database = client.db('BuildingsDB');
              const bldngs = database.collection('buildings');
              const rntrs = database.collection('renters');
              const result = await rntrs.updateOne(
                {  _id:new ObjectId(bld.rid) }, // Find the document by ID
                { $set: { ...rdetails,Bdetails:bdetails } } // Assuming 'yourArrayField' is the field to update
              ); 
              const result2 = await bldngs.updateOne(
                { _id:new ObjectId(bld.bid), "rentfloor.floor": bld.floor }, // Find the document by ID
                { $set: { "rentfloor.$.Rname": bld.Rname } } // Assuming 'yourArrayField' is the field to update
              );
              if (result.modifiedCount === 0 || result2.modifiedCount===0)  {
                return NextResponse.json({ ok: false, message: 'Not updated' });
              }
        
              console.log("Updated sucessfully",result);
            return NextResponse.json({ ok: true, modifiedCount: result.modifiedCount });
            } 
            catch (error) {
              console.error("Failed to update details:", error);
              return NextResponse.json({ ok: false, error: error.message });
            }
            finally {
              // Ensures that the client will close when you finish/error
              // await client.close();
            }
          }