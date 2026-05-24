import api from './axios'

export const getMyStories = () =>
  api.get('/api/stories')

export const getStory = (id) =>
  api.get(`/api/stories/${id}`)

export const createStory = (toyIds, targetAge, prompt) =>
  api.post('/api/stories', { toyIds, targetAge, ...(prompt ? { prompt } : {}) })

export const deleteStory = (id) =>
  api.delete(`/api/stories/${id}`)
