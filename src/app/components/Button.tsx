'use client'

import { type PropsWithChildren } from 'react'

type ButtonProps = {
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
