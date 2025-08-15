import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import Spinner from "../../components/atoms/Spinner";
import { getPostByIdApi, updatePostApi } from "../../services/posts";
import { EditSchema } from "../../utils/validationSchema/PostSchema";
import Button from "../../components/atoms/Button";
function EditPostPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await getPostByIdApi(postId);
        if (response.data) {
          setPost(response.data.post);
        } else {
          setError("Post not found");
          toast.error("Post not found");
        }
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(err.message || "Failed to load post data");
        toast.error("Failed to load post data");
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);

      if (values.image && values.image instanceof File) {
        formData.append("image", values.image);
      }

      const response = await updatePostApi(postId, formData);
      console.log("responseinEdit", response);
      if (response.success) {
        toast.success("Post updated successfully");
        navigate(`/post/${postId}`);
      } else {
        toast.error(response.message || "Failed to update post");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err.message || "An error occurred while updating");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner />;

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="text-lg text-red-500">{error}</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="text-lg text-gray-500">Post not found</span>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl px-4 py-8 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-primary">Edit Post</h1>

      <Formik
        initialValues={{
          title: post.title || "",
          description: post.description || "",
          image: null,
        }}
        validationSchema={EditSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-secondary"
              >
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-secondary"
              >
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows="5"
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="mt-1 text-sm text-red-500"
              />
            </div>

            <div>
              <label htmlFor="image" className="block mb-2 text-sm font-medium">
                Image (Optional)
              </label>
              <div className="flex items-center space-x-4">
                {/* {post.postImage && (
                  <img
                    src={post.postImage}
                    alt="Current post image"
                    className="object-cover w-24 h-24 rounded"
                  />
                )} */}
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files[0]);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Leave empty to keep the current image
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-70"
              >
                {isSubmitting ? "Updating..." : "Update Post"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditPostPage;
