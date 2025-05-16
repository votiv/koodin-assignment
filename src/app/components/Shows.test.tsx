import { Suspense } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { Shows } from '~/app/components/Shows'
import { mockShow } from '~/app/mocks/showMock'
import { AppRouterContextProviderMock } from '~/app/mocks/AppRouterProviderMock'

describe('Shows', () => {
  const user = userEvent.setup()
  const mockShowsPromise = Promise.resolve([mockShow])
  const push = vi.fn()

  it('renders the Shows component', async () => {
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <Suspense>
          <Shows showsPromise={mockShowsPromise} />
        </Suspense>
      </AppRouterContextProviderMock>
    )

    waitFor(async () => {
      const showsContainer = await screen.findByRole('section')
      expect(showsContainer).toBeDefined()
    })
  })

  it('navigates to the show page', async () => {
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <Suspense>
          <Shows showsPromise={mockShowsPromise} />
        </Suspense>
      </AppRouterContextProviderMock>
    )

    const links = await screen.findAllByTestId('showLink')
    await user.click(links[0])

    waitFor(async () => {
      const showTitle = await screen.findByRole('heading', { level: 1 })
      expect(showTitle).toBeDefined()
    })
  })
})
