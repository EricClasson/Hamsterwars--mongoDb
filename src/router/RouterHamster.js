import express from "express";
import hamsterController from "../controller/hamstercontroller.js";

const router = express.Router();

router
  .post("/newHamsters", hamsterController.addHamster)
  .get("/hamsters", hamsterController.getAllHamsters)
  .get("/hamsters/:id", hamsterController.getHamsterId)
  .get("/randomHamster", hamsterController.randomPair)
  .delete("/Hamsters/:id", hamsterController.deleteItem)
  .patch("/hamsters/pair/:wonId/:lostId", hamsterController.votePair);

export default router;
