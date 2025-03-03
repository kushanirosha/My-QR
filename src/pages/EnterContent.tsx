import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const EnterContent = () => {
  const [link, setLink] = useState("");
  const [qrName, setQrName] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();

  const handleCustomize = () => {
    if (!link) {
      alert("Please enter a valid URL");
      return;
    }
    navigate(`/customize?url=${encodeURIComponent(link)}`);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mt-16">
        <button className="mb-4 flex items-center gap-2 border px-4 py-2 rounded">
          <FaArrowLeft /> Back
        </button>
        <h2 className="text-xl font-semibold text-center">Enter Content</h2>
        <div className="w-full h-1 bg-purple-300 mt-4">
          <div className="h-full bg-purple-600 w-1/5"></div>
        </div>

        <div className="flex flex-wrap gap-2 mt-4 justify-center">
          {["URL / Link", "Play Market / App Store", "Text", "Map", "Wi-Fi", "Audio", "PDF", "WhatsApp"].map(
            (item, index) => (
              <button
                key={index}
                className={`px-4 py-2 rounded ${index === 0 ? "bg-purple-600 text-white" : "border"}`}
              >
                {item}
              </button>
            )
          )}
        </div>

        <div className="mt-6 bg-gray-100 p-6 rounded-md">
          <label className="block text-gray-700 text-sm mb-1">Put your link here</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="https://example.com"
            className="w-full p-2 border rounded"
          />

          <label className="block text-gray-700 text-sm mt-4 mb-1">Name your QR (optional)</label>
          <input
            type="text"
            value={qrName}
            onChange={(e) => setQrName(e.target.value)}
            placeholder="QR Code Name"
            className="w-full p-2 border rounded"
          />

          <label className="block text-gray-700 text-sm mt-4 mb-1">Content Category (optional)</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a category</option>
            <option value="business">Business</option>
            <option value="personal">Personal</option>
          </select>
        </div>

        <button
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md"
          onClick={handleCustomize}
        >
          Customize & Download QR
        </button>
      </div>
    </div>
  );
};

export default EnterContent;
