import RootLayout from "@/layouts/RootLayout";
import VoiceSettings from "@/components/views/VoiceSettings";
import ProfileSidebar from "@/components/views/ProfileSidebar";

export default function Feedback() {
  return (
    <RootLayout page="Profile" metadata={{ title: "Feedback" }}>
      <ProfileSidebar activeTab="Give feedback" className="lg:flex hidden" />

      <div className="w-full h-full hidden lg:flex">
        <VoiceSettings />
      </div>
    </RootLayout>
  );
}
