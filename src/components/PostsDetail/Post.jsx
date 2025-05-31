import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { MdModeComment } from "react-icons/md";
import { BsFillCalendar2DateFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getPostByIdApi, getCommentsForPostApi } from "../../services/posts";
import { addCommentApi } from "../../services/comments"; // Create this file
import { AuthContext } from "../../context/AuthContext";
import Spinner from "../../utils/Spinner";
import { toast } from "react-hot-toast";
import { formatDate } from "../../utils/FormatDate";

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  // Get auth context
  const { user, isAuthenticated } = useContext(AuthContext);
  
  // Validation schema for comment form
  const commentSchema = Yup.object().shape({
    comment: Yup.string()
      .required("Comment is required")
      .min(3, "Comment must be at least 3 characters"),
  });
  // Fetch post details
  useEffect(() => {
    const fetchPostDetail = async () => {
      setLoading(true);
      try {
        const { data } = await getPostByIdApi(id);
        setPost(data.post);
        // If comments are included in the post data
        if (data.ok) {
          setComments(data.post.comment);
        }
      } catch (err) {
        setError(err.message);
        toast.error(err.message || "Failed to fetch post details");
      } finally {
        setLoading(false);
      }
    };
    fetchPostDetail();
  }, [id]);
  // Fetch comments separately
  useEffect(() => {
    const fetchComments = async () => {
      setCommentsLoading(true);
      try {
        const response = await getCommentsForPostApi(id);
        if (response.data && response.data.comments) {
          setComments(response.data.comments);
        }
      } catch (err) {
        console.error("Error fetching comments:", err.message);
        // Don't show error toast for comments, just log it
      } finally {
        setCommentsLoading(false);
      }
    };
    // Only fetch comments separately if post is loaded
    if (post && post._id) {
      fetchComments();
    }
  }, [id, post]);
  // Handle comment submission
  const handleCommentSubmit = async (values, { resetForm }) => {
    if (!isAuthenticated) {
      toast.error("Please log in to comment");
      return;
    }
    setSubmitting(true);
    try {
      const commentIs = values.comment.trim();
      // Call the API with the comment
      const response = await addCommentApi(id, {
        commentIs: values.comment.trim(),
      });
      // Get the new comment from the response
      const newComment = response.data;
      // Add the new comment to comments
      setComments((prevComments) => [...prevComments, newComment]);
      // Reset the form
      resetForm();
      toast.success("Comment successfully added");
      // Refresh comments to get the updated list with user info
      getCommentsForPostApi(id)
        .then((response) => {
          if (response.data && response.data.comments) {
            setComments(response.data.comments);
          }
        })
        .catch((err) => {
          console.error("Error refreshing comments:", err);
        });
    } catch (err) {
      toast.error(err.message || "Failed to add comment");
    } finally {
      setSubmitting(false);
    }
  };
  if (loading) return <Spinner />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!post) return <p className="text-center text-red-500">Post not found.</p>;
  return (
    <div className="max-w-4xl px-4 py-8 mx-auto sm:px-6 lg:px-8">
      {/* Post Header */}
      <h1 className="mb-4 text-3xl font-bold text-primary">{post.title}</h1>
      {/* Post Metadata */}
      <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-secondary">
        <div className="flex items-center">
          <FaUser className="mr-1" />
          <span>
            {post.author ? `${post.author.fullName}` : "Unknown Author"}
          </span>
        </div>
        <div className="flex items-center">
          <BsFillCalendar2DateFill className="mr-1" />
          <span>{formatDate(post.createdAt)}</span>
        </div>
        <div className="flex items-center">
          <MdModeComment className="mr-1" />
          <span>{comments.length || 0} Comments</span>
        </div>
      </div>
      {/* Featured Image */}
      {post.postImage && (
        <div className="mb-8">
          <img
            src={post.postImage}
            alt={post.title}
            className="object-cover w-full rounded-lg shadow-lg max-h-96"
          />
        </div>
      )}
      {/* Post Content */}
      <div className="prose max-w-none">
        <p className="mb-4 text-lg text-secondary">{post.description}</p>
      </div>
      {/* Author Section */}
      {post.author && (
        <div className="p-6 mt-8 border-t border-secondary">
          <h2 className="mb-4 text-xl font-semibold text-primary">Author</h2>
          <div className="flex items-start">
            {post.author.avatar && (
              <img
                src={post.author.avatar}
                alt={`${post.author.fullName || ""} `}
                className="object-cover w-16 h-16 mr-4 rounded-full"
              />
            )}
            <div>
              <h3 className="text-lg font-medium text-secondary">
                {post.author.fullName}
              </h3>
              <p className="text-sm text-secondary">{post.author.email}</p>
            </div>
          </div>
        </div>
      )}
      {/* Comments section */}
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-semibold text-primary">
          Comments ({comments.length})
        </h2>
        {/* Comment form with Formik */}
        {/* Comment form with Formik */}
        <Formik
          initialValues={{ comment: "" }}
          validationSchema={commentSchema}
          onSubmit={handleCommentSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className="mb-8">
              <div className="mb-4">
                <Field
                  as="textarea"
                  id="comment"
                  name="comment"
                  rows="4"
                  className={`w-full p-3 border rounded-lg border-secondary focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.comment && touched.comment ? "border-red-500" : ""
                  }`}
                  placeholder="Write your comment..."
                  disabled={submitting}
                />
                <ErrorMessage
                  name="comment"
                  component="div"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {isAuthenticated ? (
                <button
                  type="submit"
                  className="px-6 py-2 text-white rounded-lg bg-primary hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Add Comment"}
                </button>
              ) : (
                <div>
                  <button
                    type="button"
                    disabled
                    className="px-6 py-2 text-white rounded-lg cursor-not-allowed bg-primary opacity-70"
                  >
                    Add Comment
                  </button>
                  <p className="mt-2 text-sm text-red-500">
                    Please log in to leave a comment.
                  </p>
                </div>
              )}
            </Form>
          )}
        </Formik>
        {/* Comments list */}
        {commentsLoading ? (
          <div className="text-center">
            <Spinner />
            <p className="mt-2 text-secondary">Loading comments...</p>
          </div>
        ) : comments.length > 0 ? (
          <div className="space-y-6">
            {comments.map((comment, index) => (
              <div
                key={comment._id || index}
                className="p-4 rounded-lg bg-[#4e6063]"
              >
                <div className="flex items-center mb-2">
                  {/* Check if the user is populated or if we need to load user data */}
                  {typeof comment.user === "object" && comment.user?.avatar ? (
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.fullName || "User"}
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                  ) : post.author?.avatar &&
                    post.author._id === comment.user ? (
                    <img
                      src={post.author.avatar}
                      alt={post.author.fullName || "User"}
                      className="w-8 h-8 mr-2 rounded-full"
                    />
                  ) : (
                    <div className="w-8 h-8 mr-2 bg-gray-300 rounded-full"></div>
                  )}
                  <div>
                    <h4 className="font-medium text-primary">
                      {typeof comment.user === "object"
                        ? comment.user?.fullName
                        : post.author._id === comment.user
                        ? post.author.fullName
                        : "User"}
                    </h4>
                    <p className="text-xs text-secondary">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </div>
                <p className="text-secondary">{comment.commentIs}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-secondary">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default Post;
