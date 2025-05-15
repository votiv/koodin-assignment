'use client'

import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { use } from 'react'

import { ShowCard } from '~/app/components/ShowCard'
import { type Show, type ShowsAppError } from '~/app/api'
import { getErrorMessage, isError } from '~/app/utils'

type ShowsProps = {
  showsPromise: Promise<Show[] | ShowsAppError>
}

export const Shows = ({ showsPromise }: ShowsProps) => {
  const shows = use(showsPromise)
  if (isError(shows)) {
    const errorMessage = getErrorMessage(shows.code)
    toast.error(errorMessage)
    throw new Error(errorMessage)
  }

  return (
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
}
