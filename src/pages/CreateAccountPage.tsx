import { useState, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../providers/AuthContext";

const UPCreateAccountPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser } = useAuth();

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

      console.log("CreateAccount - Pending image URL:", pendingImageUrl);
      console.log("CreateAccount - Location state:", location.state);

      if (pendingImageUrl) {
        // Upload the image to the server
        let imageId: string;
        if (pendingImageUrl.startsWith("blob:")) {
          // Fetch the blob and convert it to a File
          const response = await fetch(pendingImageUrl);
          const blob = await response.blob();
          const file = new File([blob], "uploaded-image.jpg", { type: blob.type });

          // Upload the image to the server
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
          // If the URL is not a blob (unlikely in this flow), extract the imageId
          const urlParams = new URLSearchParams(location.state?.redirectTo?.split("?")[1] || "");
          imageId = urlParams.get("imageId") || "pending";
        }

        // Clear pendingImageUrl
        localStorage.removeItem("pendingImageUrl");

        // Redirect to customize page with imageId
        navigate(`/customize?imageId=${imageId}`);
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

export default UPCreateAccountPage;