import { create } from 'zustand'

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    const { name, price, image } = newProduct
    if (!name || !price || !image) {
      return { success: false, message: 'Please fill up all the fields' }
    }

    const res = await fetch('api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    })

    const data = await res.json()
    set((state) => ({ products: [...state.products, data.data] }))
    return { success: true, message: 'Product created' }
  },
  fetchProducts: async () => {
    const res = await fetch('api/products')
    const data = await res.json()
    set({ products: data.data })
  },
  deleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    })
    const { success, message } = await res.json()
    if (!success) return { success: false, message: message }
    set((state) => ({
      products: state.products.filter(({ _id }) => _id != id),
    }))
    return { success: true, message: message }
  },
  updateProduct: async (id, updateProduct) => {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateProduct),
    })
    const data = await res.json()
    if (!data.success) return { success: false, message: data.message }
    set((state) => ({
      products: state.products.map((product) =>
        product._id == id ? data.data : product
      ),
    }))
    return { success: true, message: 'Product updated' }
  },
}))
