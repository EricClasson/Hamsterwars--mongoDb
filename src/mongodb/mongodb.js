import { MongoClient } from "mongodb";

let db;

const dbDetails = {
  username: "ericclasson2",
  password: "cKEEg8bhhkF9TIQz",
};

const url = (username, password) => {
  return `mongodb+srv://${username}:${password}@cluster1.ovzabe0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1`;
};

export function fetchCollection(name) {
  return fetchDatabase().collection(name);
}

function fetchDatabase() {
  if (db != undefined) {
    return db;
  }

  const client = new MongoClient(url(dbDetails.username, dbDetails.password));

  db = client.db("Hamsterwars-mongodb");

  return db;
}
