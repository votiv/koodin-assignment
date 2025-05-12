'use client'

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'

import { SearchBar } from '~/app/components/SearchBar'
import { Button } from '~/app/components/Button'

export const Header = () => {
  const router = useRouter()
  const { slug } = useParams<{ slug: string }>()

  const handleHomeNav = () => {
    router.push('/')
  }

  return (
    <div className="w-full flex justify-between mb-8 border-b-2 border-[var(--color-gold)] text-right text-[var(--color-gold)]">
      <button onClick={handleHomeNav} className="cursor-pointer">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={56}
          height={56}
          className="-scale-x-100"
        />
      </button>
      {!slug && <SearchBar />}
      {slug && <Button buttonAction={handleHomeNav}>Back</Button>}
    </div>
  )
}
