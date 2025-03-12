import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../providers/AuthContext"; 

const UploadImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleCustomize = () => {
    if (!imageUrl) {
      alert("Please upload an image first");
      return;
    }
    if (!user) {
      // Store the image URL in localStorage to retrieve after login or account creation
      localStorage.setItem("pendingImageUrl", imageUrl);
      navigate("/sign-in", { state: { redirectTo: `/customize?fileUrl=${encodeURIComponent(imageUrl)}` } });
      return;
    }
    navigate(`/customize?fileUrl=${encodeURIComponent(imageUrl)}`);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mt-16">
        <button
          className="mb-4 flex items-center gap-2 border px-4 py-2 rounded"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Back
        </button>
        <h2 className="text-xl font-semibold text-center">Upload Image</h2>

        <div className="mt-6 bg-gray-100 p-6 rounded-md">
          <label className="block text-gray-700 text-sm mb-1">Upload your image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded"
          />
          {imageUrl && (
            <div className="mt-4">
              <img src={imageUrl} alt="Uploaded" className="w-32 h-32 object-cover" />
            </div>
          )}
        </div>

        <button
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md"
          onClick={handleCustomize}
        >
          Generate QR
        </button>
      </div>
    </div>
  );
};

export default UploadImage;