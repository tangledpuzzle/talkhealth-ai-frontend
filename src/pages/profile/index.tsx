import Chat from "@/layouts/Chat";
import RootLayout from "@/layouts/RootLayout";
import ProfileSidebar from "@/components/views/ProfileSidebarMain";

export default function Profile() {
  return (
    <RootLayout page="Profile">
      <ProfileSidebar />

      <div className="w-full h-full hidden lg:flex">
        <Chat />
      </div>
    </RootLayout>
  );
}
