import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";

export default function Blog() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchBlogData();
    }, []);

    async function fetchBlogData() {
        try {
            const response = await fetch("https://www.googleapis.com/blogger/v3/blogs/2399953/posts?key=AIzaSyBcPBbS9tseCBUDVQHoFw69QYTHYr2LK7o");
            const data = await response.json();

            if (data.items) {
                setPosts(data.items); // Update state with blog posts
            } else {
                console.error("No posts found.");
            }
        } catch (error) {
            console.error("Error fetching blog data:", error);
        }
    }

    return (
        <div>
            <Navbar />
            {posts.map(post => (
                <div className="card mb-3" style={{ maxWidth: "540px" }} key={post.id}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={post.images ? post.images[0].url : ''} className="img-fluid rounded-start" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.content}</p>
                                <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
