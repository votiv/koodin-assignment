export const bruteSanitize = (str: string) => str.replace(/<[^>]*>/g, '')
