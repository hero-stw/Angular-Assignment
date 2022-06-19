import { BookInCart } from 'src/app/types/Book';
export type Order = {
    _id?: string | undefined,
    products: BookInCart[],
    price: number,
    status: string,
    shippingInfo: {
        fullname: string,
        address: string,
        phoneNumber: string,
        email: string,
        note: string
    }

}