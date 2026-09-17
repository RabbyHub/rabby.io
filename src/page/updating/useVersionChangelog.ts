import { useQuery } from "react-query";
import type { WalletVersionInfo } from "@rabby-wallet/rabby-api/dist/types";
import { apiReady } from "../../service";

// Compatible with SDK versions that predate the Chinese changelog field.
type VersionChangelog = WalletVersionInfo & { changelog_cn?: string };

export function useVersionChangelog(version: string) {
  return useQuery<VersionChangelog | null>({
    queryKey: ["walletVersionInfo", version],
    // The backend accepts x.y.z, not Chrome's optional fourth version segment.
    enabled: /^\d+\.\d+\.\d+$/.test(version),
    queryFn: async () => {
      const info = await (await apiReady).getVersionInfo({
        version_id: version,
      });
      // Display the latest release while querying with the installed version.
      return info.latest_version;
    },
    staleTime: 60_000,
    cacheTime: 5 * 60_000,
    refetchInterval: 60_000,
  });
}
