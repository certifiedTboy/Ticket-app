import { app } from "./app";
import { connectDb } from "./utils/db-connect";
import { connectListeners } from "./utils/events";

const startServer = async () => {
  await connectDb();
  await connectListeners();

  app.listen(3000, () => {
    console.log("listening on port 3000");
  });
};

startServer();
