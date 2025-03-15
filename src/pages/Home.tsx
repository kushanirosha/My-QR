import { useNavigate } from "react-router-dom";
import Step1 from "../assets/Steps/step-1.svg";
import Step2 from "../assets/Steps/step-2.svg";
import Step3 from "../assets/Steps/step-3.svg";
import CategorySection from "../components/CategorySection";
import Statistics from "../components/Statistics";
import FramesCarousel from "../components/FramesCarousel";
import Features from "../components/Features";
import METicket from "../components/METicket";
import MEQRReviews from "../components/MEQRReviews";
import QRCodesForCulture from "../components/QRCodesForCulture";


const Home = () => {

    const steps = [
        {
            id: 1,
            image: Step1,
            title: "Choose The Type",
            description: "Step 1",
        },
        {
            id: 2,
            image: Step2,
            title: "Generate QR Code",
            description: "Step 2",
        },
        {
            id: 3,
            image: Step3,
            title: "Customize & Download",
            description: "Step 3",
        },
    ];

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate("/enter-content");
    };

    return (
        <>
            {/* Hero Section  */}
            <section>
                <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-pink-100">
                    <div className="flex flex-col items-center text-center px-4">
                        <h1 className="text-3xl md:text-4xl font-semibold text-gray-800">
                            Create & Customize <br />
                            Your Dynamic QR code for <span className="text-purple-600 font-bold">FREE</span>
                        </h1>
                        <p className="text-gray-500 mt-2">
                            Easily generate, manage and statistically track your QR codes
                        </p>

                        <div
                            className="mt-6 flex items-center bg-white shadow-lg rounded-full px-4 py-2 w-full max-w-md cursor-pointer"
                            onClick={handleNavigate}
                        >
                            <span className="text-gray-400 text-lg">🔗</span>
                            <button className="flex-1 text-left px-3 text-gray-700 outline-none bg-transparent">
                                URL / LINK
                            </button>
                            <button className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700">
                                Generate
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Guideline Section  */}
            <section className="py-16 bg-white text-center">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-8">
                    Create QR Code in 3 Steps
                </h2>
                <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center max-w-xs"
                        >
                            <img src={step.image} alt={step.title} className="w-full h-auto" />
                            <span className="mt-3 px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm">
                                {step.description}
                            </span>
                            <h3 className="mt-3 text-lg font-medium text-gray-700">
                                {step.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </section>

            {/* Category Section */}
            <CategorySection />

            {/* Statistics Section */}
            <Statistics/>

            {/* Frames Carousel */}
            <FramesCarousel/>

            {/* Features */}
            <Features/>

            {/* METicket */}
            <METicket/>

            {/* MEQRReviews */}
            <MEQRReviews/>

            {/* QRCodesForCulture */}
            <QRCodesForCulture/>

        </>
    );
};

export default Home;
