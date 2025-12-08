import Replicate from "replicate";

export default async function handler(req, res) {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_KEY,
    });

    const output = await replicate.run(
      "black-forest-labs/flux-schnell",
      {
        input: { prompt }
      }
    );

    res.status(200).json({ image: output });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
