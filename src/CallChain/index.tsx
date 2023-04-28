import {
  Button,
  Select,
  DatePicker,
  Row,
  Col,
  Space,
  InputNumber,
  Divider,
} from "@fd/react";
import {
  useQuerySceneTypeItemSelector,
  useSceneTypeSelector,
  useSessionIdSelector,
  useSetDateTimeRange,
  useTraceIdSelector,
} from "./hook";
import { useEffect, useState } from "react";
import { MultiMore } from "./Components/MultiMore";
import { sceneTypeAtom, tagKeysAtom, tagsAtom } from "./atom";
import { useAtom } from "jotai";
import { ConditionQuery } from "./Components/ConditionQuery";
import { TraceList } from "./Components/TraceList";
import { TraceTable } from "./Components/TraceTable";

const { RangePicker } = DatePicker;
// @ts-ignore
window.BI = window.BI || {
  i18nText: (text: string) => text,
};
const leftStyle: React.CSSProperties = {
  textAlign: "center",
  height: 700,
  //   height: "100%",
  lineHeight: "120px",
  color: "#fff",
  borderRight: "1px solid #e8e8e8",
  borderTop: "1px solid #e8e8e8",
  paddingTop: 10,
  display: "flex",
  alignContent: "flex-start",
  flexDirection: "column",
  justifyContent: "space-between",
};

const rightStyle: React.CSSProperties = {
  textAlign: "center",
  height: 700,
  lineHeight: "120px",
  borderTop: "1px solid #e8e8e8",
  display: "flex",
  alignContent: "flex-start",
};
export const CallChain = ({}: { config?: { [key: string]: any } }) => {
  /**
   * 日期变动相关hook
   */
  const { dates, value, disabledDate, setDates, setValue, setDateTimeRange } =
    useSetDateTimeRange();
  const [formData, setFormData] = useState({} as any);

  useEffect(()=>{
    console.log('时间变化后执行的一些还原操作')
  },[dates])

  /**
   * 提交内容
   */

  const submitFormData = () => {
    setFormData({
      sessionIds,
      traceIds,
      sceneType,
    });
  };
  /**
   * 最终选中的sessionId列表
   */
  const [setSearchSessionId, sessionIdList] = useSessionIdSelector();
  const [sessionIds, setSelectedSessionIds] = useState<string[]>([]);
  const selectedSessionIdsChange = (value: string[]) => {
    setSelectedSessionIds(value);
  };

  /**
   * 调用链路
   */
  const [setSearchTraceId, traceIdList] = useTraceIdSelector();
  const [traceIds, setSelectedTraceIds] = useState<string[]>([]);

  const selectedTraceIdsChange = (value: string[]) => {
    setSelectedTraceIds(value);
  };

  const [setSearchSceneType, sceneTypeList] = useSceneTypeSelector();
  const [sceneType, setSceneType] = useAtom(sceneTypeAtom);

  const selectedSceneTypeChange = (value: string) => {
    setSceneType(value);
    selectedSceneTypeItemsChange([]);
  };

  /**
   * 调用链路
   */
  const [setSearchSceneTypeItem, sceneTypeItemList] =
    useQuerySceneTypeItemSelector();
  const [sceneTypeItems, setSelectedSceneTypeItems] = useState<string[]>([]);

  const selectedSceneTypeItemsChange = (value: string[]) => {
    setSelectedSceneTypeItems(value);
  };

  /**
   * 端点耗时
   */
  const onChangeMin = (value: any) => {
    console.log(value);
  };
  const onChangeMax = (value: any) => {
    console.log(value);
  };

  const [searchKeys] = useAtom(tagKeysAtom);

  return (
    <>
      <Space
        size={8}
        direction="vertical"
        style={{ display: "flex" }}
        wrap={false}
      >
        <Row gutter={36} wrap={false}>
          <Col>
            <Space size={8} style={{ whiteSpace: "nowrap" }}>
              {BI.i18nText("查询时间")}
              <RangePicker
                showTime
                format={"YYYY-MM-DD HH:mm:ss"}
                style={{ minWidth: "308px" }}
                value={dates || value}
                disabledDate={disabledDate}
                onCalendarChange={(val) => {
                  setDateTimeRange(val);
                  setDates(val);
                }}
                onChange={(val) => setValue(val)}
              />
            </Space>
          </Col>
          <Col>
            <Space size={8} style={{ whiteSpace: "nowrap" }}>
              {BI.i18nText("查询Id")}
              <Select
                mode="tags"
                style={{ width: "308px", height: 30 }}
                placeholder="Tags Mode"
                onChange={selectedSessionIdsChange}
                onSearch={(id) => {
                  setSearchSessionId(() => id);
                }}
                options={sessionIdList}
              />
            </Space>
          </Col>
          <Col>
            <Space size={8} style={{ whiteSpace: "nowrap" }}>
              {BI.i18nText("调用链路")}
              <Select
                mode="tags"
                maxTagCount={0}
                style={{ width: "308px", height: 30 }}
                placeholder="Tags Mode"
                onChange={selectedTraceIdsChange}
                value={traceIds}
                onSearch={(id) => {
                  setSearchTraceId(() => id);
                }}
                options={traceIdList}
              />
            </Space>
          </Col>
        </Row>
        {/* 第二行两边布局 */}
        <Row gutter={36} wrap={false} justify={"space-between"}>
          <Space size={8}>
            <Col>
              <Space size={8} style={{ whiteSpace: "nowrap" }}>
                {BI.i18nText("访问内容")}
                <Select
                  showSearch
                  defaultValue={"all"}
                  maxTagCount={0}
                  style={{ width: "130px", height: 30 }}
                  placeholder="Tags Mode"
                  value={sceneType}
                  onChange={selectedSceneTypeChange}
                  onSearch={(id) => setSearchSceneType(() => id)}
                  options={sceneTypeList}
                />
                <Select
                  mode="tags"
                  maxTagCount={0}
                  style={{ width: "130px", height: 30 }}
                  placeholder="Tags Mode"
                  value={sceneTypeItems}
                  onChange={selectedSceneTypeItemsChange}
                  onSearch={(id) => {
                    setSearchSceneTypeItem(() => id);
                  }}
                  options={sceneTypeItemList}
                />
              </Space>
            </Col>

            <Col>
              <Space size={8} style={{ whiteSpace: "nowrap" }}>
                {BI.i18nText("端点耗时")}
                <InputNumber onChange={onChangeMin} />
                {"ms - "}
                <InputNumber onChange={onChangeMax} />
                {"ms"}
              </Space>
            </Col>
            <Col>
              <Space size={8} style={{ whiteSpace: "nowrap" }}>
                {BI.i18nText("端点")}
                <Select
                  mode="tags"
                  maxTagCount={0}
                  style={{ width: "130px", height: 30 }}
                  placeholder="Tags Mode"
                  onChange={selectedTraceIdsChange}
                  onSearch={(id) => {
                    setSearchTraceId(() => id);
                  }}
                  options={sceneTypeItemList}
                />
              </Space>
            </Col>
          </Space>
          <Space size={8}>
            <Col>
              <Space size={8} style={{ whiteSpace: "nowrap" }}>
                <MultiMore />
              </Space>
            </Col>
            <Col>
              <Button
                onClick={() => {
                  submitFormData();
                  // setSessionId(() => crypto.randomUUID());
                  // setTimeRange(pre => {
                  //     return {
                  //         startTime: pre.startTime + 1,
                  //         endTime: pre.endTime + 1,
                  //     };
                  // });
                }}
              >
                查询
              </Button>
            </Col>
          </Space>
        </Row>
        <Row gutter={[36, 8]} justify={"start"}>
          {searchKeys.map((key) => {
            return (
              <Col key={key}>
                <ConditionQuery key={key} targetKey={key} />
              </Col>
            );
          })}
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={6} style={leftStyle}>
            <TraceList />
          </Col>
          <Col span={18} style={rightStyle}>
            <TraceTable />
          </Col>
        </Row>
      </Space>
    </>
  );
};
