'use client'

import { useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'

import { Clear } from '~/app/components/Clear'

type GenreProps = {
  genres: string[]
}

export const Genres = ({ genres }: GenreProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams)
  const [isClearVisible, setIsClearVisible] = useState(false)

  const handleGenreSelect = (genre: string) => () => {
    params.set('genre', genre)
    router.replace(`${pathname}?${params.toString()}`)
    setIsClearVisible(true)
  }

  const handleClear = () => {
    params.delete('genre')
    router.replace(`${pathname}?${params.toString()}`)
    setIsClearVisible(false)
  }

  return (
    <div className="w-full flex gap-2">
      <AnimatePresence initial={false}>
        {isClearVisible ? (
          <motion.button
            initial={{ opacity: 0, scale: 0, width: 0 }}
            animate={{ opacity: 1, scale: 1, width: 'auto' }}
            exit={{ opacity: 0, scale: 0, width: 0 }}
            onClick={handleClear}
            className="cursor-pointer"
            key="clearButton"
          >
            <Clear />
          </motion.button>
        ) : null}
      </AnimatePresence>

      <div className="flex gap-2 overflow-x-auto text-nowrap">
        {genres?.map(genre => (
          <button
            key={genre}
            className={`rounded-sm border-2 p-2 cursor-pointer ${genre === params.get('genre') ? 'border-[var(--color-gold)]' : 'border-[var(--color-blue)]'}`}
            onClick={handleGenreSelect(genre)}
          >
            {genre}
          </button>
        ))}
      </div>
    </div>
  )
}
