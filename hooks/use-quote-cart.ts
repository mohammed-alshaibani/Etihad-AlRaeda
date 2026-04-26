import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

export interface QuoteItem {
    id: string
    slug: string
    name: string
    quantity: number
    notes?: string
    coverImage?: string
}

interface QuoteCartStore {
    items: QuoteItem[]
    isOpen: boolean
    addItem: (item: QuoteItem) => void
    removeItem: (id: string) => void
    updateQty: (id: string, quantity: number) => void
    updateNotes: (id: string, notes: string) => void
    clearQuote: () => void
    openQuote: () => void
    closeQuote: () => void
}

export const useQuoteCart = create<QuoteCartStore>()(
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

            updateNotes: (id, notes) =>
                set((state) => ({
                    items: state.items.map((i) =>
                        i.id === id ? { ...i, notes } : i
                    ),
                })),

            clearQuote: () => set({ items: [] }),
            openQuote: () => set({ isOpen: true }),
            closeQuote: () => set({ isOpen: false }),
        }),
        {
            name: "etihad-quote-cart",
            storage: createJSONStorage(() => localStorage),
        }
    )
)
