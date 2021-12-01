export interface Book {
    title: string,
    author: string,
    dateOfPublication: string,
    pages: number,
    isbn: string,
    image: string,
    resume: string,
    borrowed?: boolean
}