import { Layout } from "@/layouts";
import { ManageRestaurantForm } from "@/components";
import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
} from "@/api/MyRestaurantApi";

const ManageRestaurantPage = () => {
  const { restaurant } = useGetMyRestaurant();
  const { createRestaurant, isLoading: isCreateRestaurantLoading } =
    useCreateMyRestaurant();

  return (
    <Layout>
      <ManageRestaurantForm
        restaurant={restaurant}
        onSave={createRestaurant}
        isLoading={isCreateRestaurantLoading}
      />
    </Layout>
  );
};

export default ManageRestaurantPage;
