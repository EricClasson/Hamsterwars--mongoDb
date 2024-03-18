import express from "express";
import router from "./src/router/routerTest.js";
import RouterHamster from "./src/router/RouterHamster.js";
import { fetchCollection } from "./src/mongodb/mongodb.js";
const app = express();
const port = 3000;

//configuration
app.use(express.json());

//routes
app.use(router);
app.use(RouterHamster);

// initialation
app.listen(port, async () => {
  console.log(`Server is live at http://localhost:${port} `);
});
