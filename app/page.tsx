"use client";

import { redirect } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

export default function MusicPage() {
  const { userId } = useAuth();

  if (userId) {
    return redirect("/music");
  }

  return redirect("/sign-in");
}
