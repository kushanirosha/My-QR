import { useState, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../providers/AuthContext";
import QRCode from "qrcode";

interface QRCodeData {
  fileUrl: string;
  qrCodeImage: string;
  qrName?: string;
  category?: string;
  frame?: string;
}

const CreateAccountPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  const applyFrameToQRCode = async (qrCodeImage: string, frameSrc: string) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context not available");

    const qrImage = new Image();
    const frameImage = new Image();

    canvas.width = 300;
    canvas.height = 300;

    qrImage.src = qrCodeImage;
    await new Promise((resolve) => (qrImage.onload = resolve));

    frameImage.src = frameSrc;
    await new Promise((resolve) => (frameImage.onload = resolve));

    ctx.drawImage(qrImage, 0, 0, 300, 300);
    ctx.drawImage(frameImage, 0, 0, 300, 300);

    return canvas.toDataURL("image/png");
  };

  const saveQrCodeToDatabase = async (qrCodeData: QRCodeData, userId: string, token: string) => {
    try {
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
      console.log("QR code saved successfully from CreateAccountPage:", response.data);
    } catch (error) {
      console.error("Error saving QR code to database from CreateAccountPage:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    setError("");

    const newUser = { username, email, password };

    try {
      const response = await axios.post<{ token: string; user: { id: string; name: string; email: string } }>(
        "http://localhost:5000/api/users/create",
        newUser,
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, user: userData } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userData.id);
      setUser({ id: userData.id, name: userData.name, email: userData.email });

      const pendingImageUrl = localStorage.getItem("pendingImageUrl");
      const pendingFrame = localStorage.getItem("pendingFrame");

      console.log("CreateAccount - Pending image URL:", pendingImageUrl);
      console.log("CreateAccount - Pending frame:", pendingFrame);
      console.log("CreateAccount - Location state:", location.state);

      if (pendingImageUrl) {
        // Extract qrName and category from the redirectTo state if available
        const params = new URLSearchParams(location.state?.redirectTo?.split("?")[1] || "");
        const qrName = params.get("qrName") || "";
        const category = params.get("category") || "";

        // Generate QR code
        let qrCodeImage = await QRCode.toDataURL(pendingImageUrl);

        // Apply frame if it exists
        if (pendingFrame) {
          qrCodeImage = await applyFrameToQRCode(qrCodeImage, pendingFrame);
        }

        const qrCodeData: QRCodeData = {
          fileUrl: pendingImageUrl,
          qrCodeImage,
          qrName,
          category,
          frame: pendingFrame || undefined,
        };

        // Save QR code to database
        await saveQrCodeToDatabase(qrCodeData, userData.id, token);

        // Clear pendingImageUrl and pendingFrame
        localStorage.removeItem("pendingImageUrl");
        localStorage.removeItem("pendingFrame");
        navigate("/dashboard");
      } else {
        navigate("/"); // Navigate to home if no pending URL
      }
    } catch (error) {
      console.error("Error creating account:", error);
      if (error.response) {
        setError(error.response.data.message || "An error occurred while creating the account");
      } else {
        setError("Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md"
              placeholder="Enter your username"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full p-2 border rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white p-2 rounded-md hover:bg-purple-700 disabled:bg-purple-400"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/sign-in", { state: location.state })}
            className="text-purple-600 hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default CreateAccountPage;