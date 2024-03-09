import { Restaurant, CartItem } from "@/types";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CheckoutButton,
  CheckoutItem,
  Separator,
} from ".";
import { UserFormData } from "./forms/user-profile-form/UserProfileForm";

type Props = {
  restaurant: Restaurant;
  cartItems: CartItem[];
  isCheckoutLoading: boolean;
  removeFromCart: (cartItem: CartItem) => void;
  handleCheckout: (userFormData: UserFormData) => void;
};

const CheckoutCard = ({
  restaurant,
  cartItems,
  isCheckoutLoading,
  removeFromCart,
  handleCheckout,
}: Props) => {
  const getTotalCost = () => {
    const totalInPence = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalWithDelivery = totalInPence + restaurant.deliveryPrice;

    return (totalWithDelivery / 100).toFixed(2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>${getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item) => (
          <CheckoutItem cartItem={item} handleRemove={removeFromCart} />
        ))}
        <Separator />
        {/* Delivery Price */}
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
      <CardFooter>
        <CheckoutButton
          disabled={cartItems.length === 0}
          onCheckout={handleCheckout}
          isLoading={isCheckoutLoading}
        />
      </CardFooter>
    </Card>
  );
};

export default CheckoutCard;
