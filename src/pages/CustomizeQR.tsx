import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import axios from "axios";
import { useAuth } from "../providers/AuthContext"; // Adjust the import path

interface QRCodeData {
  fileUrl: string;
  qrCodeImage: string;
  qrName?: string;
  category?: string;
}

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
  const [isSaving, setIsSaving] = useState(false); // Add a saving state to prevent multiple saves

  useEffect(() => {
    if (!fileUrl) {
      setError("No file URL provided.");
      return;
    }

    // Log to debug useEffect triggers
    console.log("useEffect triggered with fileUrl:", fileUrl, "user:", user, "qrName:", qrName, "category:", category);

    // Only generate QR code if not already generated
    if (!qrCode) {
      QRCode.toDataURL(fileUrl)
        .then((qrCodeImage) => {
          const qrCodeData: QRCodeData = { fileUrl, qrCodeImage, qrName, category };
          setQrCode(qrCodeData);
          if (user && user.id && !isSaving) {
            setIsSaving(true); // Set saving flag
            saveQrCodeToDatabase(qrCodeData, user.id)
              .then(() => setIsSaving(false)) // Reset saving flag on success
              .catch(() => setIsSaving(false)); // Reset on error
          }
        })
        .catch((error) => {
          setError("Error generating QR code.");
          console.error("Error generating QR code:", error);
        });
    }
  }, [fileUrl, user, qrName, category, qrCode, isSaving]); // Include isSaving to prevent re-triggering

  const saveQrCodeToDatabase = async (qrCodeData: QRCodeData, userId: string) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token being sent:", token);
      if (!token) {
        setError("Please log in to save the QR code.");
        navigate("/sign-in");
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
    } catch (error) {
      console.error("Error saving QR code to database:", error);
      if (error.response) {
        console.log("Error response data:", error.response.data);
        console.log("Error response status:", error.response.status);
      }
      setError("Error saving QR code. Please try again.");
      throw error; // Re-throw to handle in the calling function
    }
  };

  const downloadQRCode = () => {
    if (qrCode) {
      const link = document.createElement("a");
      link.href = qrCode.qrCodeImage;
      link.download = `${qrCode.qrName || "qrcode"}_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mt-16 text-center">
        <h2 className="text-xl font-semibold">Customize Your QR Code</h2>
        <div className="w-full h-1 bg-purple-300 mt-4">
          <div className="h-full bg-purple-600 w-1/3"></div>
        </div>

        {error ? (
          <p className="mt-6 text-red-500">{error}</p>
        ) : qrCode ? (
          <div className="mt-6 flex flex-col items-center">
            <img src={qrCode.qrCodeImage} alt="QR Code" className="w-48 h-48" />
            <a
              href={qrCode.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md"
            >
              View Content
            </a>
            <button
              onClick={downloadQRCode}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md"
            >
              Download QR
            </button>
            {!user && (
              <p className="mt-4 text-gray-500">
                <button
                  onClick={() => navigate("/sign-in")}
                  className="text-purple-600 hover:underline"
                >
                  Log in
                </button>{" "}
                to save your QR code.
              </p>
            )}
            {qrCode.qrName && <p className="mt-2">Name: {qrCode.qrName}</p>}
            {qrCode.category && <p className="mt-2">Category: {qrCode.category}</p>}
          </div>
        ) : (
          <p className="mt-6 text-gray-500">Generating QR code...</p>
        )}
      </div>
    </div>
  );
};

export default CustomizeQR;