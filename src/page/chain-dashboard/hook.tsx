import { useQuery } from "react-query";
import { apiReady } from "../../service";
import { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { NodeStatus } from "@rabby-wallet/rabby-api/dist/types";
import toast from "react-hot-toast";

const filterUnstable = (e: NodeStatus) => {
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
    if (serviceDelayNumber >= 10 || rpcDelayNumber >= 10) {
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
    let unstable = all?.filter(filterUnstable);
    if (!search?.trim?.()) {
      return { all: data?.data, unstable };
    }
    const q = search.trim()?.toLowerCase();
    all = all?.filter(filterSearch(q));
    return {
      all: all?.filter(filterSearch(q)),
      unstable: all?.filter(filterUnstable),
    };
  }, [data?.data, search]);

  useEffect(() => {
    if (data.error) {
      toast(String((data.error as any)?.message || data.error), {
        duration: 2000,
        style: {
          top: 200,
        },
      });
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
      toast(String((data.error as any)?.message || data.error), {
        duration: 2000,
        style: {
          top: 200,
        },
      });
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
