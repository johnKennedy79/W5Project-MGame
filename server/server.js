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

// get card data from data base
app.get("/cards", async function (req, res) {
  const result = await db.query(`SELECT * FROM cards`);
  const cardrow = result.rows;
  res.json(cardrow);
});

// get sorted data from leader board database
app.get("/leaderboard", async function (req, res) {
  const lbresults = await db.query(
    `SELECT * FROM LEADERBOARD ORDER BY timemin ASC, timesec ASC LIMIT 3`
  );
  const lbTopResults = lbresults.rows;
  res.json(lbTopResults);
});

// post new scores to leaderboard database
app.post("/leaderboard", (req, res) => {
  console.log(req.body);
  res.json("time saved");
  db.query(
    `INSERT INTO leaderboard (userName, timeMin, timeSec) VALUES ($1, $2, $3)`,
    [req.body.userName, req.body.timeMin, req.body.timeSec]
  );
});

app.listen("8080", () => {
  console.log("listening to port 8080");
});
