import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import axios from "axios";
import { useAuth } from "../providers/AuthContext";

interface QRCodeData {
  fileUrl: string;
  qrCodeImage: string;
  qrName?: string;
  category?: string;
  frame?: string;
}

const frames = {
  holidays: [
    { id: "balloons", src: "/src/assets/Frames/download.png" },
    { id: "gift", src: "https://via.placeholder.com/100x100?text=Gift" },
    { id: "lol", src: "https://via.placeholder.com/100x100?text=LOL" },
  ],
  events: [
    { id: "clown", src: "https://via.placeholder.com/100x100?text=Clown" },
    { id: "baby-girl", src: "https://via.placeholder.com/100x100?text=Baby+Girl" },
    { id: "baby-boy", src: "https://via.placeholder.com/100x100?text=Baby+Boy" },
  ],
  thematic: [
    { id: "food", src: "https://via.placeholder.com/100x100?text=Food" },
    { id: "travel", src: "https://via.placeholder.com/100x100?text=Travel" },
    { id: "drinks", src: "https://via.placeholder.com/100x100?text=Drinks" },
  ],
};

const CustomizeQR = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const params = new URLSearchParams(location.search);
  const fileUrl = params.get("fileUrl");
  const qrName = params.get("qrName") || "";
  const category = params.get("category") || "";

  const [qrCode, setQrCode] = useState<QRCodeData | null>(null);
  const [error, setError] = useState("");
  const [hasSaved, setHasSaved] = useState(false);
  const [selectedFrame, setSelectedFrame] = useState<string | null>(null);
  const [editedQRImage, setEditedQRImage] = useState<string | null>(null);

  useEffect(() => {
    if (!fileUrl) {
      setError("No file URL provided.");
      return;
    }

    if (!qrCode) {
      QRCode.toDataURL(fileUrl)
        .then((qrCodeImage) => {
          const qrCodeData: QRCodeData = { fileUrl, qrCodeImage, qrName, category };
          setQrCode(qrCodeData);
          setEditedQRImage(qrCodeImage);
        })
        .catch((error) => {
          setError("Error generating QR code.");
          console.error("Error generating QR code:", error);
        });
    }
  }, [fileUrl, qrName, category, qrCode]);

  const applyFrameToQRCode = async (frameSrc: string) => {
    if (!qrCode) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const qrImage = new Image();
    const frameImage = new Image();

    canvas.width = 300;
    canvas.height = 300;

    qrImage.src = qrCode.qrCodeImage;
    await new Promise((resolve) => (qrImage.onload = resolve));

    frameImage.src = frameSrc;
    await new Promise((resolve) => (frameImage.onload = resolve));

    ctx.drawImage(qrImage, 0, 0, 300, 300);
    ctx.drawImage(frameImage, 0, 0, 300, 300);

    const editedImage = canvas.toDataURL("image/png");
    setEditedQRImage(editedImage);
    setQrCode({ ...qrCode, qrCodeImage: editedImage, frame: frameSrc });

    // Store the frame in localStorage
    localStorage.setItem("pendingFrame", frameSrc);
  };

  const handleFrameSelect = (frameSrc: string) => {
    setSelectedFrame(frameSrc);
    applyFrameToQRCode(frameSrc);
  };

  const saveQrCodeToDatabase = async (qrCodeData: QRCodeData, userId: string) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);
      if (!token) {
        setError("Please log in to save the QR code.");
        navigate("/sign-in", { state: { redirectTo: location.pathname + location.search } });
        return;
      }
      const response = await axios.post(
        "http://localhost:5000/api/qrcodes",
        {
          userId,
          qrCodes: [qrCodeData],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("QR code saved successfully:", response.data);
      setHasSaved(true);
    } catch (error) {
      console.error("Error saving QR code to database:", error);
      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
      }
      throw error;
    }
  };

  const handleSaveQRCode = () => {
    if (!qrCode) return;

    if (!user) {
      // If user is not logged in, navigate to login page
      localStorage.setItem("pendingImageUrl", qrCode.fileUrl);
      navigate("/sign-in", { state: { redirectTo: location.pathname + location.search } });
      return;
    }

    // If user is logged in, save the edited QR code (with frame) and navigate to dashboard
    if (!hasSaved) {
      setError("");
      saveQrCodeToDatabase(qrCode, user.id)
        .then(() => {
          // Clear pendingImageUrl and pendingFrame after saving
          localStorage.removeItem("pendingImageUrl");
          localStorage.removeItem("pendingFrame");
          navigate("/dashboard");
        })
        .catch((error) => {
          setHasSaved(false);
          setError("Error saving QR code. Please try again.");
          console.error("Save failed:", error);
        });
    }
  };

  const downloadQRCode = () => {
    if (editedQRImage) {
      const link = document.createElement("a");
      link.href = editedQRImage;
      link.download = `${qrCode?.qrName || "qrcode"}_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex p-8 bg-gray-50 min-h-screen">
      <div className="w-1/4 pr-4">
        <h2 className="text-xl font-semibold mb-4">Frames</h2>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Holidays</h3>
          <div className="grid grid-cols-3 gap-2">
            {frames.holidays.map((frame) => (
              <button
                key={frame.id}
                onClick={() => handleFrameSelect(frame.src)}
                className={`border-2 p-2 rounded-md ${
                  selectedFrame === frame.src ? "border-purple-600" : "border-gray-300"
                }`}
              >
                <img src={frame.src} alt={frame.id} className="w-full h-16 object-contain" />
              </button>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Events</h3>
          <div className="grid grid-cols-3 gap-2">
            {frames.events.map((frame) => (
              <button
                key={frame.id}
                onClick={() => handleFrameSelect(frame.src)}
                className={`border-2 p-2 rounded-md ${
                  selectedFrame === frame.src ? "border-purple-600" : "border-gray-300"
                }`}
              >
                <img src={frame.src} alt={frame.id} className="w-full h-16 object-contain" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-2">Thematic</h3>
          <div className="grid grid-cols-3 gap-2">
            {frames.thematic.map((frame) => (
              <button
                key={frame.id}
                onClick={() => handleFrameSelect(frame.src)}
                className={`border-2 p-2 rounded-md ${
                  selectedFrame === frame.src ? "border-purple-600" : "border-gray-300"
                }`}
              >
                <img src={frame.src} alt={frame.id} className="w-full h-16 object-contain" />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-3/4 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">Customize Your QR Code</h2>
          <div className="w-full h-1 bg-purple-300 mt-4">
            <div className="h-full bg-purple-600 w-1/3"></div>
          </div>

          {error ? (
            <p className="mt-6 text-red-500">{error}</p>
          ) : editedQRImage ? (
            <div className="mt-6 flex flex-col items-center">
              <img src={editedQRImage} alt="QR Code" className="w-48 h-48" />
              <a
                href={qrCode?.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md"
              >
                View Content
              </a>
              <div className="mt-4 flex space-x-4">
                <button
                  onClick={downloadQRCode}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md"
                >
                  Download QR Code
                </button>
                <button
                  onClick={handleSaveQRCode}
                  disabled={hasSaved}
                  className={`bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md ${
                    hasSaved ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {hasSaved ? "Saved" : "Save QR Code"}
                </button>
              </div>
              {qrCode?.qrName && <p className="mt-2">Name: {qrCode.qrName}</p>}
              {qrCode?.category && <p className="mt-2">Category: {qrCode.category}</p>}
            </div>
          ) : (
            <p className="mt-6 text-gray-500">Generating QR code...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizeQR;