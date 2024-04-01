import { DashboardHeader } from "./components/Header";
import style from "./components/style.module.scss";
import { useEffect, useMemo, useState } from "react";
import { Tab } from "./components/tab";
import { Search } from "./components/Search";
import { Column, ColumnHeader } from "./components/Column";
import { CommonTooltip } from "./components/CommonTooltip";
import { NodeModal } from "./components/NodeModal";
import { Empty } from "./components/Empty";
import { Loading } from "./components/Loading";
import { useNodeList, useTitle } from "./hook";
import { NodeStatus } from "@rabby-wallet/rabby-api/dist/types";
import clsx from "clsx";
import { Toaster } from "react-hot-toast";

export const ChainDashboard = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const { isLoading, data, search, setSearch } = useNodeList();
  const [chainInfo, setChainInfo] = useState<NodeStatus["chain"] | null>(null);

  const all = data?.all?.length || 0;
  const warning = data?.warning?.length || 0;
  const danger = data?.danger?.length || 0;
  const renderData = useMemo(() => {
    if (!activeTab) {
      return data?.all;
    }
    if (activeTab === 1) {
      return data?.warning;
    }
    if (activeTab === 2) {
      return data?.danger;
    }
    return data?.all;
  }, [activeTab, data?.all, data?.danger, data?.warning]);
  const list = useMemo(() => {
    if (isLoading) {
      return ["All", "Warning", "Danger"];
    }
    return [`All (${all})`, `Warning (${warning})`, `Danger (${danger})`];
  }, [isLoading, all, warning, danger]);

  const openDetail = (chain: NodeStatus["chain"]) => {
    setModalOpen(true);
    setChainInfo(chain);
  };

  const isEmpty = useMemo(() => {
    return (
      !isLoading && (!data?.all || !renderData || renderData?.length === 0)
    );
  }, [data?.all, isLoading, renderData]);

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      setIsSticky(document.documentElement.scrollTop > 140);
    };
    document.addEventListener("scroll", scrollHandler, { passive: true });

    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

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
      <div className={clsx(style.sticky, isSticky && style.stickyTop)}>
        <div className={style.content}>
          <div className={style.searchBar}>
            <Tab
              list={list}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <Search
              value={search}
              onChange={(e) => {
                setSearch(e.target.value || "");
              }}
            />
          </div>
          {!isEmpty && <ColumnHeader />}
        </div>
      </div>

      <div className={style.content}>
        {isEmpty ? (
          <Empty text={search?.trim()?.length ? "No result" : undefined} />
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                paddingBottom: 50,
              }}
            >
              {!isLoading &&
                renderData?.map((item) => (
                  <Column
                    key={item.chain.id}
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

      <Toaster
        containerStyle={{
          top: 165,
        }}
        toastOptions={{
          style: {
            color: "var(--r-neutral-title2, #FFF)",
            fontSize: 13,
            fontStyle: "normal",
            fontWeight: 400,
            lineHeight: "normal",
            background: "black",
            borderRadius: 0,
          },
        }}
      />
    </div>
  );
};
