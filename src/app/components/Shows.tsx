import Link from 'next/link'
import { use } from 'react'

import { ShowCard } from '~/app/components/ShowCard'
import { type Show, type ShowsAppError } from '~/app/api'
import { isError } from '~/app/utils'

type ShowsProps = {
  showsPromise: Promise<Show[] | ShowsAppError>
}

export const Shows = ({ showsPromise }: ShowsProps) => {
  const shows = use(showsPromise)
  if (isError(shows)) {
    throw new Error('The shows could not be loaded.')
  }

  const grouped = shows.reduce(
    (grouped, show) => {
      show.genres.forEach(genre => {
        if (!grouped[genre]) {
          grouped[genre] = []
        }
        grouped[genre].push(show)
      })
      return grouped
    },
    {} as Record<string, Show[]>
  )

  Object.keys(grouped).forEach(genre => {
    grouped[genre].sort((a, b) => b.rating?.average - a.rating?.average)
  })

  const groupedShows = Object.entries(grouped)

  return groupedShows.length === 0 ? (
    <div className="w-full text-center">no shows where found</div>
  ) : (
    <div>
      {groupedShows.map(([genre, shows]) => (
        <div key={genre} className="flex flex-col gap-4 mb-16">
          <h2 className="text-4xl">{genre}</h2>
          <div className="flex gap-4 overflow-x-auto">
            {shows.map(show => (
              <Link href={`/${show.externals?.imdb}`} key={show.id}>
                <ShowCard
                  title={show.name}
                  image={
                    show.image?.original ??
                    "data:image/svg+xml,%3Csvg%20width%3D'64'%20height%3D'64'%20viewBox%3D'0%200%2064%2064'%20fill%3D'none'%20xmlns%3D'http%3A//www.w3.org/2000/svg'%3E%3Crect%20x%3D'4'%20y%3D'8'%20width%3D'56'%20height%3D'48'%20rx%3D'4'%20fill%3D'%23F3F4F6'%20stroke%3D'%23D1D5DB'%20stroke-width%3D'2'/%3E%3Cpath%20d%3D'M12%2044L24%2032L36%2044L44%2036L52%2044'%20stroke%3D'%239CA3AF'%20stroke-width%3D'2'%20stroke-linecap%3D'round'/%3E%3Cline%20x1%3D'16'%20y1%3D'16'%20x2%3D'48'%20y2%3D'48'%20stroke%3D'%23EF4444'%20stroke-width%3D'2'%20stroke-linecap%3D'round'/%3E%3Ccircle%20cx%3D'20'%20cy%3D'20'%20r%3D'3'%20fill%3D'%23D1D5DB'/%3E%3C/svg%3E"
                  }
                  score={show.rating?.average}
                />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
