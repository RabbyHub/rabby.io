import { OpenApiService } from "@rabby-wallet/rabby-api";
import { WebSignApiPlugin } from "@rabby-wallet/rabby-api/dist/plugins/web-sign";
import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      staleTime: 1000 * 3,
      cacheTime: 1000 * 3,
      retry: 0,
      // retryDelay: 500,
    },
  },
});

export const api = new OpenApiService({
  store: {
    host: "https://api.rabby.io",
  },
  plugin: WebSignApiPlugin,
});

export const apiReady = new Promise<OpenApiService>((resolve, reject) => {
  api
    .init()
    .then(() => resolve(api))
    .catch(reject);
});
