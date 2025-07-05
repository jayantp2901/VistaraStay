import { Link } from "react-router-dom";
// import BannerBg from '../Assets/Images/BannerBg.jpg'
export default function Banner() {
  return (
 <section
      className="relative w-full h-[80vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url('/Images/BannerBg.jpg')` }}
    >      {/* Overlay (optional for dark tint) */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Banner Content */}
      <div className="relative z-10 max-w-4xl text-center px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
          Discover Your <span className="text-yellow-400">Perfect Stay</span> with Us..!
        </h1>
        <h2 className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-200">
          Unwind in comfort, experience luxury, and make unforgettable memories.
        </h2>
        <Link
          to="/hotels"
          className="inline-block mt-6 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg shadow transition duration-300"
        >
          Explore Now!
        </Link>
      </div>
    </section>
  );
}
