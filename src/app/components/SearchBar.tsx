'use client'

import { type FormEvent } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'

import { Button } from '~/app/components/Button'

export const SearchBar = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams)
  const initialSearch = params.get('q') ?? ''

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const value = formData.get('showSearch')

    if (value) {
      params.set('q', String(value))
      router.push(`${pathname}?${params.toString()}`)
    } else {
      params.delete('q')
    }
  }

  const handleClear = () => {
    const params = new URLSearchParams(searchParams)
    params.delete('q')
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="flex gap-4">
      <div className="relative flex">
        <input
          name="showSearch"
          className="outline-1 rounded-sm p-2 pr-10"
          placeholder="Search shows by name 🔍"
          defaultValue={initialSearch}
        />

        {initialSearch && (
          <Button
            type="reset"
            className="absolute top-1/2 -translate-y-1/2 right-4"
            onClick={handleClear}
            disabled={!initialSearch}
          >
            <Image src="/clear.svg" alt="clear" width={24} height={24} />
          </Button>
        )}
      </div>

      <Button
        type="submit"
        className="border-2 border-[var(--color-gold)] rounded-sm p-4"
      >
        Search
      </Button>
    </form>
  )
}
