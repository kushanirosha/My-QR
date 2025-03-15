// QRCodesForCulture.tsx
import React from "react";

const QRCodesForCulture: React.FC = () => {
  return (
    <div
      className="bg-gradient-to-b from-red-900 via-red-800 to-gray-900 py-16 relative overflow-hidden"
      style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgba(255, 255, 255, 0.1)' stroke-width='1'%3E%3Ccircle cx='16' cy='16' r='14'/%3E%3C/svg%3E')",
        backgroundSize: "64px 64px",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Get Started Link */}
        <a
          href="#"
          className="text-red-400 text-sm font-medium mb-4 inline-block hover:text-red-300 transition"
        >
          ─ GET STARTED!
        </a>

        {/* Main Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          QR Codes for Culture: Comprehensive Free Package of Design Services
        </h2>

        {/* Subtitle */}
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
          Get Custom QR Codes and Description Pages Created by ME-QR Professional
          Team
        </p>

        {/* Get Started Button */}
        <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition">
          Get Started!
        </button>

        {/* Decorative Elements (Statues and QR Codes) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Statue 1 (Placeholder) */}
          <div
            className="absolute left-10 top-10 w-48 h-64 bg-gray-600 rounded-lg shadow-lg flex items-center justify-center"
            style={{ transform: "rotate(-5deg)" }}
          >
            <span className="text-white text-sm">Statue Mockup 1</span>
          </div>

          {/* Statue 2 (Placeholder) */}
          <div
            className="absolute right-10 bottom-10 w-48 h-64 bg-gray-600 rounded-lg shadow-lg flex items-center justify-center"
            style={{ transform: "rotate(5deg)" }}
          >
            <span className="text-white text-sm">Statue Mockup 2</span>
          </div>

          {/* QR Code Overlays (Placeholder) */}
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white/10 rounded-lg flex items-center justify-center opacity-50">
            <span className="text-white text-sm">QR Mockup</span>
          </div>
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white/10 rounded-lg flex items-center justify-center opacity-50">
            <span className="text-white text-sm">QR Mockup</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodesForCulture;