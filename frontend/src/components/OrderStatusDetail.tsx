import { Badge, Separator } from ".";
import { Order } from "@/types";

type Props = {
  order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
  console.log(order.totalAmount);
  return (
    <div className="space-y-5">
      <div className="flex flex-col ">
        <span className="font-bold mb-2">Delivering to:</span>
        <span>{order.deliveryDetails.name}</span>
        <span>
          {order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
        </span>
      </div>
      <div className="flex flex-col">
        <span className="font-bold mb-2">Your Order</span>
        <ul>
          {order.cartItems.map((item) => (
            <li className="space-x-1">
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              <span> {item.name}</span>
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="flex flex-col">
        <span className="font-bold mb-2">Total</span>
        <span>${(order.totalAmount / 100).toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderStatusDetail;
