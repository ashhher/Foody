import { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetRestaurant } from "@/api/RestaurantApi";
import { Layout } from "@/layouts";
import {
  AspectRatio,
  CheckoutCard,
  MenuItemCard,
  RestaurantInfoCard,
} from "@/components";
import { MenuItem, CartItem } from "@/types";
import { UserFormData } from "@/components/forms/user-profile-form/UserProfileForm";
import { updateCartSession } from "@/utils";

const RestaurantPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  // const { createCheckoutSession, isLoading: isCheckoutLoading } =
  //   useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // init cart from session storage
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItem) => {
    setCartItems((prevCartItems) => {
      // 1. check if exist
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );

      let updatedCartItems;

      // 2.1. if exist, update quantity
      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // 2.2 if not exist, add cart item
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      // 3. update cart items to session storage
      updateCartSession(restaurantId, updatedCartItems);

      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );

      // update cart items to session storage
      updateCartSession(restaurantId, updatedCartItems);

      return updatedCartItems;
    });
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }

    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    console.log(checkoutData);

    //   const data = await createCheckoutSession(checkoutData);
    //   window.location.href = data.url;
  };

  if (isLoading || !restaurant) {
    return "Loading...";
  }

  return (
    <Layout>
      <div className="flex flex-col gap-10">
        {/* Restaurant Image */}
        <AspectRatio ratio={16 / 5}>
          <img
            src={restaurant.imageUrl}
            className="rounded-md object-cover h-full w-full"
          />
        </AspectRatio>
        <div className="grid md:grid-cols-[4fr_2fr] gap-5 lg:px-32">
          <div className="flex flex-col gap-4">
            {/* Restaurant Info */}
            <RestaurantInfoCard restaurant={restaurant} />

            {/* Menu */}
            <span className="text-2xl font-bold tracking-tight">Menu</span>
            {restaurant.menuItems.map((menuItem) => (
              <MenuItemCard
                menuItem={menuItem}
                addToCart={() => {
                  addToCart(menuItem);
                }}
              />
            ))}
          </div>

          <div>
            <CheckoutCard
              restaurant={restaurant}
              cartItems={cartItems}
              isCheckoutLoading={false}
              removeFromCart={removeFromCart}
              handleCheckout={onCheckout}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RestaurantPage;
