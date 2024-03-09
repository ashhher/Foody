import { CartItem } from "@/types";
import { Trash } from "lucide-react";
import { Badge } from ".";

type CheckoutItemType = {
  cartItem: CartItem;
  handleRemove: (cartItem: CartItem) => void;
};

const CheckoutItem = ({ cartItem, handleRemove }: CheckoutItemType) => {
  return (
    <div className="flex justify-between">
      {/* Quantity */}
      <span>
        <Badge variant="outline" className="mr-2">
          {cartItem.quantity}
        </Badge>
        {cartItem.name}
      </span>
      {/* Cart Itme Price */}
      <span className="flex items-center gap-1">
        ${((cartItem.price * cartItem.quantity) / 100).toFixed(2)}
        <Trash
          className="cursor-pointer"
          color="red"
          size={20}
          onClick={() => handleRemove(cartItem)}
        />
      </span>
    </div>
  );
};

export default CheckoutItem;
