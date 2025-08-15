import { useEffect, useState } from "react";
import { getUserPosts, deletePostApi } from "../../services/posts";
import toast from "react-hot-toast";
import Spinner from "../atoms/Spinner";
import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/helper/FormatDate";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import Modal from "../atoms/Modal";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await getUserPosts();
        if (response?.success) {
          setPosts(response?.data || []);
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

  const handleEdit = (postId) => {
    navigate(`/update-post/${postId}`);
  };

  const handleDelete = (post) => {
    setPostToDelete(post);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!postToDelete) return;

    try {
      setLoading(true);
      const response = await deletePostApi(postToDelete._id);

      if (response.success) {
        setPosts(posts.filter((post) => post._id !== postToDelete._id));
        toast.success("Post deleted successfully");
      } else {
        toast.error(response.message || "Failed to delete post");
      }
    } catch (err) {
      console.error("Delete error:", err);
      toast.error(err.message || "An error occurred while deleting the post");
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setPostToDelete(null);
    }
  };

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
          {posts.length === 0 ? (
            <div className="py-10 text-center">
              <h3 className="text-xl font-medium text-gray-700">
                You haven't created any posts yet
              </h3>
              <Link
                to="/create-post"
                className="inline-block px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Create Your First Post
              </Link>
            </div>
          ) : (
            posts.map((post, idx) => (
              <li
                key={post._id || idx}
                className="relative flex flex-row items-start w-full overflow-hidden bg-white rounded-lg shadow-md"
              >
                <div className="flex-shrink-0 w-56 h-64">
                  <img
                    src={post.postImage}
                    alt={post.title || "Post image"}
                    className="object-cover w-full h-full"
                    width="224"
                    height="256"
                  />
                </div>
                <div className="flex-1 p-8">
                  <div className="absolute flex space-x-2 top-2 right-2">
                    <button
                      onClick={() => handleEdit(post._id)}
                      className="p-2 text-blue-600 transition-colors rounded-full hover:bg-blue-100"
                      aria-label="Edit post"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(post)}
                      className="p-2 text-red-600 transition-colors rounded-full hover:bg-red-100"
                      aria-label="Delete post"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>

                  <h3 className="mb-2 text-lg font-semibold text-slate-900">
                    <span className="block mb-2 text-base leading-6 text-primary">
                      {post.title || "Untitled Post"}
                    </span>
                  </h3>
                  <div className="line-clamp-4">
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
                    <span>
                      {post.createdAt ? formatDate(post.createdAt) : ""}
                    </span>
                    <span>
                      {post.comment && post.comment.length > 0
                        ? ` | ${post.comment.length} comments`
                        : " | No comments yet"}
                    </span>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
      {showDeleteModal && (
        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Post"
        >
          <div className="p-6">
            <p className="mb-6 text-gray-700">
              Are you sure you want to delete "{postToDelete?.title}"? This
              action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default MyPosts;
