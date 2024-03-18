import { fetchCollection } from "../mongodb/mongodb.js";

const COLLECTION_NAME = "Hamsters";

// an array with the  hamsters
const Hamsters = [];

// Get all the hamsters
const getAll = async () => {
  return await fetchCollection(COLLECTION_NAME).find({}, { _id: 0 }).toArray();
};

// find a hamster by its id
const getHamster = async (id) => {
  return await fetchCollection(COLLECTION_NAME).findOne({ id });
};

const addHamster = async ({ name, ref }) => {
  const hamsterCollection = fetchCollection(COLLECTION_NAME);
  const count = await hamsterCollection.countDocuments({});
  const hamsterId = count + 1;
  const newHamster = { id: hamsterId, name, ref, vote: { won: 0, lost: 0 } };

  const result = await hamsterCollection.insertOne(newHamster);

  return result.insertedCount === 1;
};

const deleteHamster = (id) => {
  fetchCollection(COLLECTION_NAME).deleteOne({ id });
};

const getTwoRandom = async () => {
  const hamsters = await getAll();

  const randomHamsters = [];

  while (randomHamsters.length < 2) {
    const randomIndex = Math.floor(Math.random() * hamsters.length);
    const randomHamster = hamsters[randomIndex];

    if (!randomHamsters.find((hamster) => hamster.id === randomHamster.id)) {
      randomHamsters.push(randomHamster);
    }
  }

  return randomHamsters;
};

const vote = async (won, lost) => {
  try {
    const winner = await fetchCollection(COLLECTION_NAME).findOne({ id: won });
    const loser = await fetchCollection(COLLECTION_NAME).findOne({ id: lost });

    if (!winner || !loser) {
      throw new Error("One or both hamsters not found");
    }

    const result = await fetchCollection(COLLECTION_NAME).updateOne(
      { id: winner.id },
      { $inc: { "vote.won": 1 } }
    );

    if (result.modifiedCount !== 1) {
      throw new Error("Failed to update winner vote count");
    }

    await fetchCollection(COLLECTION_NAME).updateOne(
      { id: loser.id },
      { $inc: { "vote.lost": 1 } }
    );

    return { success: true };
  } catch (error) {
    console.error("Error when voting:", error);
    return { success: false, error: error.message };
  }
};

export default {
  getAll,
  getHamster,
  addHamster,
  deleteHamster,
  getTwoRandom,
  vote,
};
