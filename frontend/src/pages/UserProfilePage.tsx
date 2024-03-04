import { Layout } from "@/layouts";
import { UserProfileForm } from "@/components";
import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";

const UserProfilePage = () => {
  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateUserLoading } = useUpdateMyUser();

  if (isGetUserLoading) {
    return <span>Loading ...</span>;
  }

  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }

  return (
    <Layout>
      <UserProfileForm
        currentUser={currentUser}
        onSave={updateUser}
        isLoading={isUpdateUserLoading}
      />
    </Layout>
  );
};

export default UserProfilePage;
