import api from './axios'

export const signup = (email, password, nickname) =>
  api.post('/api/auth/signup', { email, password, nickname })

export const login = (email, password) =>
  api.post('/api/auth/login', { email, password })
