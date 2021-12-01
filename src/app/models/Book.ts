export interface Book {
    title: string,
    authors: [string],
    dateOfPublication: string,
    pages: number,
    isbn: string,
    image: string,
    resume: string,
    borrowed?: boolean
  }