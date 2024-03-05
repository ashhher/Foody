import { Layout } from "@/layouts";
import { ManageRestaurantForm } from "@/components";
import { useCreateMyRestaurant } from "@/api/MyRestaurantApi";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading } = useCreateMyRestaurant();

  return (
    <Layout>
      <ManageRestaurantForm onSave={createRestaurant} isLoading={isLoading} />
    </Layout>
  );
};

export default ManageRestaurantPage;
