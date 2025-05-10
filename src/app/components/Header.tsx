'use client'

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'

import { SearchBar } from '~/app/components/SearchBar'

export const Header = () => {
  const router = useRouter()
  const { slug } = useParams<{ slug: string }>()

  const handleNav = () => {
    router.push('/')
  }

  return (
    <div className="w-full flex justify-between mb-8 border-b-2 border-[var(--color-gold)] text-right text-[var(--color-gold)]">
      <button onClick={handleNav} className="cursor-pointer">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={56}
          height={56}
          className="-scale-x-100"
        />
      </button>
      {!slug && <SearchBar />}
    </div>
  )
}
