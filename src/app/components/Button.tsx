'use client'

import { type ButtonHTMLAttributes, type PropsWithChildren } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = ({
  children,
  className,
  ...rest
}: PropsWithChildren<ButtonProps>) => (
  <button className={`cursor-pointer ${className}`} {...rest}>
    {children}
  </button>
)
