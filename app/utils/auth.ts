import Cookies from 'js-cookie'

export type UserData = {
  id: string
  email: string
  name: string
}

// Gets the currently logged-in user from cookies
export const getUser = (): UserData | null => {
  const userCookie = Cookies.get('user')
  if (!userCookie) return null  
  try {
    return JSON.parse(userCookie) as UserData
  } catch {
    return null
  }
}

// Saves user data to a cookie when the user logs in
export const setUser = (userData: UserData) => {
  // Store user data as a cookie. Convert the user object to a string to store in the cookie
  Cookies.set('user', JSON.stringify(userData), {
    expires: 1,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
  })
}

// Removes the user cookie when the user logs out
export const removeUser = () => {
  Cookies.remove('user')
}

// Checks if a user is currently authenticated
export const isAuthenticated = (): boolean => {
  return !!getUser() // Convert user object to boolean
} 