import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HotelDetails.css";

export default function HotelDetails() {
    const { id } = useParams();
    const [hotel, setHotel] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) {
            setError("No hotel ID found in URL.");
            setLoading(false);
            return;
        }

        const fetchHotelDetails = async () => {
            try {
                const response = await fetch(
                    `https://api.liteapi.travel/v3.0/data/hotel?hotelId=${id}`,
                    {
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
                const hotelData = data.data;
                if (!hotelData || Object.keys(hotelData).length === 0) {
                    throw new Error("Hotel not found in the response.");
                }
                setHotel(hotelData);
            } catch (error) {
                setError(error.message || "Failed to load hotel details.");
            } finally {
                setLoading(false);
            }
        };
        fetchHotelDetails();
    }, [id]);

    if (loading) return <h2 className="text-center text-warning">Loading...</h2>;
    if (error) return <h2 className="text-center text-danger">{error}</h2>;
    if (!hotel) return <h2 className="text-center text-danger">Hotel Not Found</h2>;

    return (
        <div className="container hotel-details">
        <div className="p-6 bg-white shadow-md rounded-lg border border-gray-300">
    {/* Hotel Info */}
    <div className="border-b border-gray-300 pb-4">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">{hotel.name}</h1>
        <h4 className="text-lg text-gray-600 font-semibold flex items-center">
            📍 {hotel.city}, {hotel.address || "Unknown Address"}
        </h4>
        {/* Star Rating & Reviews */}
<div className="flex items-center space-x-2 mt-3">
    <div className="border-2 border-green-800 bg-green-100 text-green-900 px-4 py-2 rounded-lg font-bold text-lg flex items-center">
        ⭐ {hotel.starRating || "N/A"} Stars
    </div>
    <div className="text-gray-700 font-medium text-lg">
        ({hotel.reviewCount || "0"} Reviews)
    </div>
</div>

<p
    className="mt-4 text-lg text-gray-800 leading-relaxed bg-gray-100 p-4 rounded-lg shadow-sm border-l-4 border-green-500"
    dangerouslySetInnerHTML={{ __html: hotel.hotelDescription || "No Description Available" }}
></p>

    </div>

    {/* Image Gallery */}
    {hotel.hotelImages?.length > 0 && (
        <div className="mt-6">
            <h4 className="text-2xl font-bold text-gray-800 mb-3">🖼️ Gallery</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {hotel.hotelImages.slice(0, 10).map((img, index) => (
                    <div key={index} className="overflow-hidden rounded-lg shadow-md hover:scale-105 transition transform duration-300 ease-in-out">
                        <img
                            src={img.url}
                            alt={`Hotel ${index + 1}`}
                            className="w-full h-40 object-cover rounded-lg"
                            loading="lazy"
                        />
                    </div>
                ))}
            </div>
        </div>
    )}
</div>

            
            {/* Rooms */}
            {/* Available Rooms */}
{hotel.rooms?.length > 0 && (
    <div className="mt-10">
        <h4 className="text-2xl font-bold text-gray-800 mb-4">🏨 Available Rooms</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotel.data.rooms.map((room, index) => (
                <div key={index} className="bg-white shadow-lg rounded-xl overflow-hidden transform hover:scale-105 transition duration-300">
                    <div className="p-6">
                        <h5 className="text-xl font-bold text-gray-900">{room.roomName}</h5>
                        <p className="text-gray-600 mt-2 text-lg">💰 {room.description || "N/A"}</p>
                        <button className="mt-4 w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition">
                            Book Now
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
)}

{/* Facilities */}
{hotel.hotelFacilities?.length > 0 && (
    <div className="mt-10">
        <h4 className="text-2xl font-bold text-gray-800 mb-4">🏋️ Facilities</h4>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {hotel.hotelFacilities.slice(0, 12).map((facility, index) => (
                <li key={index} className="flex items-center bg-gray-100 p-3 rounded-lg shadow-sm text-gray-700">
                    ✅ {facility}
                </li>
            ))}
        </ul>
    </div>
)}

{/* Contact & Policies */}
<div className="">
    {/* Contact Section */}
    {/* <div className="bg-white shadow-lg rounded-xl p-6">
        <h5 className="text-xl font-bold text-gray-800 mb-3">📞 Contact</h5>
        <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
                📞 <span className="ml-2">{hotel.phone || "N/A"}</span>
            </li>
            <li className="flex items-center">
                📧 <span className="ml-2">{hotel.email || "N/A"}</span>
            </li>
        </ul>
    </div> */}

    {/* Policies Section */}
    <div className="bg-white rounded-xl p-6 mt-4">
        <h5 className="text-xl font-bold text-gray-800 mb-3">📜 Policies</h5>
        <ul className="space-y-3">
            {hotel.policies?.map((policy, index) => (
                <li key={index} className="bg-gray-100 p-3 rounded-lg shadow-sm text-gray-700">
                    <strong>{policy.name}:</strong> {policy.description}
                </li>
            ))}
        </ul>
    </div>
</div>

        </div>
    );
}