import Cookies from 'js-cookie'

export type UserData = {
  id: string
  email: string
  name: string
}

export const getUser = (): UserData | null => {
  const userCookie = Cookies.get('user')
  if (!userCookie) return null
  
  try {
    return JSON.parse(userCookie) as UserData
  } catch {
    return null
  }
}

export const setUser = (userData: UserData) => {
  Cookies.set('user', JSON.stringify(userData), {
    expires: 1, // 1 day
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  })
}

export const removeUser = () => {
  Cookies.remove('user')
}

export const isAuthenticated = (): boolean => {
  return !!getUser()
} 