import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import { createPostApi } from "../../services/posts";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { CreatePostSchema } from "../../utils/validationSchema/PostSchema";
import Button from "../atoms/Button";

function CreatePost() {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to create a post");
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const initialValues = {
    title: "",
    description: "",
    postImage: null,
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("postImage", values.postImage);

      const response = await createPostApi(formData);

      if (response.success) {
        toast.success("Post created successfully!");
        navigate("/posts");
      } else {
        throw new Error(response.message || "Failed to create post");
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-xl px-4 py-8 mx-auto">
      <h1 className="mb-6 text-2xl font-bold text-center text-primary">
        Create New Post
      </h1>

      <Formik
        initialValues={initialValues}
        validationSchema={CreatePostSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, setFieldValue, errors, touched }) => (
          <Form className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-secondary"
              >
                Title
              </label>
              <Field
                type="text"
                id="title"
                name="title"
                className={`block w-full px-3 py-2 mt-1 border ${
                  errors.title && touched.title
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="Enter post title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows={6}
                className={`block w-full px-3 py-2 mt-1 border ${
                  errors.description && touched.description
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                placeholder="Enter post description"
              />
              <ErrorMessage
                name="description"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <label
                htmlFor="postImage"
                className="block text-sm font-medium text-gray-700"
              >
                Post Image
              </label>
              <input
                type="file"
                id="postImage"
                name="postImage"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  if (!file.type.startsWith("image/")) {
                    toast.error("Please upload an image file");
                    return;
                  }

                  if (file.size > 5 * 1024 * 1024) {
                    toast.error("Image size should be less than 5MB");
                    return;
                  }

                  setFieldValue("postImage", file);

                  const reader = new FileReader();
                  reader.onload = () => {
                    setImagePreview(reader.result);
                  };
                  reader.readAsDataURL(file);
                }}
                className={`block w-full mt-1 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 ${
                  errors.postImage && touched.postImage ? "border-red-500" : ""
                }`}
              />
              <ErrorMessage
                name="postImage"
                component="div"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="object-contain w-full max-h-64"
                />
              </div>
            )}

            <div className="text-right">
              <Button
                type="submit"
                disabled={isSubmitting || loading}
                className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isSubmitting || loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting || loading ? "Creating Post..." : "Create Post"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreatePost;
