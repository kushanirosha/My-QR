// METicket.tsx
import React from "react";

const METicket: React.FC = () => {
  return (
    <div
      className="bg-gradient-to-r from-green-100 to-purple-100 py-16"
      style={{
        backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgba(0, 0, 0, 0.1)' stroke-width='1'%3E%3Ccircle cx='16' cy='16' r='14'/%3E%3C/svg%3E')",
        backgroundSize: "32px 32px",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Logo */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800 flex items-center justify-center">
            <span className="text-green-600">ME</span>
            <span className="text-purple-600">TICKET</span>
            <span className="text-green-600 ml-2">✨</span>
          </h1>
        </div>

        {/* Headline and Description */}
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Upgrade Your Tickets with <span className="text-green-600">📱</span>{" "}
            QR Code for Easy Check-in
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            ME-Ticket is a platform for selling venue tickets. Create an event,
            generate tickets with QR codes and enjoy self-check-outs.
          </p>
        </div>

        {/* Buttons */}
        <div className="mb-10 flex justify-center space-x-6">
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition">
            Create Event
          </button>
          <button className="bg-white text-green-600 px-6 py-3 rounded-lg border border-green-600 hover:bg-green-50 transition">
            Generate QR for Ticket
          </button>
        </div>

        {/* Mockup Section */}
        <div className="relative flex justify-center items-center">
          {/* Phone Mockup (Placeholder) */}
          <div className="absolute -left-20 top-10 w-32 h-64 bg-gray-300 rounded-lg shadow-lg flex items-center justify-center">
            <span className="text-gray-500">Phone Mockup</span>
          </div>

          {/* Laptop Mockup (Placeholder) */}
          <div className="w-96 h-64 bg-gray-300 rounded-lg shadow-lg flex items-center justify-center">
            <span className="text-gray-500">Laptop Mockup</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default METicket;