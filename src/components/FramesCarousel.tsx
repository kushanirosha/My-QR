// FramesCarousel.tsx
import React from "react";

const FramesCarousel: React.FC = () => {
  // Array of frame styles (replace with actual image URLs or SVGs)
  const frames = [
    {
      id: 1,
      src: "https://via.placeholder.com/150?text=Frame+1+Floral",
      alt: "Floral QR Code Frame",
    },
    {
      id: 2,
      src: "https://via.placeholder.com/150?text=Frame+2+Easter+Egg",
      alt: "Easter Egg QR Code Frame",
    },
    {
      id: 3,
      src: "https://via.placeholder.com/150?text=Frame+3+Floral+Border",
      alt: "Floral Border QR Code Frame",
    },
    {
      id: 4,
      src: "https://via.placeholder.com/150?text=Frame+4+Hearts",
      alt: "Heart QR Code Frame",
    },
    {
      id: 5,
      src: "https://via.placeholder.com/150?text=Frame+5+Simple",
      alt: "Simple QR Code Frame",
    },
  ];

  // Duplicate the frames array to create a seamless loop
  const extendedFrames = [...frames, ...frames];

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header Section */}
        <h2 className="text-3xl font-bold text-gray-800">
          Explore Our Extensive Collection Of Frames
        </h2>
        <p className="mt-2 text-gray-600">
          Make your QR codes stand out with our extensive collection of free
          frames. With 1000+ options, including holiday and special occasion
          themes, you're sure to find the perfect match.
        </p>

        {/* Carousel Section */}
        <div className="mt-10 overflow-hidden">
          <div className="flex animate-scroll whitespace-nowrap">
            {extendedFrames.map((frame) => (
              <div
                key={frame.id}
                className="w-36 h-36 flex-shrink-0 mx-2 inline-block"
              >
                <img
                  src={frame.src}
                  alt={frame.alt}
                  className="w-full h-full object-contain rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Generate Now Button */}
        <div className="mt-10">
          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
            Generate QR Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default FramesCarousel;