import { Link } from "react-router"


export default function Banner(){
    return (
        <>
            <div className="banner-container">
                <div className="Banner-bgText">
                <h1 className="banner-tgline">Discover Your <span className="text-yellow-400">Perfect Stay</span>  with Us..!</h1>
                <h2 className="banner-tgline2 mt-3">Unwind in comfort, experience luxury, and make unforgettable memories.</h2>
                <Link to="/hotels" className="btn btn-warning mt-4">Explore Now!</Link>

                </div>
            </div>        
        
        </>
    )
}