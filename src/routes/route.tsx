import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../layout/Navbar";
import EnterContent from "../pages/EnterContent";
import Customize from "../pages/CustomizeQR";
import SignInPage from "../pages/SignInPage";
import CreateAccountPage from "../pages/CreateAccountPage";
import UploadPage from "../pages/Upload";
import Dashboard from "../pages/Dashboard";
import Footer from "../layout/Footer";

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
                    <Route path="/upload-page" element={<UploadPage/>}/>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </div>
           <Footer/>
        </>
    );
};

export default RoutesComponent;
