'use client'

import Link from 'next/link'

type ErrorProps = {
  error: Error & { digest?: string }
}

const Error = ({ error }: ErrorProps) => (
  <div className="absolute top-1/2 left-1/2 right-auto bottom-auto -translate-1/2 flex flex-col justify-center items-center gap-4">
    {error.message}

    <Link href="/" className="underline">
      Go back to Home page
    </Link>
  </div>
)

export default Error
