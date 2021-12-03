export interface BookUser {
    _id?: string,
    bookId: string,
    userId: string,
    loadDate: string,
    expectedDeliveryDate: string,
    actualDeliveryDate: string,
    timestamps: boolean
}