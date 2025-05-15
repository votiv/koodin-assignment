'use client'

import { type HTMLAttributes, type PropsWithChildren } from 'react'

export const Button = ({
  children,
  ...rest
}: PropsWithChildren<HTMLAttributes<HTMLButtonElement>>) => (
  <button {...rest} className="cursor-pointer">
    {children}
  </button>
)
