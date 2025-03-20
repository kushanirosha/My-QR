import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useAuth } from "../../providers/AuthContext";
import axios from "axios";

const UploadPdf = () => {
  const [pdf, setPdf] = useState<File | null>(null);
  const [pdfId, setPdfId] = useState<string | null>(null);
  const [filename, setFilename] = useState<string | null>(null); // To display the PDF filename
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate that the file is a PDF
      if (file.type !== "application/pdf") {
        setError("Please upload a PDF file.");
        return;
      }

      setPdf(file);
      setFilename(file.name); // Store the filename for display

      // If user is logged in, upload the PDF to the server
      if (user) {
        const formData = new FormData();
        formData.append("pdf", file); // Match the field name expected by multer

        try {
          const response = await axios.post("http://localhost:5000/api/pdfs/upload", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          const { pdfId } = response.data;
          setPdfId(pdfId);
        } catch (error) {
          console.error("Error uploading PDF:", error);
          if (error.response) {
            setError(`Failed to upload PDF: ${error.response.data.message || "Unknown error"}`);
          } else {
            setError("Failed to upload PDF: Network error. Please try again later.");
          }
        }
      }
    }
  };

  const handleCustomize = () => {
    if (!filename) {
      alert("Please upload a PDF first");
      return;
    }

    // Construct the PDF URL using the pdfId (if available) or a placeholder
    const pdfUrl = pdfId ? `http://localhost:5000/api/pdfs/pdf/${pdfId}` : "pending";

    if (!user) {
      // Store the PDF filename in localStorage to upload after login
      localStorage.setItem("pendingPdfFilename", filename || "");
      navigate("/up-sign-in", { state: { redirectTo: `/customize?pdfId=${pdfId || "pending"}` } });
      return;
    }

    if (!pdfId) {
      alert("PDF upload not completed. Please try again.");
      return;
    }

    navigate(`/customize?pdfId=${pdfId}`);
  };

  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-md mt-16">
        <button
          className="mb-4 flex items-center gap-2 border px-4 py-2 rounded"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Back
        </button>
        <h2 className="text-xl font-semibold text-center">Upload PDF</h2>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        <div className="mt-6 bg-gray-100 p-6 rounded-md">
          <label className="block text-gray-700 text-sm mb-1">Upload your PDF</label>
          <input
            type="file"
            accept="application/pdf" // Restrict to PDF files
            onChange={handlePdfUpload}
            className="w-full p-2 border rounded"
          />
          {filename && (
            <div className="mt-4">
              <p className="text-gray-700">Selected PDF: {filename}</p>
            </div>
          )}
        </div>

        <button
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-md"
          onClick={handleCustomize}
        >
          Generate QR
        </button>
      </div>
    </div>
  );
};

export default UploadPdf;