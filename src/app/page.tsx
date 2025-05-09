import { ShowCard } from '~/app/components/ShowCard'

type Show = {
  id: number
  name: string
  image: {
    medium: string
    original: string
  }
  rating: {
    average: number
  }
}

const Home = async () => {
  const response = await fetch('https://api.tvmaze.com/shows?page=0', {
    method: 'GET',
  })

  const shows = await response.json()

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full p-4 border-b-2 border-[var(--color-gold)]">
        will search
      </div>
      <main className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {shows.map((show: Show) => (
          <ShowCard
            key={show.id}
            title={show.name}
            image={show.image.original}
            score={show.rating.average}
          />
        ))}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  )
}

export default Home
