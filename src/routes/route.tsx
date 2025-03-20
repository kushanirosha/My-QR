import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../layout/Navbar";
import EnterContent from "../pages/EnterContent";
import Customize from "../pages/CustomizeQR";
import SignInPage from "../pages/SignInPage";
import CreateAccountPage from "../pages/CreateAccountPage";
import UploadPage from "../pages/CategoryPages/UploadImage";
import Dashboard from "../pages/Dashboard";
import Footer from "../layout/Footer";
import UPSignInPage from "../pages/UPsignin";
import UPCreateAccountPage from "../pages/UPcreateaccount";
import UploadPdf from "../pages/CategoryPages/UploadPdf";

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
                    <Route path="/up-sign-in" element={<UPSignInPage/>} />
                    <Route path="up-create-account" element={<UPCreateAccountPage/>}/>
                    <Route path="/upload-pdf" element={<UploadPdf />} />
                </Routes>
            </div>
           <Footer/>
        </>
    );
};

export default RoutesComponent;
