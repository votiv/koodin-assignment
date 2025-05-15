'use client'

type ErrorProps = {
  error: Error
}

const Error = ({ error }: ErrorProps) => {
  return (
    <div className="absolute top-1/2 left-1/2 right-auto bottom-auto -translate-1/2">
      {error.message}
    </div>
  )
}

export default Error
