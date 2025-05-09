import Link from 'next/link'

const NotFound = () => (
  <div className="w-[calc(100vw-(--spacing(8)*2))] h-[calc(100vh-(--spacing(20)*2))] flex flex-col justify-center items-center">
    <h2>Not Found</h2>
    <p>Could not find requested resource</p>
    <Link href="/" className="underline">
      Return Home
    </Link>
  </div>
)

export default NotFound
