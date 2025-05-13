'use client'

import { type HTMLAttributes, type PropsWithChildren } from 'react'

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  buttonAction: () => void
}

export const Button = ({
  buttonAction,
  children,
}: PropsWithChildren<ButtonProps>) => (
  <button onClick={buttonAction} className="cursor-pointer">
    {children}
  </button>
)
