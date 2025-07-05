import Banner from "../Components/Banner";

export default function AboutUs() {
    return (
        <div className="about-us-container">
            <Banner />

            <section className="about-intro">
                <h1>Welcome to VistaraStay</h1>
                <p>Your trusted companion in finding the perfect stay, anywhere in the world.</p>
            </section>

            <section className="about-content">
                <div className="about-card">
                    <h2 className="bg-blue-900 text-white rounded">Who We Are?</h2>
                    <p>StayFinder is dedicated to helping travelers discover the best hotels, homestays, and vacation rentals with ease and confidence.</p>
                </div>
                <div className="about-card">
                    <h2 className="bg-blue-900 text-white rounded">Our Mission!</h2>
                    <p>We strive to make travel seamless and stress-free by providing comprehensive hotel listings, genuine reviews, and unbeatable deals.</p>
                </div>
                <div className="about-card">
                    <h2 className="bg-blue-900 text-white rounded">Why Choose Us?</h2>
                    <ul>
                        <li>Extensive hotel listings worldwide</li>
                        <li>Verified customer reviews</li>
                        <li>Best price guarantees</li>
                        <li>User-friendly interface</li>
                    </ul>
                </div>
            </section>

            <section className="about-team py-12 bg-gray-900 text-white">
                <h2 className="text-3xl font-bold text-center mb-8 tracking-wide uppercase">
                    Meet Our Team
                </h2>

                <div className="flex flex-wrap justify-center gap-6">
                    {/* Team Member 1 */}
                    <div className="relative w-52 h-64 rounded-xl bg-cover bg-center shadow-md overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                        style={{ backgroundImage: "url('/Team/employee4.jpeg')" }}>
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-end pb-4 text-center transition-all duration-300 hover:bg-opacity-70">
                            <h3 className="text-lg font-semibold">John Anderson</h3>
                            <p className="text-xs text-gray-300">Chief Executive Officer</p>
                        </div>
                    </div>

                    {/* Team Member 2 */}
                    <div className="relative w-52 h-64 rounded-xl bg-cover bg-center shadow-md overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                        style={{ backgroundImage: "url('/Team/employee2.jpeg')" }}>
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-end pb-4 text-center transition-all duration-300 hover:bg-opacity-70">
                            <h3 className="text-lg font-semibold">Emma Roberts</h3>
                            <p className="text-xs text-gray-300">Head of Marketing</p>
                        </div>
                    </div>

                    {/* Team Member 3 */}
                    <div className="relative w-52 h-64 rounded-xl bg-cover bg-center shadow-md overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                        style={{ backgroundImage: "url('/Team/employee3.jpg')" }}>
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-end pb-4 text-center transition-all duration-300 hover:bg-opacity-70">
                            <h3 className="text-lg font-semibold">Michael Smith</h3>
                            <p className="text-xs text-gray-300">Lead Developer</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
