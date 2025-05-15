import { isError } from '~/app/utils'

type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export type Show = {
  id: number
  name: string
  image: {
    medium: string
    original: string
  }
  rating: {
    average: number
  }
  externals: {
    imdb: string
    thetvdb: number
    tvrage: number
  }
  genres: string[]
  summary: string
}

export type ShowsAppError = {
  code: number
  message: string
}

const fetcher = async <R>(url: string, method: Methods = 'GET') => {
  const response = await fetch(`https://api.tvmaze.com/${url}`, {
    method,
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error: ShowsAppError = {
      message: `An error occurred with code: ${response.status}`,
      code: response.status,
    }

    return error
  }

  const data: R = await response.json()

  return data
}

export const getSearch = async (query: string) => {
  const searchShows = await fetcher<{ score: number; show: Show }[]>(
    `search/shows?q=${query}`
  )

  return isError(searchShows) ? searchShows : searchShows.map(ss => ss.show)
}

export const getPaginated = async (page: number = 0) =>
  await fetcher<Show[]>(`shows?page=${page}`)

export const getShow = async (id: string) =>
  await fetcher<Show>(`lookup/shows?imdb=${id}`)
