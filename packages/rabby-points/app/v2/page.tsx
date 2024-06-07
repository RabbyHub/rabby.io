import { RabbyPointsReferral } from "@/components/rabby-points";
import { Provider } from "jotai";
export default function Home() {
  return (
    <Provider>
      <RabbyPointsReferral />
    </Provider>
  );
}
