import { create } from "zustand";

export const useStore = create((set) => {
  return {
    cartItems: [],
    addToCartItems: (cartItem) => set((state) => ({
        cartItems: [...state.cartItems, cartItem]
    })),
    removeFromCart: (cartItem) => set((state) => {
        const prevState = state.cartItems
        const updatedState = prevState.filter(item => item.user!== cartItem.user)
        return {
            cartItems: updatedState
        } 
    })
  };
});

