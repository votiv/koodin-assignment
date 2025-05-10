import Image from 'next/image'

type ShowCardProps = {
  title: string
  image: string
  score: number
}

export const ShowCard = ({ title, image, score }: ShowCardProps) => (
  <div className="h-full flex flex-col shadow-md shadow-stone-800 transition-transform duration-200 ease-out hover:scale-105 hover:-translate-y-1 hover:shadow-2xl">
    <Image
      src={image}
      alt={title}
      width={500}
      height={500}
      style={{ objectFit: 'cover' }}
      placeholder="blur"
      blurDataURL="/logo.svg"
    />

    <div className="mt-auto flex justify-between p-2 flex-end">
      <span>{title}</span>
      <span>{score}</span>
    </div>
  </div>
)
