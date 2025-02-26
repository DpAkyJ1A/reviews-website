import { create } from "zustand";
import { persist } from "zustand/middleware";

import { ICartItem } from "@/types/cart.types";
import { IGood } from "@/types/good.types";

type CartState = {
  cart: ICartItem[];
  totalPrice: string;
  goods: IGood[];
  addToCart: (item: ICartItem) => void;
  removeFromCart: (id: string, optionIndex?: number) => void;
  clearCart: () => void;
  updateTotalPrice: () => void;
  setGoods: (list: IGood[]) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      totalPrice: "0",
      goods: [],

      updateTotalPrice: () => {
        const total = get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        set({ totalPrice: new Intl.NumberFormat("en-US").format(total) });
      },

      addToCart: (item) => {
        const existingCart = get().cart;

        // Check if the same item already exists in the cart
        const existingItemIndex = existingCart.findIndex(
          (i) => i.id === item.id && i.optionIndex === item.optionIndex
        );

        let updatedCart;

        if (item.optionIndex === undefined || item.optionIndex === 0) {
          // If optionIndex is not specified or equals 0, add the item as a new one
          updatedCart = [...existingCart, item];
        } else if (existingItemIndex !== -1) {
          // If the item with the same id and optionIndex exists, increase its quantity
          updatedCart = existingCart.map((i, index) =>
            index === existingItemIndex ? { ...i, quantity: i.quantity + item.quantity } : i
          );
        } else {
          // Otherwise, add it as a new item
          updatedCart = [...existingCart, item];
        }

        set({ cart: updatedCart });
        get().updateTotalPrice();
      },

      removeFromCart: (id, optionIndex) => {
        set((state) => ({
          cart: state.cart.filter((item) => !(item.id === id && item.optionIndex === optionIndex))
        }));
        get().updateTotalPrice();
      },

      clearCart: () => {
        set({ cart: [], totalPrice: "0" });
      },

      setGoods: (list) => {
        set({ goods: list })
      }
    }),
    { name: "cart-storage" } // Save cart in localStorage
  )
);
