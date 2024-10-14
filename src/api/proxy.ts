import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query;

  try {
    const response = await axios.get(url as string, {
      responseType: "arraybuffer",
    });
    res.setHeader("Content-Type", "image/png");
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch image" });
  }
}
