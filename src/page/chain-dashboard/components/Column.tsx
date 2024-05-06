import clsx from "clsx";
import style from "./style.module.scss";
import { TOOLTIP_ID } from "./CommonTooltip";
import type { NodeStatus } from "@rabby-wallet/rabby-api/dist/types";
import { NodeStatusInfo } from "./NodeStatus";

export const ColumnHeader = () => {
  return (
    <div className={style.columnHeader}>
      <div className={style.first}>Supported Chain</div>
      <div className={style.other}>Official RPC Status</div>
      <div className={style.other}>
        <div>Rabby RPC Status</div>

        <img
          data-tooltip-id={TOOLTIP_ID}
          data-tooltip-content="Rabby's RPC endpoint deployed on this chain. Unstable status results
          in transaction failures or pending, as well as delays in updating
          asset balances and transaction records."
          className={style.infoIcon}
          src="/assets/chain-dashboard/info.svg"
          alt=""
        />
      </div>
      <div className={style.other}>
        <div>Rabby Data Service</div>

        <img
          data-tooltip-id={TOOLTIP_ID}
          data-tooltip-content="Rabby's backend data service. Unstable status may cause delays in
          updating asset balances and transaction records."
          className={style.infoIcon}
          src="/assets/chain-dashboard/info.svg"
          alt=""
        />
      </div>
    </div>
  );
};

interface NodeInfo {
  chain: NodeStatus["chain"];
  features: Features;
  official_node_height: number;
  official_node_timestamp: number;
  rabby_node_height: number;
  rabby_data_service_height: number;
  logo?: string;
  openDetail: (chain: NodeStatus["chain"]) => void;
}

interface Features {
  signature_decode: boolean;
  tx_simulation: boolean;
  security_check: boolean;
  evm_tracing: boolean;
  tx_simulation_version?: string;
}

export const Column = (props: NodeInfo) => {
  const {
    chain,
    features,
    official_node_height,
    official_node_timestamp,
    rabby_node_height,
    rabby_data_service_height,
    logo,
    openDetail,
  } = props;

  const { tx_simulation_version, ...featureTags } = features;

  const featuresList = Object.entries(featureTags).map(([key, value]) => {
    if (key === "tx_simulation" && value) {
      return {
        label: "Tx Simulation " + tx_simulation_version?.toUpperCase(),
        enabled: !!value,
      };
    }
    return {
      label: key,
      enabled: !!value,
    };
  });

  return (
    <div
      className={style.column}
      onClick={() => {
        openDetail(chain);
      }}
    >
      <div className={style.first}>
        <div className={style.chainInfo}>
          <img className={style.chainLogo} src={logo} alt={chain.name} />
          <span className={style.chainText}>{chain.name}</span>
        </div>
        <div className={style.tagGroup}>
          {featuresList.map((item) => (
            <Tag key={item.label} enabled={item.enabled} text={item.label} />
          ))}
        </div>
      </div>
      <div className={style.other}>
        <NodeStatusInfo
          officialNodeHeight={official_node_height}
          officialNodeTimestamp={official_node_timestamp}
          targetNodeHeight={official_node_height}
          isOfficial
        />
      </div>
      <div className={style.other}>
        <NodeStatusInfo
          officialNodeHeight={official_node_height}
          officialNodeTimestamp={official_node_timestamp}
          targetNodeHeight={rabby_node_height}
        />
      </div>
      <div className={style.other}>
        <NodeStatusInfo
          officialNodeHeight={official_node_height}
          officialNodeTimestamp={official_node_timestamp}
          targetNodeHeight={rabby_data_service_height}
        />
      </div>
    </div>
  );
};

export function Tag({
  enabled = true,
  showCheck = true,
  text,
}: {
  enabled?: boolean;
  showCheck?: boolean;
  text: string;
}) {
  return (
    <div
      data-tooltip-content={"Not supported in this chain"}
      data-tooltip-id={!enabled ? TOOLTIP_ID : undefined}
      className={clsx(style.tag, !enabled && style.noActive)}
    >
      {!showCheck ? null : enabled ? (
        <img src="/assets/chain-dashboard/checked.svg" alt="" />
      ) : (
        <img src="/assets/chain-dashboard/unchecked.svg" alt="" />
      )}
      <span>{text?.replace("evm", "EVM")?.replace("_", " ")}</span>
    </div>
  );
}
