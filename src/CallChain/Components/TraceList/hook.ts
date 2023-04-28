import { useEffect, useState } from "react";
import { useQueryTraceList } from "./crud";
import { traceDetailIdAtom } from "../../atom";
import { useAtom } from "jotai";
export type TraceListType = {
  traceId: string;
  endpoint: string;
  duration: number;
  startTime: string;
  error: boolean;
};
export function useTraceList() {
  const { data, setPageNum, setAsc, setOrderBy, isPreviousData, asc } =
    useQueryTraceList();
  const [list, setList] = useState<TraceListType[]>([]);
  const [total, setTotal] = useState(0);

  const [, setTraceDetailId] = useAtom(traceDetailIdAtom);
  useEffect(() => {
    setList(data?.traces ?? []);
    setTotal(data?.total ?? 0);
    /**
     * 默认展示第一个trace的详情
     */
    if (data?.traces.length > 0) {
      setTraceDetailId(data?.traces[0].traceId);
    } else {
      setTraceDetailId("");
    }
  }, [data]);

  return { list, setPageNum, setAsc, setOrderBy, total, isPreviousData, asc };
}
