import { Layout } from "@/layouts";
import { ManageRestaurantForm } from "@/components";
import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";

const ManageRestaurantPage = () => {
  const { restaurant } = useGetMyRestaurant();
  const { createRestaurant, isLoading: isCreateRestaurantLoading } =
    useCreateMyRestaurant();
  const { updateRestaurant, isLoading: isUpdateRestaurantLoading } =
    useUpdateMyRestaurant();

  const isEditing = !!restaurant;

  return (
    <Layout>
      <ManageRestaurantForm
        restaurant={restaurant}
        onSave={isEditing ? updateRestaurant : createRestaurant}
        isLoading={isCreateRestaurantLoading || isUpdateRestaurantLoading}
      />
    </Layout>
  );
};

export default ManageRestaurantPage;
