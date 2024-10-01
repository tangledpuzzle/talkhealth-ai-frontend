import RootLayout from "@/layouts/RootLayout";
import VoiceSettings from "@/components/views/VoiceSettings";
import ProfileSidebar from "@/components/views/ProfileSidebar";
import ProfileLayout from "@/layouts/ProfileLayout";

export default function Settings() {
  return (
    <RootLayout page="Profile" metadata={{ title: "Voice settings" }}>
      <ProfileSidebar activeTab="Voice settings" className="lg:flex hidden" />

      <ProfileLayout page="Voice settings">
        <VoiceSettings />
      </ProfileLayout>
    </RootLayout>
  );
}
