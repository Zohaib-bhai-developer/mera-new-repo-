export default function ImageCard({ src }) {
  return (
    <div className="border border-gray-700 rounded overflow-hidden">
      <img src={src} alt="AI Generated" className="w-full h-auto" />
    </div>
  );
}
