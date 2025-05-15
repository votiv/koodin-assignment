'use client'

import { motion } from 'motion/react'

export const Spinner = () => (
  <div className="flex justify-center items-center p-[40px] rounded-8">
    <motion.div
      className="w-[50px] h-[50px] rounded-full border-4 border-[var(--color-white)] border-t-[var(--color-blue)] will-change-transform "
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  </div>
)
