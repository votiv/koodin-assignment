import { Suspense } from 'react'

import { getAllShows, getSearch } from '~/app/api'
import { Shows } from '~/app/components/Shows'
import { Spinner } from '~/app/components/Spinner'

type HomeProps = {
  searchParams: Promise<{ q?: string }>
}

const Home = async ({ searchParams }: HomeProps) => {
  const { q } = await searchParams

  return (
    <main className="w-full">
      <Suspense fallback={<Spinner />} key="listOfShows">
        <Shows showsPromise={q ? getSearch(q) : getAllShows()} />
      </Suspense>
    </main>
  )
}

Home.displayName = 'Home'

export default Home
