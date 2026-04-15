import { redirect } from "next/navigation";

export default function RootPage() {
  // If the proxy fails to redirect, this fallback ensures the user goes to the default locale.
  redirect("/en");
}
