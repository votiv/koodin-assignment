import Link from 'next/link'

import { ShowCard } from '~/app/components/ShowCard'
import { Show } from '~/app/page'

type ShowsProps = {
  shows: Show[]
}

export const Shows = async ({ shows }: ShowsProps) =>
  shows?.map(show => (
    <Link href={`/${show.externals?.imdb}`} key={show.id}>
      <ShowCard
        title={show.name}
        image={show.image?.original ?? null}
        score={show.rating?.average}
      />
    </Link>
  ))
