import { useQuery } from "react-query";
import { apiReady } from "../../service";

export function useVersionChangelog(version: string) {
  return useQuery({
    queryKey: ["walletVersionInfo", version],
    // The backend accepts x.y.z, not Chrome's optional fourth version segment.
    enabled: /^\d+\.\d+\.\d+$/.test(version),
    queryFn: async () => {
      const info = await (await apiReady).getVersionInfo({
        version_id: version,
      });
      // Do not substitute the server's latest version: it may be newer than
      // the update Chrome is currently installing on this page.
      return info.version?.id === version ? info.version.changelog : null;
    },
    staleTime: 60_000,
    cacheTime: 5 * 60_000,
    refetchInterval: 60_000,
  });
}
