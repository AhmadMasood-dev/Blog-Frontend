import { api } from '../api';

export const addCommentApi = async (postId, commentData) => {
  try {

    const response = await api.post(`/comments/${postId}`, commentData, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};

export const deleteCommentApi = async (commentId) => {
  try {
    const response = await api.delete(`/comments/${commentId}`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw error.response?.data || error;
  }
};