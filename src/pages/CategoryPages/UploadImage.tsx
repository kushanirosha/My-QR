import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../../providers/AuthContext";
import axios from "axios";

const UploadImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imageId, setImageId] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);

      // Create a temporary URL for preview
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      // If user is logged in, upload the image to the server
      if (user) {
        const formData = new FormData();
        formData.append("image", file);

        try {
          const response = await axios.post("http://localhost:5000/api/images/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          const { imageId } = response.data;
          setImageId(imageId);
        } catch (error) {
          console.error("Error uploading image:", error);
          if (error.response) {
            setError(`Failed to upload image: ${error.response.data.message || "Unknown error"}`);
          } else {
            setError("Failed to upload image: Network error. Please try again later.");
          }
        }
      }
    }
  };

  const handleCustomize = () => {
    if (!previewUrl) {
      alert("Please upload an image first");
      return;
    }

    // Construct the image URL using the imageId (if available) or the temporary previewUrl
    const imageUrl = imageId ? `http://localhost:5000/api/images/image/${imageId}` : previewUrl;

    if (!user) {
      // Store the temporary previewUrl in localStorage to upload after login
      localStorage.setItem("pendingImageUrl", previewUrl);
      navigate("/up-sign-in", { state: { redirectTo: `/customize?imageId=${imageId || "pending"}` } });
      return;
    }

    if (!imageId) {
      alert("Image upload not completed. Please try again.");
      return;
    }

    navigate(`/customize?imageId=${imageId}`);
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

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        <div className="mt-6 bg-gray-100 p-6 rounded-md">
          <label className="block text-gray-700 text-sm mb-1">Upload your image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded"
          />
          {previewUrl && (
            <div className="mt-4">
              <img src={previewUrl} alt="Uploaded" className="w-32 h-32 object-cover" />
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