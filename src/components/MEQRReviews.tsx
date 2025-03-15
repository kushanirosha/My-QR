// MEQRReviews.tsx
import React from "react";

const MEQRReviews: React.FC = () => {
  // Array of review cards based on the image
  const reviews = [
    {
      id: 1,
      rating: 5,
      title: "QR Crisis Averted",
      quote:
        "Just had an urgent issue with some QR codes that was potentially devastating to our event. Thankfully Andriana and she helped me out very quickly and crisis averted! Thank you thank you thank you so amazing, quick response and successful outcome. It's so worth having an account with ME-QR - you guys ROCK!",
      author: "LPI",
    },
    {
      id: 2,
      rating: 5,
      title: "The best customer service",
      quote:
        "The best customer service, so far. Quick replies. Very serious and customer orientated. Third times one before buying a package, using a [trial] contacted support and every time same: quick reply, very reasonable time for fixing bugs, even for new features [problem sent to developers ASAP and fixed]",
      author: "George Iancu",
    },
    {
      id: 3,
      rating: 5,
      title: "ME-QR is outstanding!",
      quote:
        "ME-QR is outstanding! Their customer service is top notch and fast. Their features are fantastic and stand out as the best and most affordable in the market. If you're looking for a reliable QR solution, ME-QR is the way to go. Highly recommended!",
      author: "Tera Workspace",
    },
  ];

  return (
    <div className="bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Header Section */}
        <h2 className="text-3xl font-bold text-gray-800 mb-4">ME-QR Reviews</h2>
        <p className="text-gray-600 text-lg mb-10">
          Discover what our customers say about their encounters with our
          versatile and user-friendly platform.
        </p>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-md p-6 hover:bg-purple-50 hover:shadow-lg transition-all duration-300"
            >
              {/* Star Rating */}
              <div className="flex justify-center mb-4">
                {Array.from({ length: review.rating }, (_, i) => (
                  <span key={i} className="text-yellow-400 text-2xl">
                    ★
                  </span>
                ))}
                <span className="text-gray-400 text-2xl">
                  {Array.from({ length: 5 - review.rating }, (_, i) => (
                    <span key={i}>☆</span>
                  ))}
                </span>
                <span className="text-gray-600 ml-2">{review.rating}</span>
              </div>

              {/* Quote Icon */}
              <div className="flex justify-center mb-4">
                <span className="text-purple-300 text-4xl">❝</span>
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                {review.title}
              </h3>

              {/* Quote */}
              <p className="text-gray-600 text-sm mb-4 text-center">
                {review.quote}
              </p>

              {/* Author */}
              <p className="text-gray-500 text-sm italic text-center">
                <span className="mr-1">✨</span>
                {review.author}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MEQRReviews;