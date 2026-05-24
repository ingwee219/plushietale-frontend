import api from './axios'

export const getMyToys = () =>
  api.get('/api/toys')

export const createToy = (formData) =>
  api.post('/api/toys', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export const updateToy = (id, formData) =>
  api.put(`/api/toys/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export const deleteToy = (id) =>
  api.delete(`/api/toys/${id}`)
