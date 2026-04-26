import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface CartItem {
    id: string
    slug: string
    name: string
    price: number
    currency: string
    billingCycle: string
    quantity: number
    coverImage?: string
}

interface CartStore {
    items: CartItem[]
    isOpen: boolean
    addItem: (item: CartItem) => void
    removeItem: (id: string) => void
    updateQty: (id: string, quantity: number) => void
    clearCart: () => void
    openCart: () => void
    closeCart: () => void
}

export const useCart = create<CartStore>()(
    persist(
        (set) => ({
            items: [],
            isOpen: false,

            addItem: (item) =>
                set((state) => {
                    const exists = state.items.find((i) => i.id === item.id)
                    if (exists) {
                        return {
                            items: state.items.map((i) =>
                                i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                            ),
                            isOpen: true,
                        }
                    }
                    return { items: [...state.items, item], isOpen: true }
                }),

            removeItem: (id) =>
                set((state) => ({
                    items: state.items.filter((i) => i.id !== id),
                })),

            updateQty: (id, quantity) =>
                set((state) => ({
                    items: state.items.map((i) =>
                        i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i
                    ),
                })),

            clearCart: () => set({ items: [] }),
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
        }),
        {
            name: "etihad-cart",
            storage: createJSONStorage(() => localStorage),
        }
    )
)

export const useCartTotals = () => {
    const items = useCart((state) => state.items)
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const vat = Math.round(subtotal * 0.15 * 100) / 100
    const total = subtotal + vat
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

    return { subtotal, vat, total, itemCount }
}
