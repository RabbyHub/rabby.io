import { OpenApiService } from "@rabby-wallet/rabby-api";
import { WebSignApiPlugin } from "@rabby-wallet/rabby-api/dist/plugins/web-sign";
import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      staleTime: 1000 * 60 * 10,
      cacheTime: 1000 * 60 * 10,
      retry: 0,
    },
  },
});

export const api = new OpenApiService({
  store: {
    host: "https://api.rabby.io",
  },
  plugin: WebSignApiPlugin,
});

api.initSync();
