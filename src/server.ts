import express, { Express } from "express";
import cors from "cors";
import { routes } from "./routes";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, (): void => {
  console.log("HTTP server running!");
});
