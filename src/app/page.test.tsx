import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import Home from './page'
import { mockShow } from '~/app/mocks/showMock'
import * as api from './api'

vi.mock('./api', () => ({
  getAllShows: () => Promise.resolve([mockShow]),
  getShow: () => Promise.resolve(mockShow),
  getSearch: () => Promise.resolve([mockShow]),
}))

describe('Home', () => {
  it('renders each genre as a category', async () => {
    render(<Home searchParams={Promise.resolve({})} />)

    waitFor(async () => {
      const main = await screen.findByRole('main')
      expect(main).toBeDefined()
    })

    waitFor(async () => {
      const categoryHeading = await screen.findAllByRole('heading', {
        level: 2,
      })
      expect(categoryHeading).toHaveLength(3)
    })
  })

  it('called the correct endpoint', async () => {
    render(<Home searchParams={Promise.resolve({ q: 'show' })} />)
    const showSpy = vi.spyOn(api, 'getSearch')

    waitFor(async () => {
      expect(showSpy).toHaveBeenCalled()
    })
  })
})
