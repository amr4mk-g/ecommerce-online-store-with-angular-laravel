export interface Product {
  id: number,
  name: string,
  category: string,
  description: string,
  price: number,
  stock: number,
  status: 'in' | 'out' | 'soon',
  image?: File
}
