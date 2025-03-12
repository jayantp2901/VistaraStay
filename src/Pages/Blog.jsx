import React, { useEffect, useState } from "react";
import Banner from "../Components/Banner";

export default function Blog() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchBlogData();
    }, []);

    async function fetchBlogData() {
        const blogApi = process.env.REACT_APP_BLOGGER_API_KEY;
        console.log(blogApi)
        try {
            const response = await fetch(
                `https://www.googleapis.com/blogger/v3/blogs/6768487774851306134/posts?key=${blogApi}`
            );
            const data = await response.json();
            console.log("blogData ", data)

            if (data.items) {
                setPosts(data.items);
            } else {
                console.error("No posts found.");
            }
        } catch (error) {
            console.error("Error fetching blog data:", error);
        }
    }

    function extractImageFromContent(content) {
        const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
        return imgMatch ? imgMatch[1] : null;
    }

    return (
        <>
        <Banner/>
        <div className="container my-5">

            <div className="row">
                {posts.map(post => (
                    <div className="col-md-3 mb-4" key={post.id}>
                        <div className="card shadow-lg h-40 d-flex flex-column" style={{ minHeight: "400px" }}>
                            {extractImageFromContent(post.content) && (
                                <img
                                    src={extractImageFromContent(post.content)}
                                    className="card-img-top"
                                    alt="Post"
                                    style={{ height: "180px", objectFit: "cover" }}
                                />
                            )}
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{post.title}</h5>
                                <div
                                    className="card-text flex-grow-1"
                                    dangerouslySetInnerHTML={{
                                        __html: post.content.substring(0, 100) + "...",
                                    }}
                                />
                                <a
                                    href={post.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn btn-primary mt-auto"
                                >
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
}
