import api from './axios'

export const getMyInfo = () =>
  api.get('/api/users/me')

export const updateNickname = (nickname) =>
  api.patch('/api/users/me/nickname', { nickname })

export const updatePassword = (currentPassword, newPassword) =>
  api.patch('/api/users/me/password', { currentPassword, newPassword })

export const getMyPosts = () =>
  api.get('/api/users/me/posts')

export const getMyComments = () =>
  api.get('/api/users/me/comments')
