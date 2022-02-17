import express, { Request, Response, NextFunction } from "express";
import { json } from "body-parser";
import { ENV } from "./config/environment";
import cors from "cors";

import { trackRouter } from "./router/track.router";

const app = express();
app.use(json());
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

app.use("/api", trackRouter);

app.listen(ENV.PORT, () => {
  console.log(`API is running on port ${ENV.PORT}.`);
});
