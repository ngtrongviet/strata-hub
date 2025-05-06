import Cookies from 'js-cookie'

/**
 * Type definition for user data stored in cookies
 */
export type UserData = {
  id: string
  email: string
  name: string
}

/**
 * Gets the currently logged-in user from cookies
 * @returns The user data if logged in, null otherwise
 */
export const getUser = (): UserData | null => {
  // Try to get the user cookie
  const userCookie = Cookies.get('user')
  
  // If no cookie exists, user is not logged in
  if (!userCookie) return null
  
  try {
    // Convert the cookie string back to a JavaScript object
    return JSON.parse(userCookie) as UserData
  } catch {
    // If there's an error parsing the cookie, return null
    return null
  }
}

/**
 * Saves user data to a cookie when the user logs in
 * @param userData The user data to store
 */
export const setUser = (userData: UserData) => {
  // Store user data as a cookie
  // Convert the user object to a string to store in the cookie
  Cookies.set('user', JSON.stringify(userData), {
    expires: 1, // Cookie expires in 1 day for security
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    sameSite: 'strict', // Prevent CSRF attacks
  })
}

/**
 * Removes the user cookie when the user logs out
 */
export const removeUser = () => {
  Cookies.remove('user')
}

/**
 * Checks if a user is currently authenticated
 * @returns true if user is logged in, false otherwise
 */
export const isAuthenticated = (): boolean => {
  return !!getUser() // Convert user object to boolean
} 