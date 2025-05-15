import Image from 'next/image'

import { bruteSanitize, getErrorMessage, isError } from '~/app/utils'
import { getShow } from '~/app/api'

type ShowDetailsProps = {
  params: Promise<{ slug: string }>
}

const ShowDetails = async ({ params }: ShowDetailsProps) => {
  const { slug } = await params
  const show = await getShow(slug)

  if (isError(show)) {
    throw new Error(getErrorMessage(show.code))
  }

  return (
    <div className="w-full flex flex-col md:flex-row gap-16">
      <div className="text-center flex-1 md:text-right">
        <h1 className="text-6xl font-bold mb-4">{show.name}</h1>

        <h5>{show.genres.join(', ')}</h5>

        <p className="text-2xl mt-4">{bruteSanitize(show.summary)}</p>
      </div>

      <div className="flex-1 m-auto md:m-0">
        <Image
          src={show.image?.original ?? null}
          alt={show.name}
          width={500}
          height={300}
        />
      </div>
    </div>
  )
}

export default ShowDetails
