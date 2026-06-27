import type { Metadata } from "next";
import HomePageClient from "./HomePageClient";
import messages from "@/locales/en.json";

export const metadata: Metadata = {
  title: messages.home.meta.title,
  description: messages.home.meta.description,
};

export default function HomePage() {
  return <HomePageClient />;
}
