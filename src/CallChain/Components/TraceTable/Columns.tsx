import { Progress, Typography } from "@fd/react";
import { TraceDetailType } from "./crud";
import type { ColumnsType } from "antd/es/table";
import { DetailTagsType, modelTagsAtom, showModalAtom } from "../DetailModel";
import { useAtom } from "jotai";
const { Link } = Typography;
const ShowModelLink = ({
  span,
  tags = [],
}: {
  span: string;
  tags?: DetailTagsType[];
}) => {
  const [, setTags] = useAtom(modelTagsAtom);
  const [, setOpen] = useAtom(showModalAtom);
  const showModel = () => {
    setTags(tags ?? []);
    setOpen(true);
  };

  return <Link onClick={showModel}>{span}</Link>;
};

export const Columns: ColumnsType<TraceDetailType> = [
  {
    title: "span",
    dataIndex: "span",
    width: "20%",
    key: "span",
    render: (span, record) => {
      return <ShowModelLink span={span} tags={record?.tags} />;
    },
  },
  {
    title: "开始时间",
    dataIndex: "startTime",
    // sorter: (a, b) => a.startTime - b.startTime,
    key: "startTime",
    width: "20%",
  },
  {
    title: "自身耗时",
    dataIndex: "selfDuration",
    width: "10%",
    key: "selfDuration",
  },
  {
    title: "执行耗时",
    dataIndex: "execDuration",
    sorter: (a, b) => a.execDuration - b.execDuration,
    width: "10%",
    key: "execDuration",
  },
  {
    title: "执行耗时占比(%)",
    width: "15%",
    key: "execDurationPercent",
    dataIndex: "execDurationPercent",
    render: (item) => <Progress percent={item} format={(p) => p} />,
  },
  {
    title: "服务",
    width: "15%",
    dataIndex: "service",
    key: "service",
  },
];
