import { useState, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../providers/AuthContext";

const UPSignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post<{ token: string; user: { id: string; name: string; email: string } }>(
        "http://localhost:5000/api/users/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, user: userData } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userData.id);
      setUser({ id: userData.id, name: userData.name, email: userData.email });

      const pendingImageUrl = localStorage.getItem("pendingImageUrl");
      const pendingPdfFilename = localStorage.getItem("pendingPdfFilename");
      const { state } = location;

      console.log("SignIn - Pending image URL:", pendingImageUrl);
      console.log("SignIn - Pending PDF filename:", pendingPdfFilename);
      console.log("SignIn - Location state:", state);

      // Handle pending image upload
      if (pendingImageUrl) {
        let imageId: string;
        if (pendingImageUrl.startsWith("blob:")) {
          const response = await fetch(pendingImageUrl);
          const blob = await response.blob();
          const file = new File([blob], "uploaded-image.jpg", { type: blob.type });

          const formData = new FormData();
          formData.append("image", file);

          try {
            const uploadResponse = await axios.post("http://localhost:5000/api/images/upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            });

            imageId = uploadResponse.data.imageId;
          } catch (uploadError) {
            console.error("Image upload failed:", uploadError);
            if (uploadError.response) {
              setError(`Image upload failed: ${uploadError.response.data.message || "Unknown error"}`);
            } else {
              setError("Image upload failed: Network error. Please try again later.");
            }
            setLoading(false);
            return;
          }
        } else {
          const urlParams = new URLSearchParams(state?.redirectTo?.split("?")[1] || "");
          imageId = urlParams.get("imageId") || "pending";
        }

        localStorage.removeItem("pendingImageUrl");
        navigate(`/customize?imageId=${imageId}`);
      }
      // Handle pending PDF upload
      else if (pendingPdfFilename) {
        let pdfId: string;
        const pendingPdfUrl = localStorage.getItem("pendingPdfUrl"); // You might need to store the blob URL if you want to preview PDFs
        if (pendingPdfUrl && pendingPdfUrl.startsWith("blob:")) {
          const response = await fetch(pendingPdfUrl);
          const blob = await response.blob();
          const file = new File([blob], pendingPdfFilename, { type: "application/pdf" });

          const formData = new FormData();
          formData.append("pdf", file);

          try {
            const uploadResponse = await axios.post("http://localhost:5000/api/pdfs/upload", formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            });

            pdfId = uploadResponse.data.pdfId;
          } catch (uploadError) {
            console.error("PDF upload failed:", uploadError);
            if (uploadError.response) {
              setError(`PDF upload failed: ${uploadError.response.data.message || "Unknown error"}`);
            } else {
              setError("PDF upload failed: Network error. Please try again later.");
            }
            setLoading(false);
            return;
          }
        } else {
          const urlParams = new URLSearchParams(state?.redirectTo?.split("?")[1] || "");
          pdfId = urlParams.get("pdfId") || "pending";
        }

        localStorage.removeItem("pendingPdfFilename");
        localStorage.removeItem("pendingPdfUrl");
        navigate(`/customize?pdfId=${pdfId}`);
      }
      else if (state && state.redirectTo) {
        navigate(state.redirectTo);
      } else {
        navigate("/"); // Navigate to home if no pending URL
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response) {
        setError(error.response.data.message || "An error occurred during login");
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
        <h2 className="text-2xl font-bold text-center mb-6">Sign In</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
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
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/create-account", { state: location.state })}
            className="text-purple-600 hover:underline"
          >
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default UPSignInPage;