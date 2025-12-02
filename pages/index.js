import { useState } from "react";
import axios from "axios";
import ImageCard from "../components/ImageCard";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateImages = async () => {
    if (!prompt) return;
    setLoading(true);
    try {
      const res = await axios.post("/api/generate", { prompt });
      setImages(res.data.images);
    } catch (err) {
      alert("Error generating images");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">AI Image Generator</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter prompt..."
        className="p-2 rounded text-black w-full max-w-md mb-4"
      />
      <button
        onClick={generateImages}
        className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500 mb-6"
      >
        {loading ? "Generating..." : "Generate Images"}
      </button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-5xl">
        {images.map((img, idx) => (
          <ImageCard key={idx} src={img} />
        ))}
      </div>
    </div>
  );
}
