import { BrowserRouter } from "react-router-dom";
import RoutesComponent from "./routes/route"; 

const App = () => {
  return (
    <BrowserRouter>
      <RoutesComponent />
    </BrowserRouter>
  );
};

export default App;
