import {
  Space,
  Pagination,
  Select,
  Typography,
  Tag,
  Row,
  Spin,
  Button,
  Table,
  Col,
  Divider,
} from "@fd/react";
import { TraceListType, useTraceList } from "./hook";
import dayjs from "dayjs";
import { traceDetailIdAtom } from "../../atom";
import { useAtom } from "jotai";
const { Text } = Typography;

export function TraceList() {
  const { list, setPageNum, total, setOrderBy, isPreviousData, setAsc, asc } =
    useTraceList();
  const handleChange = (value: string) => {
    setOrderBy(value);
  };

  const [, setTraceDetailId] = useAtom(traceDetailIdAtom);

  return (
    <>
      <Space
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Row
          style={{
            display: "flex",
            height: 42,
            flexDirection: "row",
            whiteSpace: "nowrap",
          }}
          wrap={false}
        >
          <Select
            defaultValue="startTime"
            style={{ height: 36,margin: "0 16px 0 0" }}
            onChange={handleChange}
            options={[
              { value: "startTime", label: "按开始时间排序" },
              { value: "duration", label: "按耗时排序" },
            ]}
          />
          <Button
            onClick={() => {
              setAsc(!asc);
            }}
          >
            {asc ? "升序" : "降序"}
          </Button>
        </Row>
      </Space>
      <Divider style={{ margin: "6px 0" }} />
      {isPreviousData && <Spin style={{ margin: 10 }} />}
      <Table
        style={{
          overflow: "auto",
          height: "100%",
        }}
        columns={[
          {
            dataIndex: "item",
            render: (item: TraceListType) => {
              return (
                <Space
                  key={item.traceId}
                  onClick={() => {
                    setTraceDetailId(item.traceId);
                  }}
                  size={8}
                  direction="vertical"
                  style={{ display: "flex", width: "100%" }}
                  wrap={false}
                >
                  <Row>
                    <Text strong>{item.endpoint}</Text>
                  </Row>
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Tag color={item.error ? "error" : ""}>
                      {item.duration} ms
                    </Tag>
                    <Text type="secondary">
                      {dayjs(item.startTime).format("YYYY-MM-DD HH:mm:ss")}
                    </Text>
                  </Row>
                </Space>
              );
            },
          },
        ]}
        showHeader={false}
        pagination={false}
        dataSource={list.map((item) => {
          return {
            key: item.traceId,
            traceId: item.traceId,
            item,
          };
        })}
      />

      <Space
        size={8}
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "row-reverse",
          whiteSpace: "nowrap",
        }}
      >
        <Pagination
          defaultCurrent={1}
          total={total}
          onChange={setPageNum}
          showSizeChanger={false}
        />
      </Space>
    </>
  );
}
