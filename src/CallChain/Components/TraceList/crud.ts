import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Mock from "mockjs";
export function useQueryTraceList() {
  const [pageNum, setPageNum] = useState(1);
  const [orderBy, setOrderBy] = useState("startTime");
  const [asc, setAsc] = useState(false);
  const { data, isPreviousData } = useQuery<any>({
    queryKey: ["traceList", { page: pageNum, orderBy, asc }],
    keepPreviousData: true,
    queryFn: () => {
      return new Promise((resolve) => {
        const data = Mock.mock({
          total: "@integer(100, 300)",
          "traces|3": [
            {
              traceId: "@id",
              endpoint: "@name",
              duration: "@integer(60, 100)",
              startTime: "@datetime",
              error: "@boolean",
            },
          ],
        });
        data.traces = data.traces.map(
          (i: { startTime: string | number | Date }) => {
            return {
              ...i,
              startTime: +new Date(i.startTime),
            };
          }
        );
        setTimeout(() => {
          resolve(data);
        }, 1000);
      });
    },
  });

  return { data, setPageNum, setOrderBy, setAsc, isPreviousData, asc };
}
