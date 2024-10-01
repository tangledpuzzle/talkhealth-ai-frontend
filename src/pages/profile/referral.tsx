import Referrals from "@/components/views/Referrals";
import RootLayout from "@/layouts/RootLayout";
import ProfileSidebar from "@/components/views/ProfileSidebar";
import ProfileLayout from "@/layouts/ProfileLayout";

export default function Referral() {
  return (
    <RootLayout page="Profile" metadata={{ title: "Referral" }}>
      <ProfileSidebar
        activeTab="Share with others"
        className="lg:flex hidden"
      />

      <ProfileLayout>
        <Referrals />
      </ProfileLayout>
    </RootLayout>
  );
}
