import 'dotenv/config'
import express, { Express } from "express";
import cors from "cors";

const app: Express = express();
const PORT: number = 3000 || process.env.PORT;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
