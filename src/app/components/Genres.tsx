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
  const [isClearVisible, setIsClearVisible] = useState(!!params.get('genre'))

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
    <div className="relative w-full h-[48px]">
      <AnimatePresence initial={false}>
        {isClearVisible ? (
          <motion.button
            initial={{ opacity: 0, scale: 0, width: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              width: 'auto',
              transition: { delay: 0.2 },
            }}
            exit={{ opacity: 0, scale: 0, width: 0 }}
            onClick={handleClear}
            className="w-[48px] h-[48px] cursor-pointer absolute top-0 left-0"
            key="clearButton"
          >
            <Clear />
          </motion.button>
        ) : null}

        <motion.div
          initial={{ marginLeft: 0 }}
          animate={{ marginLeft: isClearVisible ? '48px' : 0 }}
          className="h-[48px] flex gap-2 overflow-x-auto text-nowrap"
        >
          {genres?.map(genre => (
            <button
              key={genre}
              className={`rounded-sm border-2 p-2 cursor-pointer ${genre === params.get('genre') ? 'border-[var(--color-gold)]' : 'border-[var(--color-blue)]'}`}
              onClick={handleGenreSelect(genre)}
            >
              {genre}
            </button>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
