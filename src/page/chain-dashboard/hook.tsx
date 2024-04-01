import { useQuery } from "react-query";
import { apiReady } from "../../service";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { NodeStatus } from "@rabby-wallet/rabby-api/dist/types";
import toast from "react-hot-toast";
import { IconDanger } from "./components/IconStatus";

const toastError = (s: string) =>
  toast(s, {
    duration: 2000,
    icon: <IconDanger enableShadow={false} />,
  });

const filterWarning = (e: NodeStatus) => {
  if (
    dayjs.unix(e.official_node_timestamp).isBefore(dayjs().subtract(5, "m"))
  ) {
    return false;
  } else {
    const serviceDelayNumber = Math.abs(
      e.rabby_data_service_height - e.official_node_height
    );
    const rpcDelayNumber = Math.abs(
      e.rabby_node_height - e.official_node_height
    );
    if (serviceDelayNumber > 10 || rpcDelayNumber > 10) {
      return false;
    }
    if (serviceDelayNumber > 0 || rpcDelayNumber > 0) {
      return true;
    }
    return false;
  }
};

const filterDanger = (e: NodeStatus) => {
  if (
    dayjs.unix(e.official_node_timestamp).isBefore(dayjs().subtract(5, "m"))
  ) {
    return true;
  } else {
    const serviceDelayNumber = Math.abs(
      e.rabby_data_service_height - e.official_node_height
    );
    const rpcDelayNumber = Math.abs(
      e.rabby_data_service_height - e.official_node_height
    );
    if (serviceDelayNumber > 10 || rpcDelayNumber > 10) {
      return true;
    }
    return false;
  }
};

const filterSearch = (q: string) => (e: NodeStatus) => {
  return [e.chain.name, e.chain.id, e.chain.name, e.chain.network_id].some(
    (e) => e.toString().toLowerCase()?.includes(q)
  );
};

export const useNodeList = () => {
  const [search, setSearch] = useState("");
  const data = useQuery({
    queryKey: ["nodeList"],
    queryFn: async () => (await apiReady).getNodeStatusList(),
    refetchInterval: 1000 * 10,
  });

  const result = useMemo(() => {
    let all = data?.data?.sort((a, b) =>
      a.chain.name.localeCompare(b.chain.name)
    );
    const q = search.trim()?.toLowerCase();
    if (q) {
      all = all?.filter(filterSearch(q));
    }
    return {
      all: all?.filter(filterSearch(q)),
      warning: all?.filter(filterWarning),
      danger: all?.filter(filterDanger),
    };
  }, [data?.data, search]);

  useEffect(() => {
    if (data.error) {
      toastError(String((data.error as any)?.message || data.error));
    }
  }, [data.error]);

  return {
    ...data,
    data: result,
    search,
    setSearch,
  };
};

export const useNodeServiceDetail = (chain_id: string) => {
  const data = useQuery({
    queryKey: ["nodeServiceDetail", chain_id],
    queryFn: async () => (await apiReady).getNodeStatusDetail({ chain_id }),
    refetchInterval: 1000 * 10,
    cacheTime: 1000 * 10,
  });

  useEffect(() => {
    if (data.error) {
      toastError(String((data.error as any)?.message || data.error));
    }
  }, [data.error]);

  const result = useMemo(() => {
    if (!data?.data) {
      return data?.data;
    }
    const rabby_rpc = data?.data?.rabby_rpc.map((e) => ({
      ...e,
      curveData: e.height_list.map((item) => ({
        timestamp: item[0],
        "Official RPC block height": item[1],
        "Rabby's RPC block height": item[2],
      })),
    }));

    const rabby_data_service = data?.data?.rabby_data_service.map((e) => ({
      ...e,
      curveData: e.height_list.map((item) => ({
        timestamp: item[0],
        "Official RPC block height": item[1],
        "Rabby's data synchronization level": item[2],
      })),
    }));

    return {
      ...data?.data,
      rabby_rpc,
      rabby_data_service,
    };
  }, [data?.data]);
  return {
    ...data,
    data: result,
  };
};

export const useTitle = (title: string) => {
  useEffect(() => {
    let preTitle = document.title;
    document.title = title;

    return () => {
      document.title = preTitle;
    };
  }, [title]);
};
