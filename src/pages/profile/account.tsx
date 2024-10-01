import RootLayout from "@/layouts/RootLayout";
import UserAccount from "@/components/views/UserAccount";
import ProfileSidebar from "@/components/views/ProfileSidebar";
import ProfileLayout from "@/layouts/ProfileLayout";

export default function Account() {
  return (
    <RootLayout page="Profile" metadata={{ title: "Account" }}>
      <ProfileSidebar activeTab="Account" className="lg:flex hidden" />

      <ProfileLayout page="Account">
        <UserAccount />
      </ProfileLayout>
    </RootLayout>
  );
}
