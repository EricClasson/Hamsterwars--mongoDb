import express from "express";

const router = express.Router();

router.get("/greeting/:name", (request, response) => {
  response.send("Hey " + request.params.name);
});

export default router;
