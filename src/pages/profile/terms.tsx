import ProfileLayout from "@/layouts/ProfileLayout";
import RootLayout from "@/layouts/RootLayout";
import ProfileSidebar from "@/components/views/ProfileSidebar";
import TermsOfService from "@/components/views/TermsOfService";

export default function Terms() {
  return (
    <RootLayout page="Profile" metadata={{ title: "Terms of service" }}>
      <ProfileSidebar activeTab="Terms of service" className="lg:flex hidden" />

      <ProfileLayout page="Terms of service">
        <TermsOfService />
      </ProfileLayout>
    </RootLayout>
  );
}
