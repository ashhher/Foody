import { CartItem } from "@/types";

export const updateCartSession = (
  restaurantId: string | undefined,
  updatedCartItems: CartItem[]
) => {
  sessionStorage.setItem(
    `cartItems-${restaurantId}`,
    JSON.stringify(updatedCartItems)
  );
};
