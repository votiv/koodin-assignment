'use client'

import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

import { SearchBar } from '~/app/components/SearchBar'
import { Spinner } from '~/app/components/Spinner'

export const Header = () => {
  const { slug } = useParams<{ slug: string }>()

  return (
    <div className="w-full flex justify-between mb-8 border-b-2 border-[var(--color-gold)] text-right text-[var(--color-gold)] pb-4">
      <Link href="/">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={56}
          height={56}
          className="-scale-x-100"
        />
      </Link>
      <Suspense fallback={<Spinner />}>{!slug && <SearchBar />}</Suspense>
      {slug && (
        <Link href="/" className="flex items-center">
          Back
        </Link>
      )}
    </div>
  )
}
