import { useQuery } from "@tanstack/react-query";
import Mock from "mockjs";
import { traceDetailIdAtom } from "../../atom";
import { useAtom } from "jotai";
import { DetailTagsType } from "../DetailModel";

export type TraceDetailType = {
  span: string;
  startTime: number;
  selfDuration: number;
  execDuration: number;
  execDurationPercent: number;
  service: string;
  children: TraceDetailType[];
  tags?: DetailTagsType[];
  detail?: {
    [key: string]: any;
  };
};
export function useQueryTraceDetail() {
  const [traceId, setTraceId] = useAtom(traceDetailIdAtom);
  const { data, isPreviousData } = useQuery<TraceDetailType[]>({
    queryKey: ["traceDetail", traceId],
    keepPreviousData: true,
    queryFn: () => {
      return new Promise((resolve) => {
        const data = Mock.mock({
          "list|1-4": [
            {
              span: "@id",
              startTime: "@datetime",
              selfDuration: "@integer(60, 100)",
              execDuration: "@integer(60, 100)",
              execDurationPercent: "@integer(60, 100)",
              "tags|5": [
                {
                  key: "@id",
                  value: "@name",
                },
              ],
              service: "@name",
              "children|3": [
                {
                  span: "@id",
                  startTime: "@datetime",
                  "tags|5": [
                    {
                      key: "@id",
                      value: "@name",
                    },
                  ],
                  selfDuration: "@integer(60, 100)",
                  execDuration: "@integer(60, 100)",
                  execDurationPercent: "@integer(60, 100)",
                  service: "@name",
                },
              ],
            },
          ],
        }).list;

        if (traceId === "") {
          resolve([]);
        }

        setTimeout(() => {
          resolve(data);
        }, 1000);
      });
    },
  });

  return { data, isPreviousData };
}
