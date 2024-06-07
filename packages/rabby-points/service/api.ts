import { OpenApiService } from "@rabby-wallet/rabby-api";
import { WebSignApiPlugin } from "@rabby-wallet/rabby-api/dist/plugins/web-sign";

const api = new OpenApiService({
  store: {
    host: "https://api.rabby.io",
  },
  plugin: WebSignApiPlugin,
});

const apiReady = new Promise<OpenApiService>((resolve, reject) => {
  api
    .init()
    .then(() => resolve(api))
    .catch(reject);
});

export default apiReady;
