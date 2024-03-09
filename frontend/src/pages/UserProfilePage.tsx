import { Layout } from "@/layouts";
import { UserProfileForm } from "@/components";
import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";

const UserProfilePage = () => {
  const { user, isLoading: isGetUserLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateUserLoading } = useUpdateMyUser();

  if (isGetUserLoading) {
    return <span>Loading ...</span>;
  }

  if (!user) {
    return <span>Unable to load user profile</span>;
  }

  return (
    <Layout>
      <UserProfileForm
        currentUser={user}
        isLoading={isUpdateUserLoading}
        title={"User Profile Form"}
        buttonText={"Submit"}
        onSave={updateUser}
      />
    </Layout>
  );
};

export default UserProfilePage;
