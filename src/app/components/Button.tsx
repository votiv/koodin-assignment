'use client'

import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react'

export const Button = ({
  children,
  className,
  ...rest
}: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) => (
  <button className={`cursor-pointer ${className}`} {...rest}>
    {children}
  </button>
)
