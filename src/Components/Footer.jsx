import { Link } from "react-router-dom";



export default function Footer() {
    return (
        <footer className="w-full bg-gray-800 text-white p-5 mt-auto">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                {/* Footer Section 1 */}
                <div className="text-center md:text-left mb-4 md:mb-0">
                    <h2 className="text-2xl font-bold">VistaraStay</h2>
                    <h3 className="text-lg italic">Forget the hassle, just pack and travel..!</h3>
                    <h6 className="text-white-700 mt-1">
                        StayFinder makes finding your perfect stay simple and stress-free, wherever you go!
                    </h6>
                </div>

                {/* Footer Section 2 - Quick Links */}
                <div className="text-center md:text-left">
                    <h6 className="text-lg font-semibold">Quick Links</h6>
                    <ul className="space-y-1">
                        <li><Link to="/" className="hover:underline">Blog</Link></li>
                        <li><Link to="/hotels" className="hover:underline">Hotel</Link></li>
                        <li><Link to="/aboutus" className="hover:underline">About Us</Link></li>
                    </ul>
                </div>

                {/* Footer Section 3 - Contact */}
                <div className="text-center md:text-left">
                    <h6 className="text-lg font-semibold">Contact Us</h6>
                    <h6 className="text-sm">Email: VistaraStay@gmail.com</h6>
                    <h6 className="text-sm">Phone: 9876543210</h6>
                </div>
            </div>
        </footer>
    );
}
