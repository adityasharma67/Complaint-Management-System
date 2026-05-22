export const getAuthToken = () => localStorage.getItem('token')
export const getUser = () => {
  const user = localStorage.getItem('user')
  return user ? JSON.parse(user) : null
}
export const setAuthToken = (token) => localStorage.setItem('token', token)
export const setUser = (user) => localStorage.setItem('user', JSON.stringify(user))
export const isAdmin = () => getUser()?.role === 'admin'
export const isAuthenticated = () => !!getAuthToken()
export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
}
