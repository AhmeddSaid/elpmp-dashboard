// app/not-found.tsx

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 ">404</h1>
        <p className="text-xl mb-4">
          Oops! The page you&apos;re looking for does not exist.
        </p>
        <Link href="/">
          <p className="px-4 py-2 text-white rounded-md">Go Back Home</p>
        </Link>
      </div>
    </div>
  );
}
