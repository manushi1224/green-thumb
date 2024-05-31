import ChatGemini from "./components/ChatGemini";
import GreenThumbHeader from "./components/GreenThumbHeader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-20 md:px-24">
      <GreenThumbHeader />
      <ChatGemini />
    </main>
  );
}
