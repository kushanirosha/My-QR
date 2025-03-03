import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "qrcode";

const Customize = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const url = params.get("url");

  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    if (url) {
      QRCode.toDataURL(url)
        .then((dataUrl) => setQrCode(dataUrl))
        .catch((err) => console.error(err));
    }
  }, [url]);

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mt-16 text-center">
        <h2 className="text-xl font-semibold">Customize Your QR Code</h2>
        <div className="w-full h-1 bg-purple-300 mt-4">
          <div className="h-full bg-purple-600 w-1/3"></div>
        </div>

        {qrCode ? (
          <div className="mt-6 flex flex-col items-center">
            <img src={qrCode} alt="QR Code" className="w-48 h-48" />
            <a
              href={qrCode}
              download="qr-code.png"
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md"
            >
              Download QR Code
            </a>
          </div>
        ) : (
          <p className="mt-6 text-red-500">Invalid URL, please try again.</p>
        )}
      </div>
    </div>
  );
};

export default Customize;
