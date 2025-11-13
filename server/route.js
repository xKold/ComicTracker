import { Router } from "express";
import { db } from "./db.js";
import axios from "axios";

const router = Router();

// Get all tracked manhwa
router.get("/manhwa", async (req, res) => {
  const rows = await db.all("SELECT * FROM manhwa");
  res.json(rows);
});

// Add a new manhwa
router.post("/manhwa", async (req, res) => {
  const { title, sourceUrl } = req.body;

  await db.run(
    "INSERT INTO manhwa (title, sourceUrl, latestChapter, updatedAt) VALUES (?, ?, ?, ?)",
    [title, sourceUrl, 0, new Date().toISOString()]
  );

  res.json({ success: true });
});

// Tracker: Check updates using ComicK API
router.get("/update/:id", async (req, res) => {
  const id = req.params.id;

  const result = await axios.get(`https://api.comick.cc/comic/${id}/chapters`);
  const chapters = result.data;

  res.json({
    latestChapter: chapters[0].chapter,
    updatedAt: chapters[0].updated_at
  });
});

export default router;
