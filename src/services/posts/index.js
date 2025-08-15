import { api } from "../api";

export const getPostsApi = async () => {
  try {
    const response = await api.get("/posts");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching posts ");
  }
}

export const getPostByIdApi = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching post by ID");
  }
}
export const getCommentsForPostApi = async (postId) => {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching post by ID");
  }
}
export const getAllPosts = async () => {
  try {
    const response = await api.get(`/posts`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching post by ID");
  }
}
export const getUserPosts = async () => {
  try {
    const response = await api.get(`/posts/get-user-posts`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching post by ID");
  }
}


export const createPostApi = async (formData) => {
  try {

    const response = await api.post('/posts/create-post', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updatePostApi = async (postId, formData) => {
  try {
    const response = await api.patch(`/posts/update-post/${postId}`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const deletePostApi = async (postId) => {
  try {
    const response = await api.delete(`/posts/${postId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};