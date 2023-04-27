import { useAtom, atom } from 'jotai';
// import { useResetAtom } from 'jotai/utils';

/**
 * @description: 调用链的查询id
 * todo 注意，这里声明的atom会放到全局，所以组件重新render时不会重置（切换运维项目），要手动在需要的地方重置，比如对应的根组件
 */
export const id = atom('');
id.onMount = set => {
    set('');
};

export const serviceIdAtom = atom('');

/**
 * 查询id的hook
 */
export function useQueryId() {
    const [queryId, setQueryId] = useAtom(id);
    const reset = () => setQueryId('');

    return [queryId, setQueryId, reset] as [string, typeof setQueryId, typeof reset];
}

/**
 * 时间范围
 */
export const timeRangeAtom = atom<{
    startTime: number;
    endTime: number;
}>({
    startTime: 0,
    endTime: 0,
});

/**
 * 查询id列表
 */
export const sessionIdListAtom = atom<string[]>([]);
export const sessionId = atom([]);

/**
 * 调用链路ID
 */
export const traceIdListAtom = atom<string[]>([]);
export const traceIdAtom = atom<string[]>([]);

/**
 * 用户列表
 */
export const userIdListAtom = atom<string[]>([]);
export const userIdAtom = atom<string[]>([]);

/**
 * 访问内容
 */
export const sceneTypeListAtom = atom<string[]>([]);
export const sceneTypeAtom = atom<string>('');

/**
 * 访问内容具体项
 */
export const sceneIdListAtom = atom<string[]>([]);
export const sceneIdAtom = atom<string[]>([]);

/**
 * 端点耗时
 */
export const durationAtom = atom<{
    minDuration: number;
    maxDuration: number;
}>({
    minDuration: 0,
    maxDuration: 0,
});

/**
 * 更多条件项
 */
export const tagKeyListAtom = atom<string[]>([]);
export const tagKeyAtom = atom([]);
export const tagsAtom = atom<{ [key: string]: string[] }[]>([]);
/**
 * 这里单独提个组件，根据选择的tagKey数量生成多个下拉框，下拉框items动态获取，然后生成对象
 */

/**
 * 端点
 */
export const endpointListAtom = atom<string[]>([]);
export const endpointAtom = atom<string[]>([]);

export const pageNumAtom = atom(1);

/**
 * 获取链路列表
 */
export const traceListAtom = atom(get => {
    const serviceId = get(serviceIdAtom);
    const { startTime, endTime } = get(timeRangeAtom);
    const traceIds = get(traceIdAtom);
    const userIds = get(userIdAtom);
    const sceneType = get(sceneTypeAtom);
    const sceneIds = get(sceneIdAtom);
    const { minDuration, maxDuration } = get(durationAtom);
    const endPoints = get(endpointAtom);
    const tags = get(tagsAtom);
    const pageSize = 10;
    const pageNum = get(pageNumAtom);

    return {
        serviceId,
        startTime,
        endTime,
        traceIds,
        userIds,
        sceneType,
        sceneIds,
        minDuration,
        maxDuration,
        endPoints,
        tags,
        pageSize,
        pageNum,
    };
});
