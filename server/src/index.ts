import cors from "cors";
import express, { Request, Response } from "express";

const PORT = process.env.PORT ?? 5001;

const app = express();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  console.info("Request:", req.path);
  res.send("Hello from server!");
});

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}\n`);
  console.info(`http://localhost:${PORT}\n`);
});
