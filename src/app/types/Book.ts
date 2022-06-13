export type Book = {
    _id: string,
    title: string,
    price: number,
    description: string,
    img: string,
    category: string ,
    sale_price: number ,
    status: number,
    quantity?: number
}

export type BookInCart = {
    _id: string,
    title: string,
    price: number,
    description: string,
    img: string,
    category: string,
    sale_price: number,
    status: number,
    quantity: number,
}