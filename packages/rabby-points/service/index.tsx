import { OpenApiService } from "@rabby-wallet/rabby-api";
import { WebSignApiPlugin } from "@rabby-wallet/rabby-api/dist/plugins/web-sign";
import { QueryClient } from "react-query";

export const queryClient = new QueryClient();

// export const api = new OpenApiService({
//   store: {
//     host: "https://points.rabby-api.debank.dbkops.com/", //"https://api.rabby.io",
//   },
//   plugin: WebSignApiPlugin,
// });

// export const apiReady = new Promise<OpenApiService>((resolve, reject) => {
//   api
//     .init()
//     .then(() => resolve(api))
//     .catch(reject);
// });
