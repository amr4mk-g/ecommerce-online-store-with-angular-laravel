import { Product } from "./product";

export interface Order {
    id: number,
    order_date: string,
    order_number: string,
    order_status: string,
    order_total: string,
    order_items: Product[]
}
