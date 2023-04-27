import { Button, Select, DatePicker, Row, Col, Space, InputNumber } from '@fd/react';
import { useSessionIdSelector, useSetDateTimeRange, useTraceIdSelector } from './hook';
import { useState } from 'react';
const { RangePicker } = DatePicker;

export const CallChain = ({}: { config?: { [key: string]: any } }) => {
    /**
     * 日期变动相关hook
     */
    const { dates, value, disabledDate, setDates, setValue, setDateTimeRange } = useSetDateTimeRange();
    const [, setFormData] = useState({} as any);

    /**
     * 提交内容
     */

    const submitFormData = () => {
        setFormData({
            sessionIds,
            traceIds,
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

    /**
     * 端点耗时
     */
    const onChangeMin = (value: any) => {
        console.log(value);
    };
    const onChangeMax = (value: any) => {
        console.log(value);
    };

    return (
        <>
            <Space size={8} direction="vertical" style={{ display: 'flex' }} wrap={false}>
                <Row gutter={36} wrap={false}>
                    <Col>
                        <Space size={8} style={{ whiteSpace: 'nowrap' }}>
                            {BI.i18nText('查询时间')}
                            <RangePicker
                                showTime
                                format={'YYYY-MM-DD HH:mm:ss'}
                                style={{ minWidth: '308px' }}
                                value={dates || value}
                                disabledDate={disabledDate}
                                onCalendarChange={val => {
                                    setDateTimeRange(val);
                                    setDates(val);
                                }}
                                onChange={val => setValue(val)}
                            />
                        </Space>
                    </Col>
                    <Col>
                        <Space size={8} style={{ whiteSpace: 'nowrap' }}>
                            {BI.i18nText('查询Id')}
                            <Select
                                mode="tags"
                                style={{ width: '308px', height: 30 }}
                                placeholder="Tags Mode"
                                onChange={selectedSessionIdsChange}
                                onSearch={id => {
                                    setSearchSessionId(() => id);
                                }}
                                options={sessionIdList}
                            />
                        </Space>
                    </Col>
                    <Col>
                        <Space size={8} style={{ whiteSpace: 'nowrap' }}>
                            {BI.i18nText('调用链路')}
                            <Select
                                mode="tags"
                                maxTagCount={0}
                                style={{ width: '308px', height: 30 }}
                                placeholder="Tags Mode"
                                onChange={selectedTraceIdsChange}
                                onSearch={id => {
                                    setSearchTraceId(() => id);
                                }}
                                options={traceIdList}
                            />
                        </Space>
                    </Col>
                </Row>
                <Row gutter={36}>
                    <Col>
                        <Space size={8} style={{ whiteSpace: 'nowrap' }}>
                            {BI.i18nText('访问内容')}
                            <Select
                                mode="tags"
                                maxTagCount={0}
                                style={{ width: '130px', height: 30 }}
                                placeholder="Tags Mode"
                                onChange={selectedTraceIdsChange}
                                onSearch={id => {
                                    setSearchTraceId(() => id);
                                }}
                                options={traceIdList}
                            />
                            <Select
                                mode="tags"
                                maxTagCount={0}
                                style={{ width: '130px', height: 30 }}
                                placeholder="Tags Mode"
                                onChange={selectedTraceIdsChange}
                                onSearch={id => {
                                    setSearchTraceId(() => id);
                                }}
                                options={traceIdList}
                            />
                        </Space>
                    </Col>

                    <Col>
                        <Space size={8} style={{ whiteSpace: 'nowrap' }}>
                            {BI.i18nText('端点耗时')}
                            <InputNumber onChange={onChangeMin} />
                            {'ms - '}
                            <InputNumber onChange={onChangeMax} />
                            {'ms'}
                        </Space>
                    </Col>
                    <Col>
                        <Space size={8} style={{ whiteSpace: 'nowrap' }}>
                            {BI.i18nText('端点')}
                            <Select
                                mode="tags"
                                maxTagCount={0}
                                style={{ width: '130px', height: 30 }}
                                placeholder="Tags Mode"
                                onChange={selectedTraceIdsChange}
                                onSearch={id => {
                                    setSearchTraceId(() => id);
                                }}
                                options={traceIdList}
                            />
                        </Space>
                    </Col>
                </Row>
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
            </Space>
        </>
    );
};
