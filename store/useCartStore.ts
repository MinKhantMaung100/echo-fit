import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
//   image?: string;
// }
interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity?: number;
    image?: string;
    size: number;
}

interface CartState {
    items: CartItem[],
    addItem: (item: CartItem) => void;
    getTotal: () => number;
}

// interface CartState {
//   items: CartItem[];
//   addItem: (item: CartItem) => void;
//   removeItem: (itemId: string) => void;
//   updateQuantity: (itemId: string, quantity: number) => void;
//   clearCart: () => void;
//   getTotal: () => number;
// }

export const useCartStore = create()(
    persist((set, get) => ({
        items: [],

        addItem: (item: CartItem) => set((state: CartState) => {
            const existingItem = state.items.find((i: any) => i.id === item.id);
            if (existingItem) {
                // If item exists, update quantity
                return {
                    items: state.items.map((cartItem: CartItem) =>
                        cartItem.id === item.id
                            ? { ...cartItem, quantity: cartItem.quantity! + 1 }
                            : cartItem
                    )
                };
            } else {
                // If item doesn't exist, add it with quantity 1
                return {
                    items: [...state.items, { ...item, quantity: 1 }]
                };
            }
        }),
        decreaseItem: (id: string) => set((state: CartState) => {
            const existingItem = state.items.find((i: CartItem) => i.id === id);
            
            if (!existingItem) {
                // Item doesn't exist in cart, do nothing
                return state;
            }
            
            if (existingItem.quantity === 1) {
                // If quantity is 1, remove the item from cart
                return {
                    items: state.items,
                };
            } else {
                // If quantity is greater than 1, decrease it by 1
                return {
                    items: state.items.map((cartItem: CartItem) =>
                        cartItem.id === id
                            ? { ...cartItem, quantity: cartItem.quantity! - 1 }
                            : cartItem
                    )
                };
            }
        }),
        removeItem: (id:string) => set((state: CartState) => {
            const existingItem = state.items.find((i: CartItem) => i.id === id);
            if (!existingItem) {
                // Item doesn't exist in cart, do nothing
                return state;
            }else {
                return {items: state.items.filter((cartItem: CartItem) => cartItem.id !== id)}

            }

        }),
        getItems: () => {
            return get().items;

        },
        getCartItem: (itemId: string) => {
            return get().items.some((item) => item.id === itemId);

        },
        getTotal: () => {
            return get().items.reduce((total, item) => total +  item.quantity, 0)
        },
        getTotalPrice: () => {
            return get().items.reduce((total, item) => {
                return total + (item.price * (item.quantity || 0));
            }, 0);
        }
    }), {
        name: 'shopping-cart',
        storage: createJSONStorage(() => localStorage),
    })
);

