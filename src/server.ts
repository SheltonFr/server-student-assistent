import "dotenv/config";
import express, { Express } from "express";
import cors from "cors";
import router from "./routes";
import ip from 'ip'


const app: Express = express();
const PORT: number = 3000 || process.env.PORT;

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/student.assistent/api", router);

app.listen(PORT, () => console.log(`Server listening on ${ip.address()}:${PORT}`));
