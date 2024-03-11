import { Progress } from ".";
import { Order } from "@/types";
import { ORDER_STATUS } from "@/config";

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  const getExpectedDelivery = () => {
    const expectedDeliveryTime = new Date(order.createdAt);

    expectedDeliveryTime.setMinutes(
      expectedDeliveryTime.getMinutes() + order.restaurant.estimatedDeliveryTime
    );

    const hours = expectedDeliveryTime.getHours();
    const minutes = expectedDeliveryTime.getMinutes();

    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  const orderStatusInfo =
    ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0];

  return (
    <>
      <h1 className="text-xl font-bold flex flex-col gap-5 md:flex-row md:justify-between">
        <span> Order Status: {orderStatusInfo.label}</span>
        <span> Expected by {getExpectedDelivery()}</span>
      </h1>
      <Progress
        className={orderStatusInfo.progressValue > 0 ? "animate-pulse" : ""}
        value={orderStatusInfo.progressValue}
      />
    </>
  );
};

export default OrderStatusHeader;
