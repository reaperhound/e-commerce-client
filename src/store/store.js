import { create } from "zustand";

export const useStore = create((set) => {
  return {
    cartItems: [],
    addToCartItems: (cartItem) =>
      set((state) => ({
        cartItems: [...state.cartItems, cartItem],
      })),
    removeFromCart: (cartItem) =>
      set((state) => {
        const prevState = state.cartItems;
        const updatedState = prevState.filter(
          (item) => item.user !== cartItem.user
        );
        return {
          cartItems: updatedState,
        };
      }),
    incrementCount: (cartItem) =>
      set((state) => {
        const incrementedState = state.cartItems.map((item) => {
          if (item.name === cartItem.name) {
            return { ...item, count: item.count + 1 };
          }
          return item;
        });
        return {
          cartItems: incrementedState,
        };
      }),
    decrementCount: (cartItem) =>
      set((state) => {
        let countIsOne = false;

        const deletedState = state.cartItems.filter(item => {
          if(cartItem.name === item.name){
            if(item.count === 1){
              countIsOne = true;
              return false;
            }
          }

          return true;
        })

        const decrementedState = state.cartItems.map((item) => {
          if (cartItem.name === item.name) {
            //` only if the sent cartItem.name and item.name inside the store match do this code
            return { ...item, count: item.count - 1 };
          }

          return item; //` otherwise return the object unmutated
        });

        if (!countIsOne) {
          return {
            cartItems: decrementedState,
          };
        } else {
          return {
            cartItems: deletedState,
          }
        }
      }),
  };
});
