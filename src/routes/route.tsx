import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../layout/Navbar";
import EnterContent from "../pages/EnterContent";
import Customize from "../pages/CustomizeQR";
import SignInPage from "../pages/SignInPage";
import CreateAccountPage from "../pages/CreateAccountPage";

const RoutesComponent = () => {
    return (
        <>
            <Navbar />
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/enter-content" element={<EnterContent />} />
                    <Route path="/customize" element={<Customize/>}/>
                    <Route path="/sign-in" element={<SignInPage />} />
                    <Route path="/create-account" element={<CreateAccountPage />} />
                </Routes>
            </div>
        </>
    );
};

export default RoutesComponent;
