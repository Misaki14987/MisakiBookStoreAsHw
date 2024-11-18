import { create } from 'zustand';

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
}

interface CartState {
  cart: Book[];
  addToCart: (book: Book) => void;
  removeFromCart: (bookId: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (book) => set((state) => ({ cart: [...state.cart, book] })),
  removeFromCart: (bookId) => set((state) => ({ cart: state.cart.filter(book => book.id !== bookId) })),
  clearCart: () => set({ cart: [] }),
}));
  
export default useCartStore;