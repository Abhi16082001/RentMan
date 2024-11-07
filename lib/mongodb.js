import { MongoClient } from "mongodb";


const uri = "mongodb+srv://mymarveluniverse108:UBDtVPAORAqwXmuZ@nextjs-cluster.tasg4.mongodb.net/";
let client;
let clientPromise;

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, {
    maxPoolSize: 10,
    minPoolSize: 2,
  });
  // clientPromise = client.connect();
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;
export default async function getClient() {
  return  clientPromise;
  // return client;
}