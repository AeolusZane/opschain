import { Table, Typography } from "antd";
import { useTraceDetailList } from "./hook";
import { Columns } from "./Columns";
import { DetailModel } from "../DetailModel";
import { Divider, Row, Space } from "@fd/react";
const { Title } = Typography;
export function TraceTable() {
  const { list, isPreviousData } = useTraceDetailList();
  return (
    <>
      <Space
        direction="vertical"
        style={{ display: "flex", width: "100%", height: "100%" }}
      >
        <Space
          size={8}
          style={{
            display: "flex",
            height: 44,
            whiteSpace: "nowrap",
          }}
          wrap={false}
        >
          <Title level={4}>{"调用链路详情"}</Title>
        </Space>
        <Divider style={{ margin: "6px 0" }} />
        <Table
          pagination={false}
          columns={Columns}
          loading={isPreviousData}
          dataSource={list}
          rowKey={(item) => item.span}
        />

        <DetailModel />
      </Space>
    </>
  );
}
