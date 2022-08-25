export interface Product {
  id: number,
  title: string,
  category: Category,
  description: string,
  createdBy: CreatedBy,
  image?: string,
  price: number,
  createdAt: string,
  updatedAt: string
}
export interface Category {
  name: string,
  slug: string
}

export interface CreatedBy {
  role: string,
  name: string
}
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

export interface ProductSelectionNew {
  id: number,
  name: string,
  images: string,
  price: number,
  quantity: number,
};
