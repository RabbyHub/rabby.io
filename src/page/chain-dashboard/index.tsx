import { DashboardHeader } from "./components/Header";
import style from "./components/style.module.scss";
import { useMemo, useState } from "react";
import { Tab } from "./components/tab";
import { Search } from "./components/Search";
import { Column, ColumnHeader } from "./components/Column";
import { CommonTooltip } from "./components/CommonTooltip";
import { NodeModal } from "./components/NodeModal";
import { Empty } from "./components/Empty";
import { Loading } from "./components/Loading";
import { useNodeList, useTitle } from "./hook";
import { NodeStatus } from "@rabby-wallet/rabby-api/dist/types";

export const ChainDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const { isLoading, data, search, setSearch } = useNodeList();
  const [chainInfo, setChainInfo] = useState<NodeStatus["chain"] | null>(null);

  const all = data?.all?.length || "";
  const unstable = data?.unstable?.length || 0;
  const list = useMemo(() => {
    if (!all) {
      return ["All", "Unstable"];
    }
    return [`All (${all})`, `Unstable (${unstable})`];
  }, [all, unstable]);

  const openDetail = (chain: NodeStatus["chain"]) => {
    setModalOpen(true);
    setChainInfo(chain);
  };
  useTitle("Chain Dashboard - Rabby Wallet");

  return (
    <div
      className={style.page}
      style={useMemo(
        () => ({
          backgroundImage: "url(/assets/chain-dashboard/bg.png)",
        }),
        []
      )}
    >
      <DashboardHeader />

      <div className={style.content}>
        <div className={style.searchBar}>
          <Tab list={list} activeTab={activeTab} setActiveTab={setActiveTab} />

          <Search
            value={search}
            onChange={(e) => {
              setSearch(e.target.value || "");
            }}
          />
        </div>
        {!isLoading && (!data?.all || data?.all?.length === 0) ? (
          <Empty />
        ) : (
          <>
            <ColumnHeader />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                paddingBottom: 50,
              }}
            >
              {!isLoading &&
                (activeTab === 0 ? data?.all : data?.unstable)?.map((item) => (
                  <Column
                    openDetail={openDetail}
                    chain={item.chain}
                    logo={item.chain.logo_url}
                    features={item.features}
                    official_node_height={item.official_node_height}
                    official_node_timestamp={item.official_node_timestamp}
                    rabby_node_height={item.rabby_node_height}
                    rabby_data_service_height={item.rabby_data_service_height}
                  />
                ))}
              {isLoading && <Loading />}
            </div>
          </>
        )}
      </div>

      {chainInfo && (
        <NodeModal
          onRequestClose={() => setModalOpen(false)}
          onAfterClose={() => {
            setChainInfo(null);
          }}
          isOpen={modalOpen}
          chainInfo={chainInfo}
        />
      )}

      <CommonTooltip />
    </div>
  );
};
