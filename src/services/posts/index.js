import { api } from "../api";
import { AuthContext } from '../../context/AuthContext'
import { useContext } from "react";

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

export const createPostApi = async (formData) => {
  // const { isAuthenticated } = useContext(AuthContext);
  try {


    // if (!isAuthenticated) {
    //   throw new Error('Authentication required');
    // }

    console.log("response", formData)
    const response = await api.post('/posts/create-post', formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};