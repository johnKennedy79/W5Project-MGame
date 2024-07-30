import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";
const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
const db = new pg.Pool({ connectionString: process.env.DBCONECTIONCARDS });
app.get("/", (req, res) => {
  res.send("server root route");
});

app.get("/leaderboard", async function (req, res) {
  const lbresults = await db.query(`SELECT `);
});

app.listen("8080", () => {
  console.log("listening to port 8080");
});
