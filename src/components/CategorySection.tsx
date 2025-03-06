import { useNavigate } from "react-router-dom";
import UrlIcon from "../assets/Cetagory/url.svg";
import PdfIcon from "../assets/Cetagory/pdf.svg";
import ImageIcon from "../assets/Cetagory/img.svg";
import AppIcon from "../assets/Cetagory/app.svg";
import TextIcon from "../assets/Cetagory/text.svg";
import MapsIcon from "../assets/Cetagory/map.svg";
import WifiIcon from "../assets/Cetagory/wifi.svg";
import AudioIcon from "../assets/Cetagory/audio.svg";
import WhatsAppIcon from "../assets/Cetagory/whtapp.svg";
import YouTubeIcon from "../assets/Cetagory/yt.svg";
import InstagramIcon from "../assets/Cetagory/inst.svg";
import FacebookIcon from "../assets/Cetagory/fb.svg";
import TelegramIcon from "../assets/Cetagory/teli.svg";
import EmailIcon from "../assets/Cetagory/mail.svg";
import PptxIcon from "../assets/Cetagory/ppt.svg";
import PhoneIcon from "../assets/Cetagory/call.svg";
import TikTokIcon from "../assets/Cetagory/tik.svg";
import FormsIcon from "../assets/Cetagory/form.svg";
import TwitterIcon from "../assets/Cetagory/x.svg";

const CategorySection = () => {
    const navigate = useNavigate();

    const categories = [
        { id: 1, name: "URL", icon: UrlIcon },
        { id: 2, name: "PDF", icon: PdfIcon },
        { id: 3, name: "Image", icon: ImageIcon },
        { id: 4, name: "App Markets", icon: AppIcon },
        { id: 5, name: "Text", icon: TextIcon },
        { id: 6, name: "Maps", icon: MapsIcon },
        { id: 7, name: "Wi-Fi", icon: WifiIcon },
        { id: 8, name: "Audio", icon: AudioIcon },
        { id: 9, name: "WhatsApp", icon: WhatsAppIcon },
        { id: 10, name: "YouTube", icon: YouTubeIcon },
        { id: 11, name: "Instagram", icon: InstagramIcon },
        { id: 12, name: "Facebook", icon: FacebookIcon },
        { id: 13, name: "Telegram", icon: TelegramIcon },
        { id: 15, name: "E-mail", icon: EmailIcon },
        { id: 17, name: "PPTX", icon: PptxIcon },
        { id: 18, name: "Phone Call", icon: PhoneIcon },
        { id: 20, name: "TikTok", icon: TikTokIcon },
        { id: 22, name: "Forms", icon: FormsIcon },
        { id: 24, name: "X (Twitter)", icon: TwitterIcon },
    ];

    const handleCategoryClick = (id: number) => {
        if (id === 3) {
            navigate("/upload-page");
        }
    };

    return (
        <section className="py-16 bg-gray-50 text-center">
            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
                Create QR for <span className="text-purple-600 font-bold">Specified Types</span>
            </h2>
            <p className="text-gray-500 mt-2">
                Generate QR Codes for 40+ specific content types with ease
            </p>

            {/* Grid */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 px-4 md:px-12">
                {categories.map((category) => (
                    <div
                        key={category.id}
                        className="flex flex-col items-center bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition cursor-pointer"
                        onClick={() => handleCategoryClick(category.id)}
                    >
                        <img src={category.icon} alt={category.name} className="w-10 h-10" />
                        <p className="mt-2 text-gray-700 font-medium text-sm">{category.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default CategorySection;
