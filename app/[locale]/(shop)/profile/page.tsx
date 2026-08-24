import type { Metadata } from "next";
import ProfileBody from "@/components/pages/Profile/Body";

export const metadata: Metadata = {
  title: "My Profile — NovaMart",
};

export default function ProfilePage() {
  return <ProfileBody />;
}
