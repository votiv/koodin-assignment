import { Suspense } from 'react'

import { getPaginated, getSearch } from '~/app/api'
import { Shows } from '~/app/components/Shows'
import { Spinner } from '~/app/components/Spinner'

type HomeProps = {
  searchParams: Promise<{ q?: string }>
}

const Home = async ({ searchParams }: HomeProps) => {
  const { q } = await searchParams

  return (
    <div className="flex flex-col items-center justify-items-center gap-8">
      <main className="w-full">
        <Suspense fallback={<Spinner />} key="listOfShows">
          <Shows showsPromise={q ? getSearch(q) : getPaginated()} />
        </Suspense>
      </main>
    </div>
  )
}

export default Home
