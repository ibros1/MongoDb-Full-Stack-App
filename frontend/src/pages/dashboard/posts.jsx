import React, { useEffect, useState } from "react";
import DialogForm from "./Dialogform";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const listUsersPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/post/get-user-posts");
      setPosts(response.data.posts || []);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    listUsersPosts();
  }, []);
  // 👇 Re-fetch when refresh flag is true

  useEffect(() => {
    if (location.state?.refresh) {
      listUsersPosts();
    }
    navigate(location.pathname, { replace: true });
  }, [navigate]);

  // useEffect(() => {
  //   if (location.state?.refresh) {
  //     listUsersPosts();
  //     navigate(location.pathname, { replace: true }); // remove state after refresh
  //   }
  // }, [navigate]);

  if (loading) {
    return <div className="text-center py-10">Loading posts...</div>;
  }

  if (!posts.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No posts found. Create your first one!
        <div className="mt-4">
          <DialogForm onPostCreated={listUsersPosts} />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Create Post Button / Form */}
      <div className="mb-6 flex justify-end">
        <DialogForm onPostCreated={listUsersPosts} />
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-2xl cursor-pointer shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            onClick={() => navigate(`/dashboard/posts/${post._id}`)}
          >
            {post.image && (
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                {post.title}
              </h2>
              <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                {post.content}
              </p>
              <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
                <span>@{post.author?.username || "Unknown"}</span>
                <span>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
