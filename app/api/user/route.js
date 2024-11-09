import { NextResponse } from "next/server";
import getClient from "@/lib/mongodb";

export async function GET(request) {
       
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('uid');
    const pwd = searchParams.get('pwd');
    // Replace the uri string with your connection string.
    const client = await getClient();
      try {
        const database = client.db('BuildingsDB');
        const usrs = database.collection('users');
    
        // Query for a movie that has the title 'Back to the Future'
        // const query = { title: 'Back to the Future' };
       
        const userexistence = await usrs.findOne({uid:id});
        console.log(userexistence)
        if(userexistence){
            const actpwd=userexistence.pwd;
            if(pwd==actpwd){
                return NextResponse.json({ok:true,userexistence})
            }
            else{
                return NextResponse.json({ok:false,message:"User Exist but Password is wrong !"})
            }
        }
    else{
        
        return NextResponse.json({ok:false,message:"User Doesn't Exist !!"})
    }
    
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
            const usrs = database.collection('users');
            const document = await usrs.findOne({ uid:bld.uid});
            if(document){  
                    return NextResponse.json({ message:`This user id [${bld.uid}] already exist choose another.`, ok: false }, { status: 404 });  
            }
            const Build = await usrs.insertOne(bld);
          
            console.log(Build);
            return NextResponse.json({Build,ok:true})
          } finally {
            // Ensures that the client will close when you finish/error
            // await client.close();
          }
        }