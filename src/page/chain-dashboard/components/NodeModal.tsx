import Modal from "react-modal";
import style from "./style.module.scss";
import { Tab } from "./tab";
import { useMemo, useState } from "react";
import { Tag } from "./Column";
import { RemoveScroll } from "react-remove-scroll";
import {
  LineChart,
  XAxis,
  YAxis,
  Legend,
  Line,
  Tooltip,
  Label,
} from "recharts";
import { NodeStatus } from "@rabby-wallet/rabby-api/dist/types";
import { useNodeServiceDetail } from "../hook";
import { NodeStatusInfo } from "./NodeStatus";
import dayjs from "dayjs";
import { CSkeleton } from "./Loading";
import { TOOLTIP_ID } from "./CommonTooltip";

interface TargetChain {
  chainInfo: NodeStatus["chain"];
}

const tabList = ["Rabby Rpc Status", "Rabby Data Service"];

export const NodeModal = (props: Modal["props"] & TargetChain) => {
  const { chainInfo, ...otherProps } = props;
  const [activeTab, setActiveTab] = useState(0);
  const { isLoading, data } = useNodeServiceDetail(chainInfo.id);

  const arr = useMemo(() => {
    return activeTab === 0 ? data?.rabby_rpc : data?.rabby_data_service;
  }, [activeTab, data]);
  return (
    <Modal
      ariaHideApp={false}
      shouldCloseOnOverlayClick
      style={{
        overlay: {
          background: "rgba(0, 0, 0, 0.6)",
          zIndex: 1000,
        },
        content: {
          padding: 32,
          paddingBottom: 0,
          width: 784,
          height: 620,
          flexShrink: 0,
          borderRadius: 16,
          background: "var(--r-neutral-bg2, #1c1f2b)",
          boxShadow: "0px 24px 40px 0px rgba(19, 20, 26, 0.49)",
          border: "none",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        },
      }}
      {...otherProps}
    >
      <RemoveScroll style={{ height: "100%" }}>
        <div
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <div className={style.modalHeader}>
            <div className={style.modalHeaderLeft}>
              <img
                className={style.chainLogo}
                src={chainInfo.logo_url}
                alt=""
              />
              <div className={style.modalTitle}>{chainInfo.name}</div>
            </div>
            <Tab
              list={tabList}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              itemStyle={{
                width: 152,
                height: 32,
                fontSize: 14,
                fontWeight: 510,
              }}
            />
            <div className={style.modalHeaderRight}>
              <img
                src="/assets/chain-dashboard/close.svg"
                className={style.closeIcon}
                alt="close"
                onClick={(e) => props?.onRequestClose?.(e)}
              />
            </div>
          </div>
          <div className={style.chartList}>
            {isLoading && (
              <>
                <CSkeleton width={700} height={220} />
                <CSkeleton width={700} height={220} />
              </>
            )}
            {arr?.map((e) => {
              return (
                <NodeChart
                  key={e.node.name}
                  name={e.node.name}
                  tags={e.node.tag}
                  data={e.height_list}
                  isDataService={activeTab === 1}
                />
              );
            })}
          </div>

          {/* <NodeChart /> */}
        </div>
      </RemoveScroll>
    </Modal>
  );
};

const tips: Record<string, string> = {
  Pre: "Simulates and submits transactions",
  State: "Syncs with the latest on-chain data.",
  Trace: "Syncs transaction history.",
  Archive: "Syncs previous status.",
  "Rabby Data Service":
    "Rabby's backend data service. Unstable status may cause delays in updating asset balances and transaction records.",
};

const NodeChart = ({
  name,
  tags,
  data,
  isDataService = false,
}: {
  name: string;
  tags: string[];
  data: [number, number, number][];
  isDataService: boolean;
}) => {
  const formatData = useMemo(
    () =>
      data.map((e) => ({
        x: e[0],
        y: e[1],
        z: e[2],
      })),
    [data]
  );

  return (
    <div className={style.chartWrapper}>
      <div className={style.chartHeader}>
        <div className={style.chartHeaderLeft}>
          <div className={style.chartHeaderLabel}>
            <div>{name} RPC Group</div>
            <img
              data-tooltip-id={TOOLTIP_ID}
              data-tooltip-content={tips[name] || ""}
              className={style.infoIcon}
              src="/assets/chain-dashboard/info.svg"
              alt=""
            />
          </div>
          <div className={style.tagGroup}>
            {tags.map((e) => (
              <Tag text={e} key={e} showCheck={false} />
            ))}
          </div>
        </div>

        <NodeStatusInfo
          row
          showNormal={false}
          enableShadow={false}
          isOfficial={false}
          officialNodeHeight={data[data.length - 1][1]}
          officialNodeTimestamp={data[data.length - 1][0]}
          targetNodeHeight={data[data.length - 1][2]}
        />
      </div>
      <div
        style={{
          margin: "24px 0",
        }}
      >
        <LineChart
          width={720}
          height={isDataService ? 370 : 220}
          data={formatData}
          margin={{ top: 20, right: 30, bottom: 0, left: 30 }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="5"
              markerHeight="9"
              refX="3.2"
              refY="4.6"
              orient="auto"
            >
              <path
                d="M4.34389 4.98637C4.53915 4.7911 4.53915 4.47452 4.34389 4.27926L1.16191 1.09728C0.966645 0.902016 0.650063 0.902016 0.4548 1.09728C0.259538 1.29254 0.259538 1.60912 0.4548 1.80439L3.28323 4.63281L0.4548 7.46124C0.259538 7.6565 0.259538 7.97308 0.4548 8.16835C0.650063 8.36361 0.966645 8.36361 1.16191 8.16835L4.34389 4.98637ZM3.99023 5.13281H3.99033V4.13281H3.99023V5.13281Z"
                fill="var(--r-neutral-line, rgba(255, 255, 255, 0.10))"
                fill-opacity="1"
              />
            </marker>
            <marker
              id="arrowhead2"
              markerWidth="5"
              markerHeight="9"
              refX="1.8"
              refY="4.62"
              orient="auto"
            >
              <path
                d="M0.636681 4.27926C0.441419 4.47452 0.441419 4.7911 0.636681 4.98637L3.81866 8.16835C4.01392 8.36361 4.33051 8.36361 4.52577 8.16835C4.72103 7.97308 4.72103 7.6565 4.52577 7.46124L1.69734 4.63281L4.52577 1.80439C4.72103 1.60912 4.72103 1.29254 4.52577 1.09728C4.33051 0.902016 4.01392 0.902016 3.81866 1.09728L0.636681 4.27926ZM0.990234 5.13281H0.990334V4.13281H0.990234V5.13281Z"
                fill="var(--r-neutral-line, rgba(255, 255, 255, 0.10))"
                fill-opacity="1"
              />
            </marker>
          </defs>

          <XAxis
            dataKey="x"
            tickLine={false}
            stroke="var(--r-neutral-line, rgba(255, 255, 255, 0.10))"
            ticks={[formatData[0].x, formatData[formatData.length - 1].x]}
            tickFormatter={(e) => dayjs.unix(e).format("MMM DD, HH:mm")}
            includeHidden
            axisLine={{
              markerEnd: "url(#arrowhead)",
            }}
          />
          <YAxis
            tickLine={false}
            stroke="var(--r-neutral-line, rgba(255, 255, 255, 0.10))"
            ticks={[formatData[0].y, formatData[formatData.length - 1].y]}
            domain={[formatData[0].y, formatData[formatData.length - 1].y]}
            includeHidden
            axisLine={{
              markerStart: "url(#arrowhead2)",
            }}
          >
            <Label
              content={
                <text
                  offset="10"
                  x="60"
                  y="10"
                  className="recharts-text recharts-label"
                  text-anchor="middle"
                  fill="#666"
                >
                  <tspan color="#BABEC5" x="90" dy="0em">
                    Blocks
                  </tspan>
                </text>
              }
              offset={10}
              position={"top"}
            />
          </YAxis>
          <Tooltip
            contentStyle={{
              background: "var(--r-neutral-bg2, #1c1f2b)",
              border: "none",
            }}
            cursor={{
              stroke: "var(--r-neutral-line, rgba(255, 255, 255, 0.10))",
            }}
            labelStyle={{
              fontSize: 13,
              color: "var(--r-neutral-foot, #babec5)",
              marginBottom: 2,
            }}
            itemStyle={{
              fontSize: 13,
            }}
            labelFormatter={(e) => dayjs.unix(e).format("MMM DD, HH:mm")}
          />
          <Legend iconType="circle" iconSize={7} />
          <Line
            strokeWidth={3}
            type="monotone"
            dot={false}
            dataKey="y"
            stroke="#2ABB7F"
            name="Official RPC block height"
            style={{
              transform: "translateY(-2px)",
            }}
          />
          <Line
            strokeWidth={3}
            type="monotone"
            dot={false}
            dataKey="z"
            stroke="#7084ff"
            name={
              isDataService
                ? "Rabby's data synchronization level"
                : "Rabby's RPC block height"
            }
          />
        </LineChart>
      </div>
    </div>
  );
};
