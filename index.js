import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.PEXELS_API_KEY;

app.use(cors());

app.get("/api/pexels", async (req, res) => {
  const query = req.query.query;
  const perPageParsed = parseInt(req.query.photosPerPage, 10);
  const photosPerPage = Number.isFinite(perPageParsed)
    ? Math.min(80, Math.max(1, perPageParsed))
    : 15;

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        query
      )}&per_page=${photosPerPage}`,
      {
        headers: {
          Authorization: API_KEY,
        },
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
