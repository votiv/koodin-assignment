import { Show } from '~/app/page'

export const fetchSearch = async (query: string) => {
  const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`)

  if (!response.ok) {
    return undefined
  }

  const searchShows: { score: number; show: Show }[] = await response.json()

  return searchShows.map(ss => ss.show)
}

export const fetchPaginated = async (page: number = 0) => {
  const response = await fetch(`https://api.tvmaze.com/shows?page=${page}`, {
    method: 'GET',
  })

  if (!response.ok) {
    return undefined
  }

  const paginatedShows: Show[] = await response.json()

  return paginatedShows
}
