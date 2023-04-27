import { timeRangeAtom } from './atom';
import { atom, useAtom, useAtomValue } from 'jotai';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Mock from 'mockjs';

export function useQuerySessionId() {
    const [timeRange] = useAtom(timeRangeAtom);
    const [sessionId, setSessionId] = useState('');

    const { data } = useQuery<string[]>({
        queryKey: ['sessionId', timeRange, sessionId],
        queryFn: () =>
            new Promise(resolve => {
                const ids = Mock.mock({
                    'list|1-10': [
                        {
                            id: '@id',
                        },
                    ],
                }).list.map((item: any) => item.id);
                setTimeout(() => {
                    resolve(ids);
                }, 1000);
            }),
    });

    return {
        data,
        sessionId,
        setSessionId,
    };
}

/**
 * 查询用户
 */
export function useQueryUserId() {
    const [timeRange] = useAtom(timeRangeAtom);
    const [userId, setUserId] = useState('');

    const { data } = useQuery<string[]>({
        queryKey: ['userId', timeRange, userId],
        queryFn: () =>
            new Promise(resolve => {
                const ids = Mock.mock({
                    'list|1-10': [
                        {
                            id: '@id',
                        },
                    ],
                }).list.map((item: any) => item.id);
                setTimeout(() => {
                    resolve(ids);
                }, 1000);
            }),
    });

    return {
        data,
        userId,
        setUserId,
    };
}

/**
 * 调用链路id（traceId）
 */
export function useQueryTraceId() {
    const [timeRange] = useAtom(timeRangeAtom);
    const [traceId, setTraceId] = useState('');

    const { data } = useQuery<string[]>({
        queryKey: ['traceId', timeRange, traceId],
        queryFn: () =>
            new Promise(resolve => {
                const ids = Mock.mock({
                    'list|1-10': [
                        {
                            id: '@id',
                        },
                    ],
                }).list.map((item: any) => item.id);
                setTimeout(() => {
                    resolve(ids);
                }, 1000);
            }),
    });

    return {
        data,
        traceId,
        setTraceId,
    };
}

/**
 * 端点
 */
export type EndpointType = { id: string; name: string };
export function useQueryEndpoint() {
    const [timeRange] = useAtom(timeRangeAtom);
    const [endpoint, setEndpoint] = useState('');

    const { data } = useQuery<EndpointType[]>({
        queryKey: ['endpoint', timeRange, endpoint],
        queryFn: () =>
            new Promise(resolve => {
                const ids = Mock.mock({
                    'list|1-10': [
                        {
                            id: '@id',
                            name: '@name',
                        },
                    ],
                }).list;
                setTimeout(() => {
                    resolve(ids);
                }, 1000);
            }),
    });

    return {
        data,
        endpoint,
        setEndpoint,
    };
}

/**
 * 访问内容的类型
 * 单选
 */
export function useQuerySceneType() {
    const [timeRange] = useAtom(timeRangeAtom);

    const { data } = useQuery<string[]>({
        queryKey: ['sceneType', timeRange],
        queryFn: () =>
            new Promise(resolve => {
                const ids = Mock.mock({
                    'list|1-10': [
                        {
                            id: '@id',
                        },
                    ],
                }).list.map((item: any) => item.id);
                setTimeout(() => {
                    resolve(ids);
                }, 1000);
            }),
    });

    return {
        data,
    };
}

// 这里选择的类型，会影响访问内容的具体项
const sceneTypeAtom = atom<string>('');
sceneTypeAtom.onMount = set => {
    set('无限制');
};

/**
 * 获取访问内容具体项
 */
export function useQuerySceneTypeItem() {
    const [timeRange] = useAtom(timeRangeAtom);
    const [sceneTypeItem, setSceneTypeItem] = useState('');
    const sceneType = useAtomValue(sceneTypeAtom);

    const { data } = useQuery<string[]>({
        queryKey: ['sceneTypeItem', timeRange, sceneTypeItem, sceneType],
        queryFn: () =>
            new Promise(resolve => {
                const ids = Mock.mock({
                    'list|1-10': [
                        {
                            id: '@id',
                        },
                    ],
                }).list.map((item: any) => item.id);
                setTimeout(() => {
                    resolve(ids);
                }, 1000);
            }),
    });

    return {
        data,
        sceneTypeItem,
        setSceneTypeItem,
    };
}

/**
 * 获取更多查询内容的key列表
 * @returns
 */
export function useQueryTraceTagKey() {
    const [timeRange] = useAtom(timeRangeAtom);
    const [traceTagKey, setTraceTagKey] = useState('');

    const { data } = useQuery<string[]>({
        queryKey: ['traceTagKey', timeRange, traceTagKey],
        queryFn: () =>
            new Promise(resolve => {
                const ids = Mock.mock({
                    'list|1-10': [
                        {
                            id: '@id',
                        },
                    ],
                }).list.map((item: any) => item.id);
                setTimeout(() => {
                    resolve(ids);
                }, 1000);
            }),
    });

    return {
        data,
        traceTagKey,
        setTraceTagKey,
    };
}

/**
 * 根据条件key搜索下拉列表项
 */
export function useQueryTraceTag() {
    const [timeRange] = useAtom(timeRangeAtom);
    const [traceTag, setTraceTag] = useState('');

    const { data } = useQuery<string[]>({
        queryKey: ['traceTag', timeRange, traceTag],
        queryFn: () =>
            new Promise(resolve => {
                const ids = Mock.mock({
                    'list|1-10': [
                        {
                            id: '@id',
                        },
                    ],
                }).list.map((item: any) => item.id);
                setTimeout(() => {
                    resolve(ids);
                }, 1000);
            }),
    });

    return {
        data,
        traceTag,
        setTraceTag,
    };
}

export function useDateRangeConfig(): number | undefined {
    const { data } = useQuery<number>({
        queryKey: ['dateRangeConfig'],
        queryFn: () =>
            new Promise(resolve => {
                setTimeout(() => {
                    resolve(5);
                }, 8000);
            }),
    });

    return data;
}
