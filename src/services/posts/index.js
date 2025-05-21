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