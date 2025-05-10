import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { fetchPaginated, fetchSearch } from '~/app/api'
import { SearchBar } from '~/app/components/SearchBar'
import { Shows } from '~/app/components/Shows'
import { Genres } from '~/app/components/Genres'

export type Show = {
  id: number
  name: string
  image: {
    medium: string
    original: string
  }
  rating: {
    average: number
  }
  externals: {
    imdb: string
    thetvdb: number
    tvrage: number
  }
  genres: string[]
  summary: string
}

type HomeProps = {
  searchParams: Promise<{ q?: string; genre?: string }>
}

const Home = async ({ searchParams }: HomeProps) => {
  const { q, genre } = await searchParams
  let shows: Show[] | undefined = q
    ? await fetchSearch(q)
    : await fetchPaginated()

  if (!shows) notFound()

  const genres = shows.reduce((genres, show) => {
    return Array.from(new Set([...genres, ...show.genres]))
  }, [] as string[])

  if (genre) {
    shows = shows.filter(show => show.genres.indexOf(genre) !== -1)
  }

  return (
    <div className="flex flex-col items-center justify-items-center gap-8">
      <Genres genres={genres} />

      <main>
        <Suspense fallback={<div>Loading...</div>} key="listOfShows">
          <Shows
            shows={shows
              .filter(show => show.externals.imdb)
              .map(show =>
                show.image
                  ? show
                  : {
                      ...show,
                      image: {
                        original:
                          "data:image/svg+xml,%3Csvg%20width%3D'64'%20height%3D'64'%20viewBox%3D'0%200%2064%2064'%20fill%3D'none'%20xmlns%3D'http%3A//www.w3.org/2000/svg'%3E%3Crect%20x%3D'4'%20y%3D'8'%20width%3D'56'%20height%3D'48'%20rx%3D'4'%20fill%3D'%23F3F4F6'%20stroke%3D'%23D1D5DB'%20stroke-width%3D'2'/%3E%3Cpath%20d%3D'M12%2044L24%2032L36%2044L44%2036L52%2044'%20stroke%3D'%239CA3AF'%20stroke-width%3D'2'%20stroke-linecap%3D'round'/%3E%3Cline%20x1%3D'16'%20y1%3D'16'%20x2%3D'48'%20y2%3D'48'%20stroke%3D'%23EF4444'%20stroke-width%3D'2'%20stroke-linecap%3D'round'/%3E%3Ccircle%20cx%3D'20'%20cy%3D'20'%20r%3D'3'%20fill%3D'%23D1D5DB'/%3E%3C/svg%3E",
                        medium:
                          "data:image/svg+xml,%3Csvg%20width%3D'64'%20height%3D'64'%20viewBox%3D'0%200%2064%2064'%20fill%3D'none'%20xmlns%3D'http%3A//www.w3.org/2000/svg'%3E%3Crect%20x%3D'4'%20y%3D'8'%20width%3D'56'%20height%3D'48'%20rx%3D'4'%20fill%3D'%23F3F4F6'%20stroke%3D'%23D1D5DB'%20stroke-width%3D'2'/%3E%3Cpath%20d%3D'M12%2044L24%2032L36%2044L44%2036L52%2044'%20stroke%3D'%239CA3AF'%20stroke-width%3D'2'%20stroke-linecap%3D'round'/%3E%3Cline%20x1%3D'16'%20y1%3D'16'%20x2%3D'48'%20y2%3D'48'%20stroke%3D'%23EF4444'%20stroke-width%3D'2'%20stroke-linecap%3D'round'/%3E%3Ccircle%20cx%3D'20'%20cy%3D'20'%20r%3D'3'%20fill%3D'%23D1D5DB'/%3E%3C/svg%3E",
                      },
                    }
              )}
          />
        </Suspense>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  )
}

export default Home
