import type { Metadata } from "next";
import AutomationPage from "./AutomationPage";

export const metadata: Metadata = {
  title: "Free Automation Review — Jacob Winsor | Perth, WA",
  description:
    "Book a free 60–90 minute Automation Review with Jacob Winsor. I help small businesses across Western Australia cut repetitive admin work. Perth-based, no obligation.",
};

export default function Page() {
  return <AutomationPage />;
}
