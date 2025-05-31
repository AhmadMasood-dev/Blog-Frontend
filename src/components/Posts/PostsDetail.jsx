import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/posts"; // Adjust path if needed
import toast from "react-hot-toast";
import Spinner from "../../utils/Spinner";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/FormatDate";
import { IoIosArrowRoundForward } from "react-icons/io";
function PostsDetail() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getAllPosts();
        if (response.success) {
          setPosts(response.data.posts || []);
          toast.success(response.message);
        }
      } catch (err) {
        toast.error(err.message || "Failed to load posts.");
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container items-center mx-auto">
      {loading && <Spinner />}
      {error && (
        <div className="flex items-center justify-center py-12">
          <span className="text-lg text-red-500">{error}</span>
        </div>
      )}
      {!loading && !error && (
        <ul className="flex flex-col items-center max-w-4xl py-8 mx-auto gap-y-10">
          {posts.map((post, idx) => (
            <li
              key={post._id || idx}
              className="flex flex-row items-start w-full overflow-hidden bg-white rounded-lg shadow-md"
            >
              <div className="flex-shrink-0 w-56 h-64">
                <img
                  src={post.postImage || bg1}
                  alt={post.title || "Post image"}
                  className="object-cover w-full h-full"
                  width="224"
                  height="256"
                />
              </div>
              <div className="flex-1 p-8">
                <h3 className="mb-2 text-lg font-semibold text-slate-900">
                  <span className="block mb-2 text-base leading-6 text-primary">
                    {post.title || "Untitled Post"}
                  </span>
                </h3>
                <div className="line-clamp-4 ">
                  <p>
                    {post.description ||
                      "No description available for this post."}
                  </p>
                </div>
                <Link
                  className="inline-flex items-center h-10 gap-2 px-4 mt-8 text-indigo-500"
                  to={`/post/${post._id}`}
                >
                  Learn more <IoIosArrowRoundForward />
                </Link>
                <div className="mt-2 text-sm text-gray-500">
                  {post.createdAt ? formatDate(post.createdAt) : ""}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PostsDetail;
