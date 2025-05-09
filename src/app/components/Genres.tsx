'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import { Clear } from '~/app/components/Clear'

type GenreProps = {
  genres: string[]
}

export const Genres = ({ genres }: GenreProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams)

  const handleGenreSelect = (genre: string) => () => {
    params.set('genre', genre)
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleClear = () => {
    params.delete('genre')
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <>
      <button onClick={handleClear} className="cursor-pointer">
        <Clear />
      </button>
      {genres?.map(genre => (
        <button
          className={`rounded-sm border-2 p-2 cursor-pointer ${genre === params.get('genre') ? 'border-[var(--color-gold)]' : 'border-[var(--color-blue)]'}`}
          onClick={handleGenreSelect(genre)}
        >
          {genre}
        </button>
      ))}
    </>
  )
}
