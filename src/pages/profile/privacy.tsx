import RootLayout from "@/layouts/RootLayout";
import PrivacyPolicy from "@/components/views/PrivacyPolicy";
import ProfileSidebar from "@/components/views/ProfileSidebar";
import ProfileLayout from "@/layouts/ProfileLayout";

export default function Privacy() {
  return (
    <RootLayout page="Profile" metadata={{ title: "Privacy policy" }}>
      <ProfileSidebar activeTab="Privacy policy" className="lg:flex hidden" />

      <ProfileLayout page="Privacy policy">
        <PrivacyPolicy />
      </ProfileLayout>
    </RootLayout>
  );
}
