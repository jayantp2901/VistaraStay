import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";



const HotelList = () => {
    const [hotels, setHotels] = useState([]);
    const [favorites, setFavorites] = useState(() => {
        return JSON.parse(localStorage.getItem("favorites")) || [];
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState("IN");
    const [currentPage, setCurrentPage] = useState(1);

    const countries = [
        { code: "SG", name: "Singapore" },
        { code: "US", name: "United States" },
        { code: "IN", name: "India" },
        { code: "AE", name: "United Arab Emirates" },
        { code: "UK", name: "United Kingdom" },
        { code: "FR", name: "France" },
    ];

    useEffect(() => {
        fetchHotels(selectedCountry);
    }, [selectedCountry]);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const fetchHotels = async (countryCode) => {
        setLoading(true);
        setError(null);
        const apiKey = process.env.REACT_APP_LITE_API_KEY;
        try {
            const response = await fetch(
                `https://api.liteapi.travel/v3.0/data/hotels?countryCode=${countryCode}&limit=50`,
                {
                    method: "GET",
                    headers: {
                        "X-API-Key":apiKey,
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

            const data = await response.json();
            setHotels(data.data.slice(0, 50));
            setCurrentPage(1);
        } catch (err) {
            setError("Error fetching hotel data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const toggleFavorite = (hotel) => {
        setFavorites((prev) => {
            const isFavorite = prev.some((fav) => fav.id === hotel.id);
            if (isFavorite) {
                return prev.filter((fav) => fav.id !== hotel.id);
            } else {
                return [...prev, hotel];
            }
        });
    };

    const isFavorite = (hotelId) => {
        return favorites.some((fav) => fav.id === hotelId);
    };

    const hotelsPerPage = 10;
    const totalPages = Math.ceil(hotels.length / hotelsPerPage);
    const displayedHotels = hotels.slice(
        (currentPage - 1) * hotelsPerPage,
        currentPage * hotelsPerPage
    );

    return (
        <div className="container mx-auto p-6">
            {/* Country Selection */}
            <div className="mb-4">
                <label className="font-semibold mr-2">Select Country:</label>
                <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="p-2 border rounded-md"
                >
                    {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Loading / Error Messages */}
            {loading && <p>Loading hotels...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {/* Hotel Listings */}
            {!loading && !error && displayedHotels.length > 0 && (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {displayedHotels.map((hotel) => (
                            <div
                                key={hotel.id}
                                className="bg-white rounded-xl shadow-md overflow-hidden transition transform hover:scale-105 hover:shadow-lg"
                            >
                                <img
                                    src={hotel.thumbnail}
                                    alt={hotel.name}
                                    className="w-full h-40 object-cover"
                                />
                                <div className="p-3">
                                    <h3 className="text-lg font-semibold text-gray-800 truncate">{hotel.name}</h3>
                                    <p className="text-gray-500 text-xs">{hotel.city}, {hotel.country}</p>
                                    <p className="text-gray-600 mt-1 text-sm line-clamp-2">
                                        {hotel.hotelDescription?.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 100)}...
                                    </p>
                                    <div className="mt-2 flex items-center justify-between">
                                        <div className="text-yellow-500 text-2xl">
                                            {"★".repeat(hotel.stars) + "☆".repeat(5 - hotel.stars)}
                                        </div>
                                        <p className="text-gray-500 text-xs">Reviews: {hotel.reviewCount}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between p-3">
                                    <Link to={`/hotels/details/${hotel.id}`} className="bg-blue-600 text-white py-2 px-4 rounded-md">
                                        View Details
                                    </Link>
                                    <button
                                        className={`py-2 px-4 rounded-md ${isFavorite(hotel.id) ? "bg-gray-800" : "bg-gray-800"} text-white`}
                                        onClick={() => toggleFavorite(hotel)}
                                    >
                                        {isFavorite(hotel.id) ? (
                                            <>
                                                Saved <FaHeart className="inline ml-1" />
                                            </>
                                        ) : (
                                            <>
                                                Save <FaRegHeart className="inline ml-1" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center mt-5 space-x-2">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className={`px-3 py-2 rounded-md ${currentPage === 1 ? "bg-gray-300" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                        >
                            Prev
                        </button>
                        <span className="text-lg font-semibold">{currentPage} / {totalPages}</span>
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className={`px-3 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-300" : "bg-blue-600 text-white hover:bg-blue-700"}`}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}

        </div>
    );
};

export default HotelList;
