import { Layout } from "@/layouts";
import {
  ManageRestaurantForm,
  OrderItemCard,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components";
import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";

const ManageRestaurantPage = () => {
  const { restaurant } = useGetMyRestaurant();
  const { createRestaurant, isLoading: isCreateRestaurantLoading } =
    useCreateMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateRestaurantLoading } =
    useUpdateMyRestaurant();
  const { orders, isLoading: isGetMyRestaurantOrdersLoading } =
    useGetMyRestaurantOrders();
  const isEditing = !!restaurant;

  return (
    <Layout>
      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="manage-restaurant">Manage Restaurant</TabsTrigger>
        </TabsList>
        <TabsContent
          value="orders"
          className="space-y-5 bg-gray-50 p-10 rounded-lg"
        >
          {isGetMyRestaurantOrdersLoading && "loading"}
          <h2 className="text-2xl font-bold">Order Number: {orders?.length}</h2>
          {orders?.map((order) => (
            <OrderItemCard order={order} />
          ))}
        </TabsContent>
        <TabsContent value="manage-restaurant">
          <ManageRestaurantForm
            restaurant={restaurant}
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isCreateRestaurantLoading || isUpdateRestaurantLoading}
          />
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default ManageRestaurantPage;
