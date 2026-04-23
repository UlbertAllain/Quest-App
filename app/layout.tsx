import type { Metadata } from "next";
import { QuestProvider } from "@/lib/QuestContext";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "QuestApp",
  description: "Gamified task manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QuestProvider>{children}</QuestProvider>
      </body>
    </html>
  );
}