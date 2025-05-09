import { SyntheticEvent } from 'react'
import Image from 'next/image'

type ShowCardProps = {
  title: string
  image: string
  score: number
}

export const ShowCard = ({ title, image, score }: ShowCardProps) => (
  <div className="flex flex-col justify-between gap-4 shadow-md transition-transform duration-200 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
    <Image src={image} alt={title} width={500} height={500} />

    <div className="flex justify-between p-2">
      <span>{title}</span>
      <span>{score}</span>
    </div>
  </div>
)
