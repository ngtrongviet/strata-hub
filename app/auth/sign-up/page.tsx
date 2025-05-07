'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { FaGoogle, FaGithub } from 'react-icons/fa'

// Password strength checker
const checkPasswordStrength = (password: string) => {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  }
  
  const strength = Object.values(checks).filter(Boolean).length
  return { checks, strength }
}

export default function SignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const passwordStrength = checkPasswordStrength(password)

  const checkEmailExists = async (email: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: 'dummy-password-for-check',
      })
      
      // If we get a "Invalid login credentials" error, it means the email exists
      // but the password is wrong (which is what we want for a new sign-up)
      if (error?.message.includes('Invalid login credentials')) {
        return true
      }
      
      // If we get any other error or no error, the email doesn't exist
      return false
    } catch {
      return false
    }
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccessMessage(null)

    try {
      if (!acceptedTerms) {
        setError('You must accept the Terms of Service and Privacy Policy')
        return
      }

      if (password !== confirmPassword) {
        setError('Passwords do not match')
        return
      }

      const passwordCheck = checkPasswordStrength(password)
      if (passwordCheck.strength < 4) {
        setError('Password does not meet strength requirements')
        return
      }

      // Check if email already exists
      const emailExists = await checkEmailExists(email)
      if (emailExists) {
        setError('This email is already registered. Please sign in instead.')
        return
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (signUpError) {
        setError(signUpError.message)
      } else {
        setSuccessMessage('Check your email for the confirmation link')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setAcceptedTerms(false)
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleSocialSignIn = async (provider: 'google' | 'github') => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
    } catch (error) {
      setError('Error signing in with ' + provider)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-sky-600">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/auth/sign-in" className="font-medium text-sky-600 hover:text-sky-500">
              Sign in
            </Link>
          </p>
        </div>

        {/* Social Sign-in Buttons */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => handleSocialSignIn('google')}
            className="w-full flex items-center justify-center px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            <FaGoogle className="h-5 w-5 mr-2 text-red-600" />
            Continue with Google
          </button>
          <button
            type="button"
            onClick={() => handleSocialSignIn('github')}
            className="w-full flex items-center justify-center px-4 py-2 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            <FaGithub className="h-5 w-5 mr-2" />
            Continue with GitHub
          </button>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-slate-500">Or continue with</span>
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}
          
          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg">
              {successMessage}
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError(null)
                }}
                className="appearance-none rounded-t-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="appearance-none rounded-b-md relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-sky-500 focus:border-sky-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="space-y-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-2 w-full rounded ${
                      level <= passwordStrength.strength
                        ? level <= 2
                          ? 'bg-red-500'
                          : level <= 3
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                        : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
              <div className="text-sm space-y-1">
                <p className={`${passwordStrength.checks.length ? 'text-green-600' : 'text-slate-600'}`}>
                  ✓ At least 8 characters
                </p>
                <p className={`${passwordStrength.checks.uppercase ? 'text-green-600' : 'text-slate-600'}`}>
                  ✓ At least one uppercase letter
                </p>
                <p className={`${passwordStrength.checks.lowercase ? 'text-green-600' : 'text-slate-600'}`}>
                  ✓ At least one lowercase letter
                </p>
                <p className={`${passwordStrength.checks.number ? 'text-green-600' : 'text-slate-600'}`}>
                  ✓ At least one number
                </p>
                <p className={`${passwordStrength.checks.special ? 'text-green-600' : 'text-slate-600'}`}>
                  ✓ At least one special character
                </p>
              </div>
            </div>
          )}

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input
              id="accept-terms"
              name="accept-terms"
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="h-4 w-4 text-sky-600 focus:ring-sky-500 border-slate-300 rounded"
            />
            <label htmlFor="accept-terms" className="ml-2 block text-sm text-slate-900">
              I accept the{' '}
              <Link href="/terms" className="font-medium text-sky-600 hover:text-sky-500">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="font-medium text-sky-600 hover:text-sky-500">
                Privacy Policy
              </Link>
            </label>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Sign up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 