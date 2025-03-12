import { useState, FormEvent } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../providers/AuthContext"; // Adjust the import path as needed

const CreateAccountPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { setUser, logout } = useAuth();

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
      if (!userData || !userData.id) {
        throw new Error("Invalid user data in response");
      }
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userData.id);
      setUser({ id: userData.id, name: userData.name, email: userData.email });

      const pendingImageUrl = localStorage.getItem("pendingImageUrl") || (location.state?.pendingImageUrl);
      if (pendingImageUrl) {
        localStorage.removeItem("pendingImageUrl");
        navigate(`/customize?fileUrl=${encodeURIComponent(pendingImageUrl)}`);
      } else {
        navigate("/");
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
            onClick={() => navigate("/sign-in")}
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