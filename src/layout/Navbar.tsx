import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSignInClick = () => {
    navigate("/sign-in");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  const handleDashboardClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md px-6 py-4 flex justify-between items-center z-50">
      <div className="text-2xl font-bold">
        <span className="italic">MY</span> <span className="text-purple-600">QR</span>
      </div>
      <div className="hidden md:flex space-x-6 text-gray-700">
        <a href="/" className="hover:text-purple-600">Create QR</a>
        <a href="#" className="hover:text-purple-600">Frames</a>
        <a href="#" className="hover:text-purple-600">Ticket QR</a>
        <a href="#" className="hover:text-purple-600">Support</a>
      </div>
      {user ? (
        <div className="flex items-center space-x-4">
          <span
            onClick={handleDashboardClick}
            className="text-gray-700 cursor-pointer hover:text-purple-600"
          >
            👤 {user.name} (Dashboard)
          </span>
          <button
            className="bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700"
            onClick={handleLogoutClick}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="bg-purple-600 text-white px-5 py-2 rounded-md hover:bg-purple-700"
          onClick={handleSignInClick}
        >
          Sign in
        </button>
      )}
    </nav>
  );
};

export default Navbar;