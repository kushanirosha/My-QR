import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import QRCode from "qrcode";

const Customize = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const fileUrl = params.get("fileUrl"); // Get the file URL (either image or URL) from query params

  const [qrCode, setQrCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (fileUrl) {
      // Generate QR code for the provided URL (whether it's an image or a URL)
      QRCode.toDataURL(fileUrl)
        .then((qrCodeUrl) => {
          setQrCode(qrCodeUrl); // Set the generated QR code
        })
        .catch((error) => {
          setError("Error generating QR code.");
          console.error("Error generating QR code:", error);
        });
    } else {
      setError("No file URL provided.");
    }
  }, [fileUrl]);

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mt-16 text-center">
        <h2 className="text-xl font-semibold">Customize Your QR Code</h2>
        <div className="w-full h-1 bg-purple-300 mt-4">
          <div className="h-full bg-purple-600 w-1/3"></div>
        </div>

        {error ? (
          <p className="mt-6 text-red-500">{error}</p>
        ) : qrCode ? (
          <div className="mt-6 flex flex-col items-center">
            <img src={qrCode} alt="QR Code" className="w-48 h-48" />
            <a
              href={fileUrl}  // Direct link to the image or URL
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-md"
            >
              View Content
            </a>
            <p className="mt-4">Scan the QR code to view the content.</p>
          </div>
        ) : (
          <p className="mt-6 text-gray-500">Generating QR code...</p>
        )}
      </div>
    </div>
  );
};

export default Customize;
