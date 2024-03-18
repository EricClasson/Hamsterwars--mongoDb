import hamstersService from "../service/service.js";

const getAllHamsters = async (req, resp) => {
  const hamsters = await hamstersService.getAll();

  if (hamsters.lenght == 0) {
    return resp.status(204).send({ message: "No hamsters is avalibale" });
  }
  resp.send(await hamstersService.getAll());
};

const getHamsterId = async (req, res) => {
  res.send(await hamstersService.getHamster(Number(req.params.id)));
};

const addHamster = async (req, res) => {
  const { name, ref, vote } = req.body;

  if (name === undefined || ref === undefined) {
    return res.status(400).send({ err: "Missing parameters name or ref" });
  }

  try {
    await hamstersService.addHamster({ name, ref, vote });
    res.status(201).send({ msg: "Item was added" });
  } catch (error) {
    console.error("Error adding hamster:", error);
    res.status(500).send({ err: "Internal server error" });
  }
};

const randomPair = async (req, res) => {
  res.json(await hamstersService.getTwoRandom());
};

const deleteItem = async (req, resp) => {
  await hamstersService.deleteHamster(Number(req.params.id));

  resp.status(200).send({ msg: "success" });
};

const votePair = async (req, res) => {
  const won = Number(req.params.wonId);
  const lost = Number(req.params.lostId);

  if (!Number.isInteger(won) && !Number.isInteger(lost)) {
    res.status(400).send({ msg: "bad reguest" });
  } else {
    res.status(201).send({ msg: "items are updated" });
  }
  await hamstersService.vote(won, lost);

  console.log(won);
  console.log(lost);
};

export default {
  getAllHamsters,
  getHamsterId,
  addHamster,
  deleteItem,
  randomPair,
  votePair,
};
