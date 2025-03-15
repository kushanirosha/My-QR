// Features.tsx
import React from "react";

const Features: React.FC = () => {
  // Array of feature cards
  const features = [
    {
      id: 1,
      title: "QR Code Unlimited Creation",
      description: "Create unlimited amount of QR codes, no limits",
      icon: "📊",
      link: "Read More",
    },
    {
      id: 2,
      title: "QR Code Application",
      description: "Read More",
      icon: "📱",
      link: "Read More",
    },
    {
      id: 3,
      title: "QR Code Free Creation",
      description: "Create a QR Code free without any restrictions",
      icon: "🎁",
      link: "Read More",
    },
    {
      id: 4,
      title: "Unlimited Scans",
      description: "Saving High Res codes",
      icon: "🔍",
      link: "Read More",
    },
    {
      id: 5,
      title: "+40 Different Types of QR Code",
      description: "Link/URL, Wi-Fi, PDF",
      icon: "🔗",
      link: "Read More",
    },
    {
      id: 6,
      title: "Dynamic QR Codes",
      description: "Change QR Code content whenever you need",
      icon: "🔄",
      link: "Read More",
    },
    {
      id: 7,
      title: "QR Code Samples",
      description: "Use templates for fast QR code creation",
      icon: "🏷️",
      link: "Read More",
    },
    {
      id: 8,
      title: "Expiration Management",
      description: "QR will disappear after it expires",
      icon: "⏳",
      link: "Read More",
    },
    {
      id: 9,
      title: "QR Code Analytics",
      description: "Comprehensive statistics of QR codes",
      icon: "📈",
      link: "Read More",
    },
    {
      id: 10,
      title: "Bulk QR Creation",
      description: "Create & manage your QR bulks",
      icon: "📦",
      link: "Read More",
    },
    {
      id: 11,
      title: "Trackable Scanning",
      description: "",
      icon: "👁️",
      link: "Read More",
    },
    {
      id: 12,
      title: "Scanning Notifications",
      description: "",
      icon: "🔔",
      link: "Read More",
    },
    {
      id: 13,
      title: "QR Code with Dots",
      description: "",
      icon: "🔳",
      link: "Read More",
    },
    {
      id: 14,
      title: "File Formats for QR Codes",
      description: "",
      icon: "📄",
      link: "Read More",
    },
    {
      id: 15,
      title: "Shaped QR Codes",
      description: "",
      icon: "🎨",
      link: "Read More",
    },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header Section */}
        <h2 className="text-3xl font-bold text-purple-800 mb-6">
          Explore Our Amazing Features
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="bg-white rounded-lg shadow-md p-6 hover:bg-purple-50 hover:shadow-lg transition duration-300 transform hover:-translate-y-2"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {feature.description}
              </p>
              <a
                href="#"
                className="text-purple-600 hover:text-purple-800 text-sm font-medium"
              >
                {feature.link}
              </a>
            </div>
          ))}
        </div>

        {/* Create QR Code Button */}
        <div className="mt-10">
          <button className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition">
            Create QR Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default Features;