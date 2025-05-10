import Link from 'next/link'

import { ShowCard } from '~/app/components/ShowCard'
import { Show } from '~/app/page'

type ShowsProps = {
  shows: Show[]
}

export const Shows = async ({ shows }: ShowsProps) => (
  <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {shows?.map(show => (
      <Link href={`/${show.externals?.imdb}`} key={show.id}>
        <ShowCard
          title={show.name}
          image={show.image?.original ?? null}
          score={show.rating?.average}
        />
      </Link>
    ))}
  </div>
)
