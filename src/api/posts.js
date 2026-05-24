import api from './axios'

export const getPosts = (page = 0) =>
  api.get(`/api/posts?page=${page}&size=10`)

export const toggleLike = (id) =>
  api.post(`/api/posts/${id}/likes`)

export const getPost = (id) =>
  api.get(`/api/posts/${id}`)

export const createPost = (storyId, title, content) =>
  api.post('/api/posts', { storyId, title, content })

export const updatePost = (id, title, content) =>
  api.put(`/api/posts/${id}`, { title, content })

export const deletePost = (id) =>
  api.delete(`/api/posts/${id}`)

export const getComments = (postId) =>
  api.get(`/api/posts/${postId}/comments`)

export const createComment = (postId, content) =>
  api.post(`/api/posts/${postId}/comments`, { content })

export const updateComment = (postId, commentId, content) =>
  api.put(`/api/posts/${postId}/comments/${commentId}`, { content })

export const deleteComment = (postId, commentId) =>
  api.delete(`/api/posts/${postId}/comments/${commentId}`)
