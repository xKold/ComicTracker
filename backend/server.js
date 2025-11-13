import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

const dataPath = path.join(process.cwd(), "data");
const comicsFile = path.join(dataPath, "comics.json");
const progressFile = path.join(dataPath, "userProgress.json");

// Helper functions
function readJSON(file) {
  return JSON.parse(fs.readFileSync(file, "utf8") || "[]");
}
function writeJSON(file, data) {
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

/** -----------------------------------
 *  GET /api/comics
 *  Returns full comic list
 * -----------------------------------*/
app.get("/api/comics", (req, res) => {
  const comics = readJSON(comicsFile);
  res.json(comics);
});

/** -----------------------------------
 *  POST /api/comics/add
 *  Add a new comic
 * -----------------------------------*/
app.post("/api/comics/add", (req, res) => {
  const comics = readJSON(comicsFile);
  const newComic = { id: Date.now().toString(), ...req.body };

  comics.push(newComic);
  writeJSON(comicsFile, comics);

  res.json({ success: true, comic: newComic });
});

/** -----------------------------------
 *  GET /api/user-progress
 *  Get user’s comic progress
 * -----------------------------------*/
app.get("/api/user-progress", (req, res) => {
  const user = req.query.user;
  const progress = readJSON(progressFile);

  const userData = progress.filter((p) => p.user_id === user);
  res.json(userData);
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
