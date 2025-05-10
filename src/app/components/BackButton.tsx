'use client'

import { redirect } from 'next/navigation'

export const BackButton = () => {
  const goBack = () => redirect('/')

  return (
    <button onClick={goBack} className="cursor-pointer">
      Back
    </button>
  )
}
