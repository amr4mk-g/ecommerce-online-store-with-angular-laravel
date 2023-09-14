import { CartItem } from "./cartItem"

export interface Cart {
    quantity: number,
    product: CartItem
}
