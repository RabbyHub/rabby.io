import { RabbyPointsReferral } from "@/components/rabby-points";
import { Provider } from "jotai";
import { Suspense } from "react";
export default function Home() {
  return (
    <Provider>
      <Suspense>
        <RabbyPointsReferral />
      </Suspense>
    </Provider>
  );
}
