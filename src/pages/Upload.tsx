import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";

const UploadPage = () => {
  const [qrName, setQrName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/sign-in", { state: { qrName, file } });
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const fileUrl = response.data.fileUrl;
      navigate(`/customize?qrName=${encodeURIComponent(qrName)}&fileUrl=${encodeURIComponent(fileUrl)}`);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("File upload failed");
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mt-16">
        <button onClick={() => navigate(-1)} className="mb-4 flex items-center gap-2 border px-4 py-2 rounded">
          <FaArrowLeft /> Back
        </button>
        <h2 className="text-xl font-semibold text-center">Upload File</h2>

        <div className="mt-6 bg-gray-100 p-6 rounded-md">
          <label className="block text-gray-700 text-sm mb-1">Name your QR (optional)</label>
          <input type="text" value={qrName} onChange={(e) => setQrName(e.target.value)} className="w-full p-2 border rounded" />

          <label className="block text-gray-700 text-sm mt-4 mb-1">Upload File/Image</label>
          <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} className="w-full p-2 border rounded" />
        </div>

        <button onClick={handleUpload} className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md">
          Upload & Generate QR
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
