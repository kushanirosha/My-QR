import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import axios from "axios";

interface QRCodeData {
  _id: string;
  userId: string;
  fileUrl: string;
  qrCodeImage: string;
  qrName?: string;
  category?: string;
  createdAt: Date;
}

const Dashboard = () => {
  const [qrCodes, setQRCodes] = useState<QRCodeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const fetchQRCodes = async () => {
    if (!user || !user.id) {
      setError("Please log in to view your QR codes.");
      navigate("/sign-in");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No authentication token found. Please log in.");
        navigate("/sign-in");
        return;
      }

      const response = await axios.get<{ qrCodes: QRCodeData[] }>(
        "http://localhost:5000/api/qrcodes",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Fetched QR codes:", response.data.qrCodes);
      setQRCodes(response.data.qrCodes);
    } catch (err) {
      console.error("Error fetching QR codes:", err);
      setError("Failed to fetch QR codes. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQRCodes();
  }, [user, navigate]);

  const handleDeleteQRCode = async (qrCodeId: string) => {
    if (!user || !user.id) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/qrcodes/${qrCodeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setQRCodes(qrCodes.filter((qr) => qr._id !== qrCodeId));
    } catch (err) {
      console.error("Error deleting QR code:", err);
      setError("Failed to delete QR code. Please try again.");
    }
  };

  const downloadQRCode = (qrCodeImage: string, qrName: string) => {
    const link = document.createElement("a");
    link.href = qrCodeImage;
    link.download = `${qrName || "qrcode"}_${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mt-16">
        <h2 className="text-xl font-semibold text-center">Your QR Codes</h2>
        <div className="w-full h-1 bg-purple-300 mt-4">
          <div className="h-full bg-purple-600 w-1/3"></div>
        </div>

        {qrCodes.length === 0 ? (
          <p className="mt-6 text-gray-500">No QR codes found.</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {qrCodes.map((qr) => (
              <div
                key={qr._id}
                className="border rounded-lg p-4 shadow-md flex flex-col items-center"
              >
                <img
                  src={qr.qrCodeImage}
                  alt={`QR Code ${qr.qrName || qr._id}`}
                  className="w-32 h-32 object-cover mb-2"
                />
                <p className="text-sm">Name: {qr.qrName || "Unnamed"}</p>
                <p className="text-sm">Category: {qr.category || "None"}</p>
                <p className="text-sm">
                  Created: {new Date(qr.createdAt).toLocaleDateString()}
                </p>
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => downloadQRCode(qr.qrCodeImage, qr.qrName || "")}
                    className="bg-green-600 text-white px-3 py-1 rounded-md hover:bg-green-700"
                  >
                    Download
                  </button>
                  <button
                    onClick={() => handleDeleteQRCode(qr._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => navigate("/enter-content")}
          className="mt-6 bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md"
        >
          Create New QR
        </button>
      </div>
    </div>
  );
};

export default Dashboard;