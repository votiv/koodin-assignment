'use client'

import { useParams, useRouter } from 'next/navigation'

import { SearchBar } from '~/app/components/SearchBar'

export const Header = () => {
  const router = useRouter()
  const { slug } = useParams<{ slug: string }>()

  const handleNav = () => {
    router.push('/')
  }

  return (
    <div className="w-full flex justify-between p-4 mb-8 border-b-2 border-[var(--color-gold)] text-right text-[var(--color-gold)]">
      <button onClick={handleNav} className="cursor-pointer">
        Logo
      </button>
      {!slug && <SearchBar />}
    </div>
  )
}
