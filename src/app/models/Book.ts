export interface Book {
    _id?: string,
    title: string,
    author: string,
    dateOfPublication: string,
    pages: number,
    isbn: string,
    image: string,
    resume: string,
    borrowed?: boolean
}