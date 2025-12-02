import OpenAI from "openai";

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const result = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024",
    });

    return new Response(
      JSON.stringify({ image: result.data[0].url }),
      { status: 200 }
    );

  } catch (err) {
    console.error("API ERROR:", err);
    return new Response(JSON.stringify({ error: "Failed to generate image" }), {
      status: 500,
    });
  }
}
