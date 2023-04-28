import { useEffect, useState } from "react";
import { TraceDetailType, useQueryTraceDetail } from "./crud";

export function useTraceDetailList() {
  const { data, isPreviousData } = useQueryTraceDetail();

  const [list, setList] = useState<TraceDetailType[]>([]);
  /**
   * 这里处理一下后台返回过来的脏数据
   */
  useEffect(() => {
    setList(data ?? []);
  }, [data]);

  return { list, isPreviousData };
}
