import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const HotelList = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState("IN"); // Default: Singapore
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

    const fetchHotels = async (countryCode) => {
        setLoading(true);
        setError(null);

        try {
            const queryParams = new URLSearchParams({
                countryCode,
                limit: "50",
            }).toString();

            const response = await fetch(
                `https://api.liteapi.travel/v3.0/data/hotels?${queryParams}`,
                {
                    method: "GET",
                    headers: {
                        "X-API-Key": "sand_16f8ef95-963b-41a6-856d-4b22ccc0cd36",
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            let hotelsData = data.data || [];

            // Limit to max 50 records
            hotelsData = hotelsData.slice(0, 50);

            setHotels(hotelsData);
            setCurrentPage(1);
        } catch (err) {
            setError("Error fetching hotel data");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Pagination
    const hotelsPerPage = 10;
    const totalPages = Math.ceil(hotels.length / hotelsPerPage);
    const displayedHotels = hotels.slice(
        (currentPage - 1) * hotelsPerPage,
        currentPage * hotelsPerPage
    );

    return (
        <>
            <Navbar />
            <div className="p-5">
                {/* Country Selection Dropdown */}
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

                {/* Loading / Error State */}
                {loading && <p>Loading hotels...</p>}
                {error && <p className="text-red-500">{error}</p>}

                {/* Hotel Cards */}
                {!loading && !error && displayedHotels.length > 0 && (
                    <>
                        <div className="grid grid-cols-3 gap-6">
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
                                    <div className="flex justify-between">
                                    <button className="btn btn-primary m-2">Details</button>
                                    <button className="btn btn-dark m-2">Save for later</button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination Controls */}
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
            <Footer />
        </>
    );
};

export default HotelList;
