import Chat from "@/layouts/Chat";
import RootLayout from "@/layouts/RootLayout";
import HistorySidebar from "@/components/views/HistorySidebar";
export default function History() {
  
  return (
    <RootLayout page="History">
      <HistorySidebar activeChat="chatId" />

      <div className="w-full h-full hidden lg:flex">
        <Chat />
      </div>
    </RootLayout>
  );
}
