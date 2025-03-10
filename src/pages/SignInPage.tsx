import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignInPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // ✅ Fix: Make error state updatable

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // ✅ Fix: Prevent form reload

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password,
      });

      const { token, userId } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);

      // Check if there was a pending file upload
      const pendingFile = localStorage.getItem("pendingFile");
      if (pendingFile) {
        localStorage.removeItem("pendingFile");
        navigate("/upload-page");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password"); // ✅ Fix: Show error message
    }
  };

  const handleCreateAccount = () => {
    navigate('/create-account');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>

        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4"> {/* ✅ Fix: Prevent reload */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Don't have an account?{' '}
          <button onClick={handleCreateAccount} className="text-purple-600 hover:underline">
            Create Account
          </button>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
