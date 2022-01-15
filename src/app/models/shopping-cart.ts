export interface Product {
  id: number,
  name: string,
  description: string,
  defaultImage: string,
  images: string[],
  price: number,
  discount: number,
};

export interface User {
  id: number,
  name: {
      firstName: string,
      lastName: string,
  }
  phone: string,
  avatar: string,
  email: string,
  address: {
      country: string,
      city: string,
      zip: string,
      street: string,
  },
  orders: {
      id: number,
      products: ProductSelection[],
  },
  role: 'ADMIN' | 'CUSTOMER' // Role is based on i % 2
};

export interface Cart {
  id: number, // User id
  products: ProductSelection[],
}

export interface ProductSelection {
  id: number,
  quantity: number
}
