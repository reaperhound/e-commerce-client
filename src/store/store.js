import { create } from "zustand";

export const useStore = create((set) => {
  // Load cartItems from localStorage if available
  const initialCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  // Save the initial cartItems to localStorage if not already present
  if (!localStorage.getItem("cartItems")) {
    localStorage.setItem("cartItems", JSON.stringify(initialCartItems));
  }
  
  return {
    cartItems: initialCartItems,
    addToCartItems: (cartItem) =>
      set((state) => {
        const updatedCartItems = [...state.cartItems, cartItem];
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        return { cartItems: updatedCartItems };
      }),
    removeFromCart: (cartItem) =>
      set((state) => {
        const updatedState = state.cartItems.filter(
          (item) => item._id !== cartItem._id
        );
        localStorage.setItem("cartItems", JSON.stringify(updatedState));
        return { cartItems: updatedState };
      }),
    incrementCount: (cartItem) =>
      set((state) => {
        const incrementedState = state.cartItems.map((item) => {
          if (item._id === cartItem._id) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        });
        localStorage.setItem("cartItems", JSON.stringify(incrementedState));
        return { cartItems: incrementedState };
      }),
    decrementCount: (cartItem) =>
      set((state) => {
        let countIsOne = false;

        const deletedState = state.cartItems.filter((item) => {
          if (cartItem._id === item._id) {
            if (item.count === 1) {
              countIsOne = true;
              return false;
            }
          }
          return true;
        });

        const decrementedState = state.cartItems.map((item) => {
          if (cartItem._id === item._id) {
            return { ...item, count: item.count - 1 };
          }
          return item;
        });

        if (!countIsOne) {
          localStorage.setItem(
            "cartItems",
            JSON.stringify(decrementedState)
          );
          return { cartItems: decrementedState };
        } else {
          localStorage.setItem("cartItems", JSON.stringify(deletedState));
          return { cartItems: deletedState };
        }
      }),
  };
});
