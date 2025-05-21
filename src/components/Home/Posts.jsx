import React, { useState, useEffect } from "react";
import { MdModeComment } from "react-icons/md";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { getPostsApi } from "../../services/posts"; // Import the API utility
import Spinner from "../../utils/Spinner"; // Import the spinner component
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/FormatDate";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize as true to show spinner immediately
  const [error, setError] = useState(null);

  // Fetch posts on component mount
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const { data } = await getPostsApi();
        console.log("Response from API:", data);
        setPosts(data.posts);
      } catch (err) {
        setError(err.message);
        toast.error(err.message || "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []); // No dependencies

  return (
    <div>
      <div className="max-w-screen-xl p-5 mx-auto sm:p-10 md:p-16">
        <div className="flex justify-between mb-5 text-sm border-b">
          <div className="flex items-center pb-2 pr-2 uppercase border-b-2 text-primary border-primary">
            <a href="#" className="inline-block font-semibold">
              Blog Posts
            </a>
          </div>
          <a href="#" className="text-primary">
            See All
          </a>
        </div>

        {loading ? (
          <Spinner />
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3">
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-secondary">No posts available.</p>
        )}
      </div>
    </div>
  );
};

const PostCard = ({ post }) => {
  // Function to format date as DD/MM or DD/MM/YY

  return (
    <div className="flex flex-col overflow-hidden rounded shadow-lg">
      <div className="relative">
        <Link to={`/post/${post._id}`}>
          <img
            className="object-cover w-full h-48"
            src={
              post.postImage ||
              "https://images.pexels.com/photos/61180/pexels-photo-61180.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            }
            alt={post.title}
          />
          <div className="absolute top-0 bottom-0 left-0 right-0 transition duration-300 opacity-25 bg-accent hover:bg-transparent"></div>
        </Link>
      </div>
      <div className="py-4 pr-6 mb-auto">
        <Link
          to={`/post/${post._id}`}
          className="inline-block mb-2 text-lg font-medium transition duration-500 ease-in-out text-primary hover:text-secondary"
        >
          {post.title}
        </Link>
        <p className="text-sm text-secondary line-clamp-4">
          {post.description}
        </p>
        <Link
          to={`/post/${post._id}`}
          className="inline-block mt-2 text-sm font-medium text-primary hover:underline"
        >
          See More
        </Link>
      </div>
      <div className="flex flex-row items-center justify-between px-6 py-3 bg-secondary">
        <span className="flex flex-row items-center py-1 mr-1 text-xs text-gray-900 font-regular">
          <BsFillCalendar2DateFill className="w-4 h-4" />
          <span className="ml-1">{formatDate(post.createdAt)}</span>
        </span>
        <span className="flex flex-row items-center py-1 mr-1 text-xs text-gray-900 font-regular">
          <MdModeComment className="w-4 h-4" />
          <span className="ml-1">{post.comment?.length || 0} Comments</span>
        </span>
      </div>
    </div>
  );
};

export default Posts;
