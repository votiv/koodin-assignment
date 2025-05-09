'use client'

import { ChangeEvent } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import debounce from 'lodash.debounce'

export const SearchBar = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const params = new URLSearchParams(searchParams)

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value

    if (value) {
      params.set('q', value)
    } else {
      params.delete('q')
    }

    router.replace(`${pathname}?${params.toString()}`)
  }

  const debouncedSearch = debounce(handleSearch, 200)

  return (
    <div>
      <label htmlFor="showSearch" className="mr-4">
        Search
      </label>
      <input
        id="showSearch"
        className="outline-1 rounded-sm p-2 placeholder:text-right"
        placeholder="🔍"
        onChange={debouncedSearch}
      />
    </div>
  )
}
