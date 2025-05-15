import { ShowsAppError } from '~/app/api'

export const bruteSanitize = (str: string) => str.replace(/<[^>]*>/g, '')

export const isError = (maybeError: unknown): maybeError is ShowsAppError =>
  !maybeError ||
  (typeof maybeError === 'object' &&
    'message' in maybeError &&
    'code' in maybeError)

export const getErrorMessage = (code: number) => {
  switch (code) {
    case 404:
      return 'The requested show was not found.'
    case 500:
      return 'An internal server error occurred.'
    default:
      return 'Something unforeseen has happened.'
  }
}
