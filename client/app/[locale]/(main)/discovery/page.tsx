import DiscoveryView from "@/components/View/main/discoveryView/DiscoveryView";
import { Suspense } from "react";

export default function Discovery() {
  return (
    <Suspense fallback={null}>
      <DiscoveryView />
    </Suspense>
  );
}
