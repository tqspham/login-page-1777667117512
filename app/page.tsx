'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (value: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setError('');

    if (value && !validateEmail(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setError('');

    if (value.length === 0) {
      setPasswordError('Password is required');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    if (password.length < 1) {
      setPasswordError('Password must be at least 1 character');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Invalid email or password');
        setIsLoading(false);
        return;
      }

      router.push('/dashboard');
    } catch {
      setError('An error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const isFormValid =
    email.trim() &&
    validateEmail(email) &&
    password &&
    password.length >= 1;

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Sign In
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <p className="text-sm font-medium text-red-800">{error}</p>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="you@example.com"
              className={`mt-1 block w-full rounded-lg border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                emailError
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              disabled={isLoading}
              aria-describedby={emailError ? 'email-error' : undefined}
            />
            {emailError && (
              <p id="email-error" className="mt-1 text-sm text-red-600">
                {emailError}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && isFormValid && !isLoading) {
                  handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
                }
              }}
              placeholder="••••••••"
              className={`mt-1 block w-full rounded-lg border px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 ${
                passwordError
                  ? 'border-red-300 focus:ring-red-500'
                  : 'border-gray-300 focus:ring-blue-500'
              }`}
              disabled={isLoading}
              aria-describedby={passwordError ? 'password-error' : undefined}
            />
            {passwordError && (
              <p id="password-error" className="mt-1 text-sm text-red-600">
                {passwordError}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            aria-label="Sign in to your account"
            className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="space-y-2 text-center text-sm">
          <div>
            <Link
              href="/forgot-password"
              className="font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
            >
              Forgot Password?
            </Link>
          </div>
          <div>
            <span className="text-gray-600">Don't have an account? </span>
            <Link
              href="/signup"
              className="font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
