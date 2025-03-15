// Statistics.tsx
import React from "react";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

const Statistics: React.FC = () => {
  // Hook to detect when the component is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger the animation once
    threshold: 0.3, // Trigger when 30% of the component is visible
  });

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header Section */}
        <h2 className="text-3xl font-bold text-gray-800">
          Millions Globally Trust our QR Code Tech
        </h2>
        <p className="mt-2 text-gray-600">
          Our QR Code solution is powering millions of QR Code Scans around the
          globe
        </p>

        {/* Stats Section */}
        <div
          ref={ref}
          className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {/* Stat 1: QR Codes */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <div className="text-2xl mb-2">📊</div>
            <h3 className="text-4xl font-bold text-purple-600">
              {inView ? (
                <CountUp start={0} end={9489565} duration={2.5} separator=" " />
              ) : (
                "0"
              )}
            </h3>
            <p className="mt-2 text-gray-600">QR Codes</p>
          </div>

          {/* Stat 2: Scans */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <div className="text-2xl mb-2">🔍</div>
            <h3 className="text-4xl font-bold text-purple-600">
              {inView ? (
                <CountUp
                  start={0}
                  end={2520501089}
                  duration={2.5}
                  separator=" "
                />
              ) : (
                "0"
              )}
            </h3>
            <p className="mt-2 text-gray-600">Scans</p>
          </div>

          {/* Stat 3: Users */}
          <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
            <div className="text-2xl mb-2">👤</div>
            <h3 className="text-4xl font-bold text-purple-600">
              {inView ? (
                <CountUp start={0} end={2982277} duration={2.5} separator=" " />
              ) : (
                "0"
              )}
            </h3>
            <p className="mt-2 text-gray-600">Users</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;