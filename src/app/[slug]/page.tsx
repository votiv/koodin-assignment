import Image from 'next/image'
import { notFound } from 'next/navigation'

import { Show } from '~/app/page'
import { bruteSanitize } from '~/app/utils'

type ShowDetailsProps = {
  params: Promise<{ slug: string }>
}

const ShowDetails = async ({ params }: ShowDetailsProps) => {
  const { slug } = await params

  const response = await fetch(
    `https://api.tvmaze.com/lookup/shows?imdb=${slug}`,
    {
      method: 'GET',
    }
  )

  if (!response.ok) {
    notFound()
  }

  const show: Show = await response.json()

  return (
    <div className="w-full flex flex-col md:flex-row gap-16">
      <div className="flex-1 text-center md:text-right">
        <h1 className="text-6xl font-bold mb-4">{show.name}</h1>

        <h5>{show.genres.join(', ')}</h5>

        <p className="text-2xl mt-4">{bruteSanitize(show.summary)}</p>
      </div>
      <div className="flex-1 m-auto md:m-0">
        <Image
          src={show.image?.original ?? null}
          alt={show.name}
          width={1000}
          height={300}
        />
      </div>
    </div>
  )
}

export default ShowDetails
