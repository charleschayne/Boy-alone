import ComingSoonGate from "@/components/ComingSoonGate";
import { storeSettings } from "@/lib/shiningroom/server";
export const dynamic = "force-dynamic";
export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await storeSettings();
  return settings.is_open ? (
    children
  ) : (
    <ComingSoonGate message={settings.closed_message} />
  );
}
