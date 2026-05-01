import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Sign Up
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Create a new account
          </p>
        </div>
        <div className="text-center">
          <Link
            href="/"
            className="font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded px-1"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
