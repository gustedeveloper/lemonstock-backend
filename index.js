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

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&per_page=12`,
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
