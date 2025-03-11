import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./routes/route";
import { AuthProvider } from "./providers/AuthContext";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoutesComponent />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
