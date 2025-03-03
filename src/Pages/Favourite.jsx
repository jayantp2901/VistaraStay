import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    // Load favorites from localStorage
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    const removeFavorite = (hotelId) => {
        const updatedFavorites = favorites.filter((hotel) => hotel.id !== hotelId);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Saved Hotels</h2>

            {favorites.length === 0 ? (
                <p className="text-gray-500">No saved hotels.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                    {favorites.map((hotel) => (
                        <div key={hotel.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                            <img src={hotel.thumbnail} alt={hotel.name} className="w-full h-40 object-cover" />
                            <div className="p-3">
                                <h3 className="text-lg font-semibold text-gray-800 truncate">{hotel.name}</h3>
                                <p className="text-gray-500 text-xs">{hotel.city}, {hotel.country}</p>
                                <div className="flex justify-between mt-2">
                                    <Link to={`/hotels/details/${hotel.id}`} className="bg-blue-600 text-white py-2 px-4 rounded-md">
                                        View Details
                                    </Link>
                                    <button 
                                        className="bg-red-500 text-white py-2 px-4 rounded-md" 
                                        onClick={() => removeFavorite(hotel.id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
