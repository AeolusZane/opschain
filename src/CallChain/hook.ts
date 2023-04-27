import { useEffect, useState } from 'react';
import { SelectProps } from '@fd/react';
import { DebouncedFunc, debounce } from 'lodash';
import { timeRangeAtom } from './atom';
import dayjs, { Dayjs } from 'dayjs';
import {
    useQuerySessionId,
    useQueryUserId,
    useQuerySceneType,
    useQueryTraceId,
    useQueryTraceTagKey,
    useQueryEndpoint,
    useQueryTraceTag,
    useQuerySceneTypeItem,
    EndpointType,
    useDateRangeConfig,
} from './crud';
import { useAtom } from 'jotai';

const formatStringListToOptions = (id: string) => {
    return {
        value: id,
        label: id,
    };
};

export type RangeValue = [Dayjs | null, Dayjs | null] | null;
export function useSetDateTimeRange() {
    const [, setTimeRange] = useAtom(timeRangeAtom);
    const DefaultPickerValue: RangeValue = [dayjs(+new Date() - 30 * 60 * 1000), dayjs(+new Date())];

    const [dates, setDates] = useState<RangeValue>(DefaultPickerValue);
    const [value, setValue] = useState<RangeValue>(DefaultPickerValue);

    const disableRange = useDateRangeConfig();
    useEffect(() => {
        setDateTimeRange(DefaultPickerValue);
    }, []);

    const disabledDate = (current: Dayjs) => {
        const today = dayjs();
        const after = today.add(disableRange || 3, 'days');
        const before = today.add(-(disableRange || 3), 'days');
        // 当前的配置日期前，后n天不可填
        const defaultDisabled = current.isAfter(after) || current.isBefore(before);
        if (!dates) {
            return !!defaultDisabled;
        }
        const tooLate = dates[0] && current.diff(dates[0], 'days') >= (disableRange || 3);
        const tooEarly = dates[1] && dates[1].diff(current, 'days') >= (disableRange || 3);

        return !!tooEarly || !!tooLate || !!defaultDisabled;
    };

    const setDateTimeRange = (dateTime: RangeValue) => {
        if (dateTime?.every(i => i)) {
            setTimeRange({
                startTime: dateTime[0]!.valueOf(),
                endTime: dateTime[1]!.valueOf(),
            });
        }

        return;
    };

    return {
        dates,
        setDates,
        value,
        setValue,
        disabledDate,
        setDateTimeRange,
    };
}

type SelectorHookType = [DebouncedFunc<React.Dispatch<React.SetStateAction<string>>>, SelectProps['options']];

/**
 * 查询id的hook
 * @returns
 */
export function useSessionIdSelector(): SelectorHookType {
    const { data, setSessionId } = useQuerySessionId();
    /**
     * 下拉的options列表
     */
    const [sessionIdList, setSessionIdList] = useState<SelectProps['options']>([]);
    /**
     * 根据当前输入的sessionId做模糊搜索，刷新options
     */
    const setSearchSessionId = debounce(setSessionId, 400);

    useEffect(() => {
        setSessionIdList(data?.map(formatStringListToOptions));
    }, [data]);

    return [setSearchSessionId, sessionIdList];
}

/**
 * 查询用户
 */
export function useUserIdSelector(): SelectorHookType {
    const { data, setUserId } = useQueryUserId();
    /**
     * 下拉的options列表
     */
    const [userIdList, setUserIdList] = useState<SelectProps['options']>([]);
    /**
     * 根据当前输入的userId做模糊搜索，刷新options
     */
    const setSearchUserId = debounce(setUserId, 400);

    useEffect(() => {
        setUserIdList(data?.map(formatStringListToOptions));
    }, [data]);

    return [setSearchUserId, userIdList];
}

/**
 * 查询traceId（调用链路）
 */
export function useTraceIdSelector(): SelectorHookType {
    const { data, setTraceId } = useQueryTraceId();
    /**
     * 下拉的options列表
     */
    const [traceIdList, setTraceIdList] = useState<SelectProps['options']>([]);
    /**
     * 根据当前输入的traceId做模糊搜索，刷新options
     */
    const setSearchTraceId = debounce(setTraceId, 400);

    useEffect(() => {
        setTraceIdList(data?.map(formatStringListToOptions));
    }, [data]);

    return [setSearchTraceId, traceIdList];
}

/**
 * 端点
 * @returns
 */
export function useEndpointSelector(): SelectorHookType {
    const { data, setEndpoint } = useQueryEndpoint();
    /**
     * 下拉的options列表
     */
    const [endpointList, setEndpointList] = useState<SelectProps['options']>([]);
    /**
     * 根据当前输入的traceId做模糊搜索，刷新options
     */
    const setSearchEndpoint = debounce(setEndpoint, 400);

    useEffect(() => {
        setEndpointList(
            data?.map((item: EndpointType) => {
                return { value: item.id, label: item.name };
            }),
        );
    }, [data]);

    return [setSearchEndpoint, endpointList];
}

/**
 * 访问内容
 */
export function useSceneTypeSelector(): SelectorHookType[1] {
    const { data } = useQuerySceneType();
    /**
     * 下拉的options列表
     */
    const [sceneTypeList, setSceneTypeList] = useState<SelectProps['options']>([]);

    useEffect(() => {
        setSceneTypeList(data?.map(formatStringListToOptions));
    }, [data]);

    return sceneTypeList;
}

/**
 * 访问内容具体的项
 * @returns
 */
export function useQuerySceneTypeItemSelector(): SelectorHookType {
    const { data, setSceneTypeItem } = useQuerySceneTypeItem();
    /**
     * 下拉的options列表
     */
    const [sceneTypeItemList, setSceneTypeItemList] = useState<SelectProps['options']>([]);
    /**
     * 根据当前输入的sceneType做模糊搜索，刷新options
     */
    const setSearchSceneTypeItem = debounce(setSceneTypeItem, 400);

    useEffect(() => {
        setSceneTypeItemList(data?.map(formatStringListToOptions));
    }, [data]);

    return [setSearchSceneTypeItem, sceneTypeItemList];
}

/**
 * 更多查询条件，查询条件key列表
 */
export function useScenceTagKeySelector(): SelectorHookType {
    const { data, setTraceTagKey } = useQueryTraceTagKey();
    /**
     * 下拉的options列表
     */
    const [traceTagKeyList, setTraceTagKeyList] = useState<SelectProps['options']>([]);
    /**
     * 根据当前输入的traceTagKey做模糊搜索，刷新options
     */
    const setSearchTraceTagKey = debounce(setTraceTagKey, 400);

    useEffect(() => {
        setTraceTagKeyList(data?.map(formatStringListToOptions));
    }, [data]);

    return [setSearchTraceTagKey, traceTagKeyList];
}

/**
 * 根据更多查询条件的key，查询条件列表
 */
export function useScenceTagSelector(): SelectorHookType {
    const { data, setTraceTag } = useQueryTraceTag();
    /**
     * 下拉的options列表
     */
    const [traceTagList, setTraceTagList] = useState<SelectProps['options']>([]);
    /**
     * 根据当前输入的traceTag做模糊搜索，刷新options
     */
    const setSearchTraceTag = debounce(setTraceTag, 400);

    useEffect(() => {
        setTraceTagList(data?.map(formatStringListToOptions));
    }, [data]);

    return [setSearchTraceTag, traceTagList];
}
